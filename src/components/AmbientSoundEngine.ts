// Procedural Ambient Synthwave Soundscape Engine using Web Audio API
// Generates a cinematic, subtle midnight space drone with low-pass filtered harmonics.
// 100% generated in real-time in the browser — no external/illegal audio files needed!

class AmbientEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private filter: BiquadFilterNode | null = null;
  private isPlaying: boolean = false;

  public init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    this.ctx = new AudioCtx();

    // Master gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Filter - warm analog low-pass
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(420, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(3.5, this.ctx.currentTime);
    this.filter.connect(this.masterGain);

    // Atmospheric chord notes: D minor / F / A / C (Nocturnal Synthwave vibe)
    // D2 (73.42Hz), A2 (110.00Hz), D3 (146.83Hz), F3 (174.61Hz), A3 (220.00Hz)
    const freqs = [73.42, 110.0, 146.83, 174.61, 220.0];

    freqs.forEach((freq, i) => {
      if (!this.ctx || !this.filter) return;
      const osc = this.ctx.createOscillator();
      osc.type = i === 0 ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Subtle detune for lush chorus effect
      osc.detune.setValueAtTime((i % 2 === 0 ? 1 : -1) * (4 + i * 2), this.ctx.currentTime);

      const oscGain = this.ctx.createGain();
      oscGain.gain.setValueAtTime(0.045 / (i + 1), this.ctx.currentTime);

      osc.connect(oscGain);
      oscGain.connect(this.filter);
      osc.start();
      this.oscillators.push(osc);
    });

    // LFO for breathing filter sweep
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.08, this.ctx.currentTime); // very slow breath

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(140, this.ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(this.filter.frequency);
    lfo.start();
  }

  public play() {
    if (!this.ctx) this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0.35, this.ctx.currentTime + 3.0);
    }
    this.isPlaying = true;
  }

  public pause() {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1.5);
    }
    this.isPlaying = false;
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const ambientSound = new AmbientEngine();
