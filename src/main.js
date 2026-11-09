import "./style.css";
import {
  CHARACTERS,
  CLUES,
  ENDINGS,
  ENDING_BY_ID,
  GALLERY_ENDINGS,
  STARTER_STATE,
  STORY,
  resolveEnding,
} from "./story.js";
import { World } from "./three/world.js";
import { AudioEngine } from "./audio.js";

const SAVE_KEY = "gilded-thorns-save-v1";
const ENDINGS_KEY = "gilded-thorns-endings-v1";
const SETTINGS_KEY = "gilded-thorns-settings-v1";

const $ = (selector) => document.querySelector(selector);

const els = {
  title: $("#title-screen"),
  game: $("#game-shell"),
  loading: $("#loading"),
  btnNew: $("#btn-new"),
  btnContinue: $("#btn-continue"),
  continueLabel: $("#continue-label"),
  btnGallery: $("#btn-gallery"),
  btnHow: $("#btn-how"),
  btnSoundTitle: $("#btn-sound-title"),
  endingCount: $("#ending-count"),
  hudAct: $("#hud-act"),
  hudPlace: $("#hud-place"),
  hudTitle: $("#hud-title"),
  btnJournal: $("#btn-journal"),
  btnSound: $("#btn-sound"),
  btnMenu: $("#btn-menu"),
  clueBadge: $("#clue-badge"),
  sceneCaption: $("#scene-caption"),
  choiceDock: $("#choice-dock"),
  choiceList: $("#choice-list"),
  dialogueWrap: $("#dialogue-wrap"),
  speakerGem: $("#speaker-gem"),
  speakerName: $("#speaker-name"),
  speakerMood: $("#speaker-mood"),
  dialogueText: $("#dialogue-text"),
  autosaveNote: $("#autosave-note"),
  btnAdvance: $("#btn-advance"),
  advanceLabel: $(".advance-label"),
  bondRail: $("#bond-rail"),
  toastStack: $("#toast-stack"),
  sceneFade: $("#scene-fade"),
  transitionCard: $("#transition-card"),
  transitionAct: $("#transition-act"),
  transitionTitle: $("#transition-title"),
  transitionSub: $("#transition-sub"),
  journal: $("#journal"),
  journalTitle: $("#journal-title"),
  heartCards: $("#heart-cards"),
  clueList: $("#clue-list"),
  tabClueCount: $("#tab-clue-count"),
  statNerve: $("#stat-nerve"),
  statReputation: $("#stat-reputation"),
  statRoute: $("#stat-route"),
  pause: $("#pause-menu"),
  pauseQuote: $("#pause-quote"),
  textSpeed: $("#text-speed"),
  textSpeedLabel: $("#text-speed-label"),
  volume: $("#volume"),
  volumeLabel: $("#volume-label"),
  reduceMotion: $("#reduce-motion"),
  gallery: $("#gallery"),
  galleryGrid: $("#gallery-grid"),
  galleryProgress: $("#gallery-progress"),
  howto: $("#howto"),
  endingScreen: $("#ending-screen"),
  endingEyebrow: $("#ending-eyebrow"),
  endingSigil: $("#ending-sigil"),
  endingTitle: $("#ending-title"),
  endingRoute: $("#ending-route"),
  endingCopy: $("#ending-copy"),
  endingQuote: $("#ending-quote"),
  endingStats: $("#ending-stats"),
};

const settings = loadSettings();
const unlockedEndings = loadUnlocked();
const audio = new AudioEngine();
audio.volume = settings.volume;
audio.muted = settings.muted;

let state = structuredClone(STARTER_STATE);
let currentNodeId = null;
let currentNode = null;
let currentChoices = [];
let typeState = null;
let captionTimer = null;
let transitionTimers = [];
let transitioning = false;
let transitionCanSkip = false;
let overlayOpen = null;
let gameActive = false;
let titleActive = true;
let autosaveTimer = null;
let lastFocused = null;

let world;
try {
  world = new World($("#stage"));
  window.__world = world;
} catch (error) {
  console.error("WebGL scene failed:", error);
  document.body.classList.add("no-webgl");
}

function loadSettings() {
  const fallback = { volume: 0.45, muted: false, textSpeed: 1, reduceMotion: false };
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return fallback;
    return { ...fallback, ...JSON.parse(raw) };
  } catch {
    return fallback;
  }
}

function saveSettings() {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    /* ignore */
  }
}

function loadUnlocked() {
  try {
    const raw = localStorage.getItem(ENDINGS_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

function saveUnlocked() {
  try {
    localStorage.setItem(ENDINGS_KEY, JSON.stringify([...unlockedEndings]));
  } catch {
    /* ignore */
  }
}

function readSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.node || !STORY[parsed.node]) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveGame() {
  if (!gameActive || !currentNodeId) return;
  try {
    const payload = {
      version: 1,
      node: currentNodeId,
      state: { ...state, savedAt: Date.now() },
      savedAt: Date.now(),
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
    els.autosaveNote.classList.add("show");
    clearTimeout(autosaveTimer);
    autosaveTimer = setTimeout(() => els.autosaveNote.classList.remove("show"), 1500);
  } catch {
    /* ignore */
  }
}

function clearSave() {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch {
    /* ignore */
  }
}

function updateContinueButton() {
  const save = readSave();
  if (!save) {
    els.btnContinue.hidden = true;
    return;
  }
  els.btnContinue.hidden = false;
  const chapter = save.state?.act || "In progress";
  els.continueLabel.textContent = `${titleCase(chapter)} · ${save.state?.choices || 0} choices made`;
}

function titleCase(value) {
  return String(value)
    .toLowerCase()
    .replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
}

function clamp(value, min = 0, max = 10) {
  return Math.max(min, Math.min(max, value));
}

function applyEffects(effects, options = {}) {
  if (!effects) return;
  if (effects.focus) state.focus = effects.focus;
  if (effects.route) state.route = effects.route;

  if (effects.love) {
    for (const [id, amount] of Object.entries(effects.love)) {
      if (!(id in state.affection)) continue;
      state.affection[id] = clamp(state.affection[id] + amount);
      if (!options.silent) {
        addToast("♡", `${CHARACTERS[id].short}'s devotion deepens`, "love");
      }
    }
  }

  if (effects.obsession) {
    for (const [id, amount] of Object.entries(effects.obsession)) {
      if (!(id in state.obsession)) continue;
      state.obsession[id] = clamp(state.obsession[id] + amount);
      if (!options.silent) {
        addToast("◉", `${CHARACTERS[id].short}'s fixation sharpens`, "obs");
      }
    }
  }

  const clueList = Array.isArray(effects.clue) ? effects.clue : effects.clue ? [effects.clue] : [];
  for (const clueId of clueList) {
    if (!state.clues.includes(clueId) && CLUES[clueId]) {
      state.clues.push(clueId);
      addToast(CLUES[clueId].icon, `Clue recorded: ${CLUES[clueId].title}`, "clue");
      audio.clue();
    }
  }

  const flagList = Array.isArray(effects.flag) ? effects.flag : effects.flag ? [effects.flag] : [];
  for (const flag of flagList) {
    if (!state.flags.includes(flag)) state.flags.push(flag);
  }

  updateBondRail();
  updateClueBadge();
  if (overlayOpen === "journal") renderJournal();
}

function addToast(icon, text, type = "clue") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i>${icon}</i><span>${escapeHtml(text)}</span>`;
  els.toastStack.appendChild(toast);
  setTimeout(() => toast.remove(), 3400);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function updateClueBadge() {
  els.clueBadge.textContent = String(state.clues.length);
  els.tabClueCount.textContent = String(state.clues.length);
}

function loveLabel(value) {
  return ["A stranger", "Curious", "Drawn", "Warm", "Smitten", "Devoted", "In love", "Certain", "Bound", "Forever", "Consumed"][clamp(value, 0, 10)];
}

function obsessionLabel(value) {
  return ["Composed", "Watching", "Attentive", "Possessive", "Hungry", "Fixated", "Unraveling", "Dangerous", "Ravenous", "Beyond reason", "Fatal"][clamp(value, 0, 10)];
}

function updateBondRail() {
  if (!els.bondRail) return;
  els.bondRail.innerHTML = "";
  for (const id of ["clem", "ada", "rosa"]) {
    const char = CHARACTERS[id];
    const love = state.affection[id];
    const obs = state.obsession[id];
    const chip = document.createElement("div");
    chip.className = "bond-chip";
    if (currentNode?.speaker === id) chip.classList.add("active");
    if (currentNode?.cast?.length && !currentNode.cast.includes(id)) chip.classList.add("muted");
    chip.style.setProperty("--bond-color", char.color);
    chip.innerHTML = `
      <div class="bond-mono">${char.initials}</div>
      <div class="bond-info">
        <span class="bond-name">${char.short}</span>
        <div class="bond-bars">
          <div class="bond-bar"><i style="width:${love * 10}%"></i></div>
          <div class="bond-bar obs"><i style="width:${obs * 10}%"></i></div>
        </div>
      </div>`;
    els.bondRail.appendChild(chip);
  }
}

function updateHud(node) {
  els.hudAct.textContent = node.chapter || state.act || "PROLOGUE";
  els.hudPlace.textContent = node.place || "Cinder Gulch";
  els.hudTitle.textContent = node.actTitle || "The Gilded Lily";
  if (node.actTitle && node.actTitle !== "Cinder Gulch") state.act = node.chapter || state.act;
  state.act = node.chapter || state.act;
}

function showCaption(text) {
  if (!text) return;
  els.sceneCaption.textContent = text;
  els.sceneCaption.classList.add("visible");
  clearTimeout(captionTimer);
  captionTimer = setTimeout(() => els.sceneCaption.classList.remove("visible"), 4200);
}

function syncSoundUi() {
  const on = !settings.muted;
  els.btnSound.setAttribute("aria-pressed", String(on));
  els.btnSound.setAttribute("aria-label", on ? "Mute sound" : "Unmute sound");
  if (els.btnSoundTitle) els.btnSoundTitle.textContent = on ? "Sound on" : "Sound off";
}

function applySettings() {
  audio.setVolume(settings.volume);
  audio.setMuted(settings.muted);
  els.volume.value = String(Math.round(settings.volume * 100));
  els.volumeLabel.textContent = `${Math.round(settings.volume * 100)}%`;
  els.textSpeed.value = String(settings.textSpeed);
  els.textSpeedLabel.textContent = ["Measured", "Brisk", "Instant"][settings.textSpeed];
  els.reduceMotion.checked = settings.reduceMotion;
  document.documentElement.classList.toggle("reduce-motion", settings.reduceMotion);
  syncSoundUi();
}

function startAudio() {
  audio.start();
  audio.setVolume(settings.volume);
  audio.setMuted(settings.muted);
  if (currentNode) audio.setScene(currentNode.bg || "streetDusk");
}

function toggleMute() {
  settings.muted = !settings.muted;
  saveSettings();
  if (!settings.muted) startAudio();
  audio.setMuted(settings.muted);
  syncSoundUi();
  audio.click();
}

function hideScreen(screen) {
  screen.classList.remove("visible");
  setTimeout(() => {
    if (!screen.classList.contains("visible")) screen.hidden = true;
  }, 700);
}

function showTitle() {
  clearTimeout(captionTimer);
  stopTyping(true);
  clearTransition();
  transitioning = false;
  gameActive = false;
  titleActive = true;
  currentNode = null;
  currentNodeId = null;
  currentChoices = [];
  els.choiceDock.hidden = true;
  els.dialogueWrap.hidden = false;
  els.dialogueWrap.classList.remove("hidden-for-choice");
  els.btnAdvance.hidden = false;
  els.bondRail.hidden = false;
  els.game.classList.remove("visible");
  setTimeout(() => {
    if (!gameActive) els.game.hidden = true;
  }, 700);
  els.endingScreen.hidden = true;
  els.endingScreen.classList.remove("visible");
  closeAllOverlays();
  els.title.hidden = false;
  requestAnimationFrame(() => els.title.classList.add("visible"));
  updateContinueButton();
  world?.setTitle();
  audio.setScene("streetDusk");
}

function hideTitleAndShowGame() {
  els.title.classList.remove("visible");
  setTimeout(() => {
    if (!titleActive) els.title.hidden = true;
  }, 700);
  els.game.hidden = false;
  requestAnimationFrame(() => els.game.classList.add("visible"));
  gameActive = true;
  titleActive = false;
}

function startNewGame() {
  audio.start();
  audio.click();
  state = structuredClone(STARTER_STATE);
  state.startedAt = Date.now();
  currentNodeId = null;
  currentNode = null;
  currentChoices = [];
  hideTitleAndShowGame();
  closeAllOverlays();
  els.endingScreen.hidden = true;
  els.endingScreen.classList.remove("visible");
  els.dialogueWrap.hidden = false;
  els.bondRail.hidden = false;
  updateBondRail();
  updateClueBadge();
  audio.setScene("streetDusk");
  if (world) world.setGameScene("streetDusk", [], "narrator", "The stage road", "wide");
  playTransitionCard(
    { chapter: "PROLOGUE", actTitle: "Cinder Gulch", actSub: "New Mexico Territory · October 1889" },
    () => runNode("opening_1", { instant: true })
  );
}

function loadGame() {
  const save = readSave();
  if (!save) {
    startNewGame();
    return;
  }
  audio.start();
  audio.click();
  const fresh = structuredClone(STARTER_STATE);
  state = {
    ...fresh,
    ...save.state,
    affection: { ...fresh.affection, ...(save.state?.affection || {}) },
    obsession: { ...fresh.obsession, ...(save.state?.obsession || {}) },
    clues: Array.isArray(save.state?.clues) ? [...save.state.clues] : [],
    flags: Array.isArray(save.state?.flags) ? [...save.state.flags] : [],
    visited: Array.isArray(save.state?.visited) ? [...save.state.visited] : [],
  };
  currentNodeId = save.node;
  currentNode = null;
  currentChoices = [];
  hideTitleAndShowGame();
  closeAllOverlays();
  els.endingScreen.hidden = true;
  els.endingScreen.classList.remove("visible");
  els.dialogueWrap.hidden = false;
  els.bondRail.hidden = false;
  updateBondRail();
  updateClueBadge();
  runNode(save.node, { instant: true, noSave: true });
}

function runNode(id, options = {}) {
  const node = STORY[id];
  if (!node) {
    console.error("Missing node:", id);
    return;
  }
  currentNodeId = id;
  currentNode = node;
  node._state = state;
  state.node = id;
  state.act = node.chapter || state.act;

  if (!state.visited.includes(id)) {
    state.visited.push(id);
    if (node.enter) applyEffects(node.enter, { silent: false });
  }

  if (node.ending) {
    triggerEnding(node.ending);
    return;
  }

  state.startedAt ||= Date.now();
  updateHud(node);
  updateBondRail();
  updateClueBadge();

  if (node.transition && !options.instant) {
    if (world) world.setGameScene(node.bg, node.cast || [], node.speaker, node.mood || "neutral", node.camera || "wide");
    audio.setScene(node.bg);
    playTransitionCard(node, () => presentNode(node, options));
    return;
  }

  presentNode(node, { ...options, instant: true });
}

function presentNode(node, options = {}) {
  node._state = state;
  currentNode = node;
  transitioning = false;
  els.transitionCard.hidden = true;
  els.transitionCard.classList.remove("out");
  els.dialogueWrap.hidden = false;

  if (world) {
    world.setGameScene(node.bg, node.cast || [], node.speaker, node.mood || "neutral", node.camera || "wide");
  }
  audio.setScene(node.bg);
  updateHud(node);
  updateBondRail();
  updateClueBadge();

  const speaker = CHARACTERS[node.speaker] || CHARACTERS.narrator;
  els.speakerName.textContent = speaker.name;
  els.speakerMood.textContent = node.mood || speaker.role;
  els.speakerGem.style.background = speaker.gem;
  els.speakerGem.style.boxShadow = `0 0 12px ${speaker.gem}`;
  els.dialogueText.classList.toggle("narration", node.speaker === "narrator");

  if (node.place) showCaption(node.place);
  els.choiceDock.hidden = true;
  currentChoices = (node.choices || []).filter((choice) => !choice.when || choice.when(state));

  const text = typeof node.text === "function" ? node.text(state) : node.text;
  const fullText = text || "";
  renderDialogueText(fullText);
  startTyping();

  if (!options.noSave) saveGame();
}

function parseInline(text) {
  const parts = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0;
  let match;
  while ((match = regex.exec(text))) {
    if (match.index > last) parts.push({ text: text.slice(last, match.index), tag: null });
    const token = match[0];
    if (token.startsWith("**")) parts.push({ text: token.slice(2, -2), tag: "strong" });
    else parts.push({ text: token.slice(1, -1), tag: "em" });
    last = match.index + token.length;
  }
  if (last < text.length) parts.push({ text: text.slice(last), tag: null });
  return parts;
}

function renderDialogueText(text) {
  els.dialogueText.innerHTML = "";
  const paragraphs = String(text).split(/\n\n+/);
  const chars = [];
  for (const paragraph of paragraphs) {
    if (!paragraph) continue;
    const p = document.createElement("p");
    p.style.margin = "0 0 0.55em";
    const segments = parseInline(paragraph);
    for (const segment of segments) {
      let parent = p;
      if (segment.tag === "strong") {
        parent = document.createElement("strong");
        parent.className = "em-gold";
        p.appendChild(parent);
      } else if (segment.tag === "em") {
        parent = document.createElement("em");
        p.appendChild(parent);
      }
      for (const ch of segment.text) {
        if (ch === "\n") {
          parent.appendChild(document.createElement("br"));
          continue;
        }
        const span = document.createElement("span");
        span.className = "char unseen";
        span.textContent = ch;
        parent.appendChild(span);
        chars.push(span);
      }
    }
    els.dialogueText.appendChild(p);
  }
  const lastP = els.dialogueText.querySelector("p:last-child");
  if (lastP) lastP.style.marginBottom = "0";
  return chars;
}

function startTyping() {
  stopTyping(true);
  const chars = [...els.dialogueText.querySelectorAll(".char")];
  const plain = els.dialogueText.textContent || "";
  els.dialogueText.setAttribute("aria-label", plain);
  if (settings.textSpeed === 2 || chars.length === 0) {
    revealAll(chars);
    finishTyping();
    return;
  }
  const interval = settings.textSpeed === 0 ? 20 : 11;
  const chunk = settings.textSpeed === 0 ? 1 : 2;
  let index = 0;
  typeState = {
    chars,
    timer: setInterval(() => {
      for (let i = 0; i < chunk && index < chars.length; i++) {
        chars[index]?.classList.remove("unseen");
        index++;
      }
      if (index >= chars.length) {
        clearInterval(typeState.timer);
        typeState = null;
        finishTyping();
      }
    }, interval),
  };
  els.advanceLabel.textContent = "Skip";
  els.btnAdvance.hidden = false;
  if (currentNode?.speaker && currentNode.cast?.includes(currentNode.speaker) && world) {
    world.setSpeaking(currentNode.speaker, true);
  }
}

function revealAll(chars = [...els.dialogueText.querySelectorAll(".char")]) {
  for (const char of chars) char.classList.remove("unseen");
}

function stopTyping(reveal = false) {
  if (typeState?.timer) clearInterval(typeState.timer);
  if (reveal) revealAll();
  typeState = null;
  if (world) world.setSpeaking(null, false);
}

function finishTyping() {
  revealAll();
  typeState = null;
  els.advanceLabel.textContent = "Continue";
  if (world) world.setSpeaking(null, false);
  if (currentChoices.length) {
    els.btnAdvance.hidden = true;
    showChoices();
  } else {
    els.btnAdvance.hidden = false;
  }
}

function advance() {
  if (!gameActive || overlayOpen) return;
  if (transitioning) {
    if (transitionCanSkip) skipTransition();
    return;
  }
  if (!currentNode) return;
  if (typeState) {
    stopTyping(true);
    finishTyping();
    return;
  }
  if (currentChoices.length) return;
  audio.click();
  if (typeof currentNode.next === "function") {
    runNode(currentNode.next(state));
  } else if (currentNode.next) {
    runNode(currentNode.next);
  }
}

function showChoices() {
  els.choiceList.innerHTML = "";
  const letters = ["1", "2", "3", "4", "5"];
  currentChoices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.className = "choice-btn";
    button.type = "button";
    button.innerHTML = `
      <span class="choice-key"><span>${letters[index] || "•"}</span></span>
      <span class="choice-copy"><b></b><small></small></span>
      ${choice.tag ? `<span class="choice-tag">${escapeHtml(choice.tag)}</span>` : ""}`;
    button.querySelector("b").textContent = choice.text;
    const small = button.querySelector("small");
    if (choice.sub) small.textContent = choice.sub;
    else small.remove();
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      choose(choice, index);
    });
    els.choiceList.appendChild(button);
  });
  els.choiceDock.hidden = false;
  els.choiceDock.style.animation = "none";
  void els.choiceDock.offsetHeight;
  els.choiceDock.style.animation = "";
}

function choose(choice, index) {
  if (!gameActive) return;
  audio.choice();
  applyEffects(choice.effects);
  state.choices++;
  currentChoices = [];
  els.choiceDock.hidden = true;
  els.btnAdvance.hidden = false;
  els.dialogueWrap.classList.remove("hidden-for-choice");
  saveGame();
  if (choice.next) runNode(choice.next);
  else if (choice.ending) triggerEnding(choice.ending);
}

function playTransitionCard(node, done) {
  clearTransition();
  transitioning = true;
  transitionCanSkip = false;
  els.dialogueWrap.hidden = true;
  els.choiceDock.hidden = true;
  els.transitionAct.textContent = node.chapter || "ACT";
  els.transitionTitle.textContent = node.actTitle || "Cinder Gulch";
  els.transitionSub.textContent = node.actSub || node.place || "";
  els.transitionCard.hidden = false;
  els.transitionCard.classList.remove("out");
  audio.transition();
  transitionTimers.push(
    setTimeout(() => {
      transitionCanSkip = true;
    }, 550)
  );
  transitionTimers.push(
    setTimeout(() => finishTransition(done), 2300)
  );
  const finishHandler = () => {
    if (!transitionCanSkip) return;
    finishTransition(done);
  };
  els.transitionCard.addEventListener("click", finishHandler, { once: true });
  els.transitionCard._skip = finishHandler;
}

function finishTransition(done) {
  if (!transitioning) return;
  clearTransition();
  transitionCanSkip = false;
  els.transitionCard.classList.add("out");
  transitionTimers.push(
    setTimeout(() => {
      els.transitionCard.hidden = true;
      els.transitionCard.classList.remove("out");
      transitioning = false;
      done?.();
    }, 420)
  );
}

function skipTransition() {
  if (!transitioning || !transitionCanSkip) return;
  const skip = els.transitionCard._skip;
  if (skip) skip();
}

function clearTransition() {
  transitionTimers.forEach((timer) => {
    clearTimeout(timer);
    clearTimeout(transitionTimers[timer]);
  });
  transitionTimers = [];
  if (els.transitionCard._skip) {
    els.transitionCard.removeEventListener("click", els.transitionCard._skip);
    els.transitionCard._skip = null;
  }
  els.transitionCard.classList.remove("out");
  transitionCanSkip = false;
}

function triggerEnding(pick) {
  const ending = resolveEnding(state, pick);
  gameActive = false;
  stopTyping(true);
  els.choiceDock.hidden = true;
  els.dialogueWrap.hidden = true;
  els.btnAdvance.hidden = true;
  els.bondRail.hidden = true;
  els.hudAct.textContent = ending.route;
  els.hudPlace.textContent = "Cinder Gulch · after";
  els.hudTitle.textContent = ending.title;
  clearSave();

  unlockedEndings.add(ending.id);
  saveUnlocked();
  updateGalleryCount();

  let location = "streetDawn";
  let cast = [];
  if (ending.id.startsWith("clem")) {
    location = "saloonDawn";
    cast = ["clem"];
  } else if (ending.id.startsWith("ada")) {
    location = "clinicDawn";
    cast = ["ada"];
  } else if (ending.id.startsWith("rosa")) {
    location = "mine";
    cast = ["rosa"];
  } else if (ending.id === "three_of_kind") {
    location = "saloonDawn";
    cast = ["clem", "ada", "rosa"];
  } else if (ending.id === "hunt") {
    location = "streetDawn";
    cast = ["clem", "ada", "rosa"];
  }
  if (world) world.setEndingScene(location, cast, pick);
  audio.setScene(location);
  audio.ending();

  els.endingEyebrow.textContent = `ENDING · ${GALLERY_ENDINGS.findIndex((item) => item.id === ending.id) + 1} OF ${ENDINGS.length}`;
  els.endingTitle.textContent = ending.title;
  els.endingRoute.textContent = ending.route;
  els.endingRoute.style.setProperty("--ending-color", ending.color);
  els.endingSigil.textContent = ending.sigil;
  els.endingSigil.style.color = ending.color;
  els.endingCard = $(".ending-card");
  els.endingCard?.style.setProperty("--ending-color", ending.color);
  els.endingCopy.textContent = ending.copy;
  els.endingQuote.textContent = ending.quote;
  const stats = [
    ...ending.stats.map((label) => ({ label: "Outcome", value: label })),
    { label: "Devotion", value: `${state.affection.clem}/${state.affection.ada}/${state.affection.rosa}` },
    { label: "Hunger", value: `${state.obsession.clem}/${state.obsession.ada}/${state.obsession.rosa}` },
  ];
  els.endingStats.innerHTML = stats
    .slice(0, 5)
    .map((stat) => `<div class="ending-stat">${escapeHtml(stat.label)}<b>${escapeHtml(stat.value)}</b></div>`)
    .join("");

  setTimeout(() => {
    els.endingScreen.hidden = false;
    requestAnimationFrame(() => els.endingScreen.classList.add("visible"));
  }, 350);
}

function updateGalleryCount() {
  els.endingCount.textContent = `${unlockedEndings.size}/${ENDINGS.length}`;
  els.galleryProgress.textContent = `${unlockedEndings.size} of ${ENDINGS.length} endings found`;
}

function openOverlay(name) {
  if (overlayOpen && overlayOpen !== name) closeOverlay(overlayOpen);
  const element = els[name];
  if (!element) return;
  if (name === "journal") renderJournal();
  if (name === "gallery") renderGallery();
  if (name === "pause") {
    els.pauseQuote.textContent = [
      "The desert is patient. So are they.",
      "Every door in Cinder Gulch has two sides. Most of them lock.",
      "You can leave any time. That is what they keep telling you.",
      "Three women. One town. No clean exits.",
      "Some knots are tied to hold. Some are tied to hang.",
    ][Math.floor(Math.random() * 5)];
  }
  element.hidden = false;
  overlayOpen = name;
  audio.click();
  lastFocused = document.activeElement;
  const focusTarget = element.querySelector("button, [tabindex]");
  setTimeout(() => focusTarget?.focus(), 60);
}

function closeOverlay(name) {
  const element = els[name];
  if (!element) return;
  element.hidden = true;
  if (overlayOpen === name) overlayOpen = null;
  if (lastFocused?.focus) lastFocused.focus();
}

function closeAllOverlays() {
  ["journal", "pause", "gallery", "howto"].forEach((name) => {
    if (els[name]) els[name].hidden = true;
  });
  overlayOpen = null;
}

function renderJournal() {
  const statusQuotes = {
    clem: [
      "I kept your room. I did not say I kept my hands to myself.",
      "Every Sunday, fresh sheets. Every night, the same dream.",
      "There is a version of you in my sketchbook that never left.",
    ],
    ada: [
      "I have your pulse memorised. It is not the same as knowing you.",
      "A diagnosis is only a story with better handwriting.",
      "You are not a case. You are the reason I keep taking notes.",
    ],
    rosa: [
      "Two tickets. One ghost. Eighteen months of bad decisions.",
      "I would have waited forever. That is not a compliment.",
      "You're not my getaway. You're the place I'm going.",
    ],
  };
  els.heartCards.innerHTML = "";
  const route = state.route && CHARACTERS[state.route] ? CHARACTERS[state.route] : null;
  for (const id of ["clem", "ada", "rosa"]) {
    const char = CHARACTERS[id];
    const love = state.affection[id];
    const obs = state.obsession[id];
    const quoteIndex = Math.min(2, Math.floor((love + obs) / 7));
    const card = document.createElement("article");
    card.className = "heart-card";
    card.style.setProperty("--bond-color", char.color);
    card.innerHTML = `
      <div class="heart-card-head">
        <div><h3>${char.name}</h3><span class="bond-role">${char.role}</span></div>
        <span class="heart-mono">${char.initials}</span>
      </div>
      <div class="meter-row">
        <div class="meter-row-head"><span>Devotion</span><em>${loveLabel(love)}</em></div>
        <div class="meter"><i style="width:${love * 10}%"></i></div>
      </div>
      <div class="meter-row">
        <div class="meter-row-head"><span>Hunger</span><em>${obsessionLabel(obs)}</em></div>
        <div class="meter obs"><i style="width:${obs * 10}%"></i></div>
      </div>
      <p class="bond-label">${route?.short === char.short ? "Your current road." : char.route}</p>
      <p class="bond-quote">${statusQuotes[id][quoteIndex]}</p>`;
    els.heartCards.appendChild(card);
  }

  els.clueList.innerHTML = "";
  if (!state.clues.length) {
    const li = document.createElement("li");
    li.className = "clue-empty";
    li.textContent = "No clues yet. The desert keeps its receipts close.";
    els.clueList.appendChild(li);
  } else {
    for (const clueId of state.clues) {
      const clue = CLUES[clueId];
      if (!clue) continue;
      const li = document.createElement("li");
      li.className = "clue-item";
      li.innerHTML = `
        <span class="clue-icon"><span>${clue.icon}</span></span>
        <div><h4>${escapeHtml(clue.title)}</h4><p>${escapeHtml(clue.text)}</p></div>`;
      els.clueList.appendChild(li);
    }
  }

  if (state.flags.includes("guarded") || state.flags.includes("clem_boundary") || state.flags.includes("ada_boundary") || state.flags.includes("rosa_boundary")) {
    els.statNerve.textContent = "Guarded";
  } else if (state.flags.includes("clem_fight") || state.flags.includes("final_alone")) {
    els.statNerve.textContent = "Reckless";
  } else {
    els.statNerve.textContent = "Steady";
  }
  if (state.flags.includes("final_all")) els.statReputation.textContent = "Town legend";
  else if (state.flags.includes("final_alone")) els.statReputation.textContent = "Ghost";
  else if (state.route) els.statReputation.textContent = "Cinder Gulch's problem";
  else els.statReputation.textContent = "Unclaimed";
  els.statRoute.textContent = route ? route.name : "Undecided";
  els.tabClueCount.textContent = String(state.clues.length);
}

function renderGallery() {
  els.galleryGrid.innerHTML = "";
  GALLERY_ENDINGS.forEach((ending, index) => {
    const unlocked = unlockedEndings.has(ending.id);
    const tile = document.createElement("article");
    tile.className = `ending-tile ${unlocked ? "unlocked" : "locked"}`;
    tile.style.setProperty("--tile-color", ending.color);
    tile.innerHTML = `
      <span class="ending-num">ENDING ${String(index + 1).padStart(2, "0")}</span>
      <h3>${unlocked ? escapeHtml(ending.title) : "Undiscovered"}</h3>
      <p>${unlocked ? escapeHtml(ending.route) : escapeHtml(ending.tag)}</p>
      <span class="tile-sigil">${unlocked ? ending.sigil : "?"}</span>`;
    els.galleryGrid.appendChild(tile);
  });
  els.galleryProgress.textContent = `${unlockedEndings.size} of ${ENDINGS.length} endings found`;
  els.endingCount.textContent = `${unlockedEndings.size}/${ENDINGS.length}`;
}

// ——— Event listeners ———

els.btnNew.addEventListener("click", startNewGame);
els.btnContinue.addEventListener("click", loadGame);
els.btnGallery.addEventListener("click", () => openOverlay("gallery"));
els.btnHow.addEventListener("click", () => openOverlay("howto"));
els.btnSoundTitle.addEventListener("click", toggleMute);
els.btnSound.addEventListener("click", toggleMute);
els.btnJournal.addEventListener("click", () => openOverlay("journal"));
els.btnMenu.addEventListener("click", () => openOverlay("pause"));
els.btnAdvance.addEventListener("click", (event) => {
  event.stopPropagation();
  advance();
});

els.dialogueWrap.addEventListener("click", (event) => {
  if (event.target.closest("button")) return;
  advance();
});

els.transitionCard.addEventListener("click", () => {
  if (transitionCanSkip && transitioning) skipTransition();
});

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => closeOverlay(button.dataset.close));
});

for (const overlay of ["journal", "pause", "gallery", "howto"]) {
  els[overlay].addEventListener("click", (event) => {
    if (event.target === els[overlay]) closeOverlay(overlay);
  });
}

document.querySelectorAll(".jtab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".jtab").forEach((other) => {
      other.classList.toggle("active", other === tab);
      other.setAttribute("aria-selected", String(other === tab));
    });
    document.querySelectorAll(".jtab-panel").forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.panel === tab.dataset.tab);
    });
    audio.click();
  });
});

$("#btn-resume").addEventListener("click", () => {
  closeOverlay("pause");
  audio.click();
});
$("#btn-load").addEventListener("click", () => {
  closeOverlay("pause");
  loadGame();
});
$("#btn-save-quit").addEventListener("click", () => {
  saveGame();
  closeOverlay("pause");
  showTitle();
});
$("#btn-reset-endings").addEventListener("click", () => {
  if (!window.confirm("Forget every ending you have found?")) return;
  unlockedEndings.clear();
  saveUnlocked();
  renderGallery();
  updateGalleryCount();
});
$("#btn-ending-again").addEventListener("click", () => {
  els.endingScreen.classList.remove("visible");
  setTimeout(() => {
    els.endingScreen.hidden = true;
    showTitle();
  }, 500);
});
$("#btn-ending-journal").addEventListener("click", () => openOverlay("journal"));

els.textSpeed.addEventListener("input", () => {
  settings.textSpeed = Number(els.textSpeed.value);
  saveSettings();
  applySettings();
});
els.volume.addEventListener("input", () => {
  settings.volume = Number(els.volume.value) / 100;
  saveSettings();
  applySettings();
  if (!audio.started) startAudio();
});
els.reduceMotion.addEventListener("change", () => {
  settings.reduceMotion = els.reduceMotion.checked;
  saveSettings();
  applySettings();
});

window.addEventListener("keydown", (event) => {
  if (overlayOpen) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeOverlay(overlayOpen);
    }
    return;
  }
  if (!gameActive && titleActive) {
    if (event.key === "Enter") {
      event.preventDefault();
      startNewGame();
    }
    return;
  }
  if (!gameActive) return;
  if (event.key === " " || event.key === "Enter") {
    event.preventDefault();
    advance();
    return;
  }
  if (/^[1-5]$/.test(event.key) && currentChoices.length) {
    event.preventDefault();
    const index = Number(event.key) - 1;
    if (currentChoices[index]) choose(currentChoices[index], index);
    return;
  }
  if (event.key.toLowerCase() === "j") {
    event.preventDefault();
    openOverlay("journal");
  } else if (event.key.toLowerCase() === "m") {
    event.preventDefault();
    toggleMute();
  } else if (event.key === "Escape") {
    event.preventDefault();
    openOverlay("pause");
  }
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden && gameActive) saveGame();
});

window.addEventListener("beforeunload", () => {
  if (gameActive) saveGame();
});

// ——— Boot ———

async function boot() {
  applySettings();
  updateGalleryCount();
  updateContinueButton();
  updateClueBadge();
  if (settings.reduceMotion) document.documentElement.classList.add("reduce-motion");
  world?.setTitle();
  audio.setScene("streetDusk");
  try {
    await document.fonts.ready;
  } catch {
    /* ignore */
  }
  await new Promise((resolve) => setTimeout(resolve, 450));
  els.loading.classList.add("done");
  els.title.hidden = false;
  requestAnimationFrame(() => {
    els.title.classList.add("visible");
    window.__GILDED_READY__ = true;
  });
  setTimeout(() => {
    els.loading.hidden = true;
  }, 1200);
}

boot();
