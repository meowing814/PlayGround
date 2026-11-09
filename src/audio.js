export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.started = false;
    this.muted = false;
    this.volume = 0.45;
    this.scene = "title";
    this.timer = null;
    this.noteIndex = 0;
    this.padNodes = [];
    this.master = null;
    this.ambient = null;
    this.delay = null;
  }

  init() {
    if (this.ctx) return;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    this.ctx = new Ctx();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.muted ? 0 : this.volume;
    this.master.connect(this.ctx.destination);

    this.ambient = this.ctx.createGain();
    this.ambient.gain.value = 0.7;
    this.ambient.connect(this.master);

    this.delay = this.ctx.createDelay(1.0);
    this.delay.delayTime.value = 0.42;
    const feedback = this.ctx.createGain();
    feedback.gain.value = 0.24;
    this.delay.connect(feedback);
    feedback.connect(this.delay);
    const wet = this.ctx.createGain();
    wet.gain.value = 0.3;
    this.delay.connect(wet);
    wet.connect(this.master);

    this.createWind();
    this.createPad();
  }

  createWind() {
    const ctx = this.ctx;
    const bufferSize = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);
    for (let channel = 0; channel < 2; channel++) {
      const data = buffer.getChannelData(channel);
      let last = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        last = (last + 0.02 * white) / 1.02;
        data[i] = last * 3.2;
      }
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 420;
    filter.Q.value = 0.65;
    const gain = ctx.createGain();
    gain.gain.value = 0.035;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.ambient);
    source.start();
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.055;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 160;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();
    this.wind = { gain, filter };
  }

  chordFor(scene) {
    if (scene === "clinic" || scene === "clinicDawn") return [146.83, 174.61, 220.0, 261.63];
    if (scene === "mine") return [130.81, 155.56, 196.0, 246.94];
    if (scene === "stable") return [164.81, 196.0, 246.94, 293.66];
    if (scene === "streetDawn") return [174.61, 220.0, 261.63, 329.63];
    return [146.83, 185.0, 220.0, 293.66];
  }

  createPad() {
    const ctx = this.ctx;
    const chord = this.chordFor(this.scene);
    this.padNodes = chord.map((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = i % 2 ? "sine" : "triangle";
      osc.frequency.value = freq / (i === 0 ? 2 : 1);
      osc.detune.value = (i - 1.5) * 3.5;
      const gain = ctx.createGain();
      gain.gain.value = i === 0 ? 0.014 : 0.008;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 700;
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ambient);
      osc.start();
      return { osc, gain, filter };
    });
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.045;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 120;
    lfo.connect(lfoGain);
    lfoGain.connect(this.padNodes[0].filter.frequency);
    lfo.start();
    this.padLfo = lfo;
  }

  setScene(scene) {
    this.scene = scene;
    if (!this.ctx) return;
    const chord = this.chordFor(scene);
    const now = this.ctx.currentTime;
    this.padNodes.forEach((node, i) => {
      node.osc.frequency.cancelScheduledValues(now);
      node.osc.frequency.linearRampToValueAtTime(chord[i] / (i === 0 ? 2 : 1), now + 2.2);
    });
    if (this.wind) {
      const target = scene === "mine" ? 550 : scene.startsWith("street") ? 460 : 300;
      this.wind.filter.frequency.linearRampToValueAtTime(target, now + 2);
    }
  }

  start() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === "suspended") this.ctx.resume();
    if (this.started) return;
    this.started = true;
    this.schedulePluck(1.8);
  }

  schedulePluck(delay = 2.4) {
    if (!this.ctx) return;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (!this.muted && this.ctx?.state === "running") this.pluck();
      this.schedulePluck(2.1 + Math.random() * 3.8);
    }, delay * 1000);
  }

  pluck() {
    const ctx = this.ctx;
    if (!ctx) return;
    const scales = {
      title: [293.66, 349.23, 440.0, 523.25, 587.33],
      streetDusk: [293.66, 349.23, 440.0, 523.25, 587.33],
      streetDawn: [349.23, 440.0, 523.25, 659.25, 698.46],
      saloon: [293.66, 349.23, 440.0, 523.25, 587.33],
      saloonNight: [293.66, 349.23, 440.0, 523.25, 587.33],
      saloonDawn: [349.23, 440.0, 523.25, 587.33, 698.46],
      clinic: [440.0, 523.25, 659.25, 783.99, 880.0],
      clinicDawn: [440.0, 523.25, 659.25, 783.99, 880.0],
      stable: [392.0, 440.0, 523.25, 587.33, 659.25],
      mine: [261.63, 311.13, 392.0, 466.16, 523.25],
    };
    const scale = scales[this.scene] ?? scales.title;
    this.noteIndex = (this.noteIndex + 1 + Math.floor(Math.random() * 2)) % scale.length;
    const freq = scale[this.noteIndex];
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = freq;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2500, now);
    filter.frequency.exponentialRampToValueAtTime(500, now + 0.8);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.055, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);
    gain.connect(this.delay);
    osc.start(now);
    osc.stop(now + 1.6);

    // faint octave shimmer
    const shimmer = ctx.createOscillator();
    shimmer.type = "sine";
    shimmer.frequency.value = freq * 2;
    const sg = ctx.createGain();
    sg.gain.setValueAtTime(0.0001, now);
    sg.gain.exponentialRampToValueAtTime(0.009, now + 0.02);
    sg.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);
    shimmer.connect(sg);
    sg.connect(this.delay);
    shimmer.start(now);
    shimmer.stop(now + 0.8);
  }

  setVolume(value) {
    this.volume = Math.max(0, Math.min(1, value));
    if (this.master && !this.muted) {
      this.master.gain.cancelScheduledValues(this.ctx.currentTime);
      this.master.gain.linearRampToValueAtTime(this.volume, this.ctx.currentTime + 0.1);
    }
  }

  setMuted(muted) {
    this.muted = muted;
    if (!this.master) return;
    this.master.gain.cancelScheduledValues(this.ctx.currentTime);
    this.master.gain.linearRampToValueAtTime(muted ? 0 : this.volume, this.ctx.currentTime + 0.25);
  }

  tone(freq = 440, duration = 0.12, type = "sine", gainValue = 0.04) {
    if (!this.ctx || this.muted) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.value = freq;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(gainValue, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(gain);
    gain.connect(this.master);
    osc.start(now);
    osc.stop(now + duration + 0.03);
  }

  click() {
    this.tone(620, 0.055, "triangle", 0.035);
    setTimeout(() => this.tone(880, 0.04, "sine", 0.018), 25);
  }

  choice() {
    this.tone(392, 0.08, "triangle", 0.04);
    setTimeout(() => this.tone(587.33, 0.14, "sine", 0.03), 70);
  }

  heart() {
    this.tone(523.25, 0.18, "sine", 0.035);
    setTimeout(() => this.tone(659.25, 0.26, "sine", 0.026), 90);
  }

  obsession() {
    this.tone(220, 0.34, "sawtooth", 0.012);
    this.tone(233.08, 0.28, "sine", 0.018);
  }

  clue() {
    this.tone(880, 0.09, "sine", 0.022);
    setTimeout(() => this.tone(1174.66, 0.16, "sine", 0.018), 80);
  }

  transition() {
    this.tone(130.81, 0.8, "sine", 0.022);
    this.tone(196.0, 1.1, "triangle", 0.012);
  }

  ending() {
    const notes = [261.63, 329.63, 392.0, 523.25];
    notes.forEach((freq, i) => {
      setTimeout(() => this.tone(freq, 1.8, "sine", 0.028), i * 180);
    });
  }
}
