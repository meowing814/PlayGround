import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { createCharacter } from "./characters.js";
import { createEnvironment, animateEnvironment } from "./environments.js";

const CHARACTER_ORDER = ["clem", "ada", "rosa"];

export class World {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
      stencil: false,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.65));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("#140d0b");
    this.scene.fog = new THREE.Fog(0x140d0b, 12, 32);

    this.camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 80);
    this.camera.position.set(0, 1.8, 5.6);

    this.composer = new EffectComposer(this.renderer);
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(this.renderPass);
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.42,
      0.58,
      0.82
    );
    this.composer.addPass(this.bloomPass);
    this.outputPass = new OutputPass();
    this.composer.addPass(this.outputPass);

    this.clock = new THREE.Clock();
    this.time = 0;
    this.elapsed = 0;
    this.environments = new Map();
    this.currentEnvironment = null;
    this.currentLocation = null;
    this.characters = new Map();
    this.cast = [];
    this.speaker = null;
    this.mood = "neutral";
    this.framing = "wide";
    this.pointer = new THREE.Vector2();
    this.pointerTarget = new THREE.Vector2();
    this.cameraPos = new THREE.Vector3(0, 1.8, 5.6);
    this.cameraTarget = new THREE.Vector3(0, 1.15, 0);
    this.desiredPos = new THREE.Vector3(0, 1.8, 5.6);
    this.desiredTarget = new THREE.Vector3(0, 1.15, 0);
    this.cameraDrift = 0;
    this.titleMode = false;
    this.endingPick = null;

    for (const id of CHARACTER_ORDER) {
      const character = createCharacter(id);
      character.visible = false;
      this.scene.add(character);
      this.characters.set(id, character);
    }

    // Soft front fill that follows the speaking character.
    this.characterFill = new THREE.PointLight("#ffd2a0", 7, 4.2, 1.8);
    this.characterFill.position.set(0, 1.6, 1.4);
    this.scene.add(this.characterFill);

    this.raycaster = new THREE.Raycaster();
    this.bindEvents();
    this.resize();
    this.preload();
    this.loop = this.loop.bind(this);
    this.renderer.setAnimationLoop(this.loop);
  }

  bindEvents() {
    this.onResize = () => this.resize();
    window.addEventListener("resize", this.onResize);
    this.onPointer = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      this.pointerTarget.set(x, y);
    };
    window.addEventListener("pointermove", this.onPointer, { passive: true });
  }

  preload() {
    // Build the title environment immediately. Other sets are built on demand.
    this.ensureEnvironment("streetDusk");
  }

  ensureEnvironment(location) {
    if (this.environments.has(location)) return this.environments.get(location);
    const env = createEnvironment(location);
    env.group.visible = false;
    this.scene.add(env.group);
    this.environments.set(location, env);
    return env;
  }

  setLocation(location) {
    if (this.currentLocation === location) return;
    const env = this.ensureEnvironment(location);
    if (this.currentEnvironment) this.currentEnvironment.group.visible = false;
    env.group.visible = true;
    this.currentEnvironment = env;
    this.currentLocation = location;
    this.scene.background = new THREE.Color(env.bg);
    this.scene.fog = new THREE.Fog(env.fog.color ?? env.bg, env.fog.near ?? 10, env.fog.far ?? 34);
    this.renderer.toneMappingExposure = env.exposure ?? 1.05;
    this.currentEnvironment.group.updateMatrixWorld();
    this.updateCamera(true);
  }

  setCharacters(cast, speaker = null, mood = "neutral") {
    this.cast = [...cast];
    this.speaker = speaker;
    this.mood = mood;
    const portrait = window.innerWidth / window.innerHeight < 0.78;
    const count = cast.length;

    let xs = [0];
    let zs = [0.35];
    if (count === 2) {
      xs = [-0.72, 0.72];
      zs = [0.38, 0.38];
    } else if (count >= 3) {
      xs = portrait ? [-0.9, 0.05, 0.92] : [-1.45, 0.03, 1.48];
      zs = portrait ? [0.55, 0.18, 0.58] : [0.55, 0.3, 0.55];
    }

    CHARACTER_ORDER.forEach((id, index) => {
      const character = this.characters.get(id);
      const castIndex = cast.indexOf(id);
      if (castIndex === -1) {
        character.visible = false;
        return;
      }
      character.visible = true;
      let x = xs[castIndex] ?? 0;
      let z = zs[castIndex] ?? 0.35;
      if (count === 3 && portrait) {
        // keep protagonist-ish center character forward
        if (castIndex === 1) z = 0.1;
      }
      character.position.set(x, 0, z);
      let rot = 0;
      if (count >= 2) {
        rot = x < -0.2 ? 0.13 : x > 0.2 ? -0.13 : 0;
      }
      character.rotation.y = rot;
      const characterMood = id === speaker ? mood : "neutral";
      character.userData.setMood(characterMood);
      character.userData.setSpeaking(false);
      character.userData.targetVisible = true;
      character.userData.baseX = x;
    });

    if (speaker && this.characters.has(speaker)) {
      const char = this.characters.get(speaker);
      this.characterFill.position.set(char.position.x, 1.55, char.position.z + 1.5);
      this.characterFill.intensity = 6;
    } else {
      this.characterFill.intensity = 2.5;
    }
    this.updateCamera(true);
  }

  setSpeaking(id, speaking) {
    for (const [charId, character] of this.characters) {
      if (character.visible) character.userData.setSpeaking(charId === id && speaking);
    }
  }

  setMood(mood) {
    this.mood = mood;
    if (this.speaker && this.characters.has(this.speaker)) {
      this.characters.get(this.speaker).userData.setMood(mood);
    }
  }

  setTitle() {
    this.titleMode = true;
    this.endingPick = null;
    this.setLocation("streetDusk");
    this.setCharacters(["clem", "ada", "rosa"], null, "neutral");
    const clem = this.characters.get("clem");
    const ada = this.characters.get("ada");
    const rosa = this.characters.get("rosa");
    clem.userData.setMood("sly, confident");
    ada.userData.setMood("clinical, watching");
    rosa.userData.setMood("delight, dangerous");
    this.titleBase = {
      pos: new THREE.Vector3(0, 1.62, 5.2),
      target: new THREE.Vector3(0, 1.12, 0),
    };
    this.updateCamera(true);
  }

  setGameScene(location, cast, speaker, mood, framing = "wide") {
    this.titleMode = false;
    this.framing = framing;
    this.setLocation(location);
    this.setCharacters(cast, speaker, mood);
  }

  setEndingScene(location, cast, pick) {
    this.titleMode = false;
    this.endingPick = pick;
    this.setLocation(location);
    this.setCharacters(cast, null, "neutral");
    if (pick === "clem") {
      this.characters.get("clem")?.userData.setMood("soft, possessive");
    } else if (pick === "ada") {
      this.characters.get("ada")?.userData.setMood("clinical, possessive");
    } else if (pick === "rosa") {
      this.characters.get("rosa")?.userData.setMood("sly, possessive");
    } else if (pick === "all") {
      this.characters.get("clem")?.userData.setMood("soft, sly");
      this.characters.get("ada")?.userData.setMood("quiet, warm");
      this.characters.get("rosa")?.userData.setMood("delight");
    }
    this.updateCamera(true);
  }

  updateCamera(instant = false) {
    const env = this.currentEnvironment;
    if (!env) return;
    const aspect = window.innerWidth / window.innerHeight;
    const portrait = aspect < 0.78;
    const count = this.cast.length;
    let basePos = env.camera.pos.clone();
    let target = env.camera.target.clone();

    if (this.titleMode && this.titleBase) {
      basePos.copy(this.titleBase.pos);
      target.copy(this.titleBase.target);
    } else if (count >= 3) {
      basePos.z += portrait ? 1.7 : 1.15;
      target.y = 1.13;
      if (portrait) {
        basePos.y = 1.55;
      }
    } else if (count === 2) {
      basePos.z += 0.45;
      target.y = 1.12;
    } else if (count === 1) {
      target.y = 1.13;
      if (portrait) {
        basePos.z += 0.35;
        basePos.y = 1.55;
      }
    }

    this.camera.fov = portrait ? (count >= 3 ? 54 : 50) : count >= 3 ? 43 : 40;
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();

    if (instant) {
      this.cameraPos.copy(basePos);
      this.cameraTarget.copy(target);
      this.desiredPos.copy(basePos);
      this.desiredTarget.copy(target);
      this.camera.position.copy(basePos);
      this.camera.lookAt(target);
    }
    this.desiredPos.copy(basePos);
    this.desiredTarget.copy(target);
  }

  resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, width < 700 ? 1.5 : 1.65));
    this.renderer.setSize(width, height);
    this.composer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.updateCamera(true);
  }

  loop() {
    const dt = Math.min(this.clock.getDelta(), 0.05);
    this.elapsed += dt;
    const t = this.elapsed;

    // Ease pointer for a subtle camera parallax.
    this.pointer.lerp(this.pointerTarget, 1 - Math.exp(-dt * 1.8));

    const parallaxX = this.pointer.x * (this.camera.aspect < 0.78 ? 0.05 : 0.14);
    const parallaxY = this.pointer.y * 0.06;
    const driftX = Math.sin(t * 0.13) * 0.028;
    const driftY = Math.sin(t * 0.19) * 0.018;

    const targetPos = this.desiredPos.clone();
    targetPos.x += parallaxX + driftX;
    targetPos.y += -parallaxY + driftY;
    const targetLook = this.desiredTarget.clone();
    targetLook.x += parallaxX * 0.45;
    targetLook.y += -parallaxY * 0.2;

    if (this.titleMode) {
      targetPos.x += Math.sin(t * 0.07) * 0.18;
      targetPos.y += Math.sin(t * 0.11) * 0.035;
      targetLook.x += Math.sin(t * 0.07) * 0.06;
    }

    const smoothing = 1 - Math.exp(-dt * 3.2);
    this.cameraPos.lerp(targetPos, smoothing);
    this.cameraTarget.lerp(targetLook, smoothing);
    this.camera.position.copy(this.cameraPos);
    this.camera.lookAt(this.cameraTarget);

    // Characters breathe, sway, blink, and react.
    for (const [id, character] of this.characters) {
      if (!character.visible) continue;
      character.userData.update(t, dt);
      if (character.userData.speaking) {
        this.characterFill.position.x += (character.position.x - this.characterFill.position.x) * 0.1;
        this.characterFill.position.z += (character.position.z + 1.5 - this.characterFill.position.z) * 0.1;
      }
    }

    if (this.currentEnvironment) animateEnvironment(this.currentEnvironment, t);

    this.composer.render();
  }

  dispose() {
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("pointermove", this.onPointer);
    this.renderer.setAnimationLoop(null);
    this.composer.dispose?.();
    this.renderer.dispose();
  }
}
