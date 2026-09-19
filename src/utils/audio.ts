// Enchanting Underwater Mermaid Music Box & Ocean Chimes Synthesizer
// Produces crystal-clear musical bell notes, warm bass harmonies, and festive ocean chimes

class SoundFX {
  private ctx: AudioContext | null = null;
  private isPlayingMusic = false;
  private isMuted = false;
  private timerId: any = null;
  private stepIndex = 0;

  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Play a single bright, melodious crystal chime/bell
  private playBell(freq: number, duration = 1.4, volume = 0.11) {
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;

      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.linearRampToValueAtTime(volume, now + 0.012);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      masterGain.connect(this.ctx.destination);

      // 1. Pure crystal sine
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);
      osc1.connect(masterGain);
      osc1.start(now);
      osc1.stop(now + duration + 0.05);

      // 2. Warm body overtone (triangle)
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      gain2.gain.setValueAtTime(0.35, now);
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq, now);
      osc2.connect(gain2);
      gain2.connect(masterGain);
      osc2.start(now);
      osc2.stop(now + duration * 0.7);

      // 3. Shimmer overtone (sine at 2x octave sparkle)
      const osc3 = this.ctx.createOscillator();
      const gain3 = this.ctx.createGain();
      gain3.gain.setValueAtTime(0.2, now);
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(freq * 2, now);
      osc3.connect(gain3);
      gain3.connect(masterGain);
      osc3.start(now);
      osc3.stop(now + duration * 0.5);
    } catch (_) {}
  }

  // Play warm bass root note on chord downbeats (soft background pad)
  private playWarmBass(freq: number, duration = 1.8, volume = 0.05) {
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(volume, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      gain.connect(this.ctx.destination);

      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.connect(gain);
      osc.start(now);
      osc.stop(now + duration + 0.05);
    } catch (_) {}
  }

  // Play cascading shell flourish on opening cover (prominent and festive)
  playShellOpenChime() {
    try {
      this.initContext();
      if (!this.ctx || this.isMuted) return;

      const now = this.ctx.currentTime;
      const freqs = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0.001, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.22, now + idx * 0.07 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 1.4);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 1.5);
      });
    } catch (_) {}
  }

  // Play crisp, loud water bubble pop on buttons
  playBubblePop() {
    try {
      this.initContext();
      if (!this.ctx || this.isMuted) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(520 + Math.random() * 150, now);
      osc.frequency.exponentialRampToValueAtTime(980 + Math.random() * 250, now + 0.09);

      gain.gain.setValueAtTime(0.20, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch (_) {}
  }

  // Start playing ambient music theme
  startAmbient(onStateChange?: (isPlaying: boolean) => void) {
    this.initContext();
    this.isMuted = false;
    if (this.isPlayingMusic) return;
    this.isPlayingMusic = true;
    if (onStateChange) onStateChange(true);

    // Magical music box melody (calibrated to ~70% volume for pleasant background listening)
    const melody: { note: number; bass?: number; duration?: number; volume?: number }[] = [
      // Measure 1: C Major sparkle
      { note: 523.25, bass: 130.81, duration: 1.5, volume: 0.125 }, // C5
      { note: 659.25, duration: 1.2, volume: 0.11 },                // E5
      { note: 783.99, duration: 1.2, volume: 0.11 },                // G5
      { note: 1046.50, duration: 1.6, volume: 0.13 },               // C6

      // Measure 2: G Major gentle wave
      { note: 987.77, bass: 196.00, duration: 1.5, volume: 0.12 },  // B5
      { note: 783.99, duration: 1.2, volume: 0.105 },               // G5
      { note: 659.25, duration: 1.2, volume: 0.105 },               // E5
      { note: 783.99, duration: 1.4, volume: 0.11 },                // G5

      // Measure 3: A Minor sweet lullaby
      { note: 880.00, bass: 220.00, duration: 1.5, volume: 0.125 }, // A5
      { note: 1046.50, duration: 1.3, volume: 0.12 },               // C6
      { note: 659.25, duration: 1.2, volume: 0.105 },               // E5
      { note: 880.00, duration: 1.5, volume: 0.12 },                // A5

      // Measure 4: F Major to G resolution
      { note: 783.99, bass: 174.61, duration: 1.5, volume: 0.125 }, // G5
      { note: 698.46, duration: 1.2, volume: 0.11 },                // F5
      { note: 659.25, duration: 1.3, volume: 0.105 },               // E5
      { note: 587.33, bass: 196.00, duration: 1.8, volume: 0.125 }, // D5
    ];

    const stepDurationMs = 450; // Tempo: ~133 BPM eighth notes, gentle and crystal-clear

    const tick = () => {
      if (!this.isPlayingMusic || !this.ctx || this.isMuted) return;

      const item = melody[this.stepIndex % melody.length];
      this.stepIndex = (this.stepIndex + 1) % melody.length;

      this.playBell(item.note, item.duration ?? 1.4, item.volume ?? 0.16);
      if (item.bass) {
        this.playWarmBass(item.bass, 2.0, 0.08);
      }

      if (this.isPlayingMusic && !this.isMuted) {
        this.timerId = setTimeout(tick, stepDurationMs);
      }
    };

    tick();
  }

  stopAmbient(onStateChange?: (isPlaying: boolean) => void) {
    this.isPlayingMusic = false;
    this.isMuted = true;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (onStateChange) onStateChange(false);
  }

  // Toggle looping music
  toggleAmbientLoop(onStateChange?: (isPlaying: boolean) => void): boolean {
    if (this.isPlayingMusic && !this.isMuted) {
      this.stopAmbient(onStateChange);
      return false;
    } else {
      this.startAmbient(onStateChange);
      return true;
    }
  }

  // Resume AudioContext and start if not playing (unlock on user interaction)
  resumeAndPlay(onStateChange?: (isPlaying: boolean) => void) {
    if (this.isMuted) return;
    const context = this.initContext();
    if (context) {
      if (context.state === 'suspended') {
        context.resume().then(() => {
          if (!this.isPlayingMusic && !this.isMuted) {
            this.startAmbient(onStateChange);
          }
        }).catch(() => {});
      } else if (!this.isPlayingMusic && !this.isMuted) {
        this.startAmbient(onStateChange);
      }
    }
  }

  get isPlaying() {
    return this.isPlayingMusic && !this.isMuted;
  }
}

export const soundFX = new SoundFX();
