'use client';

const AudioCtx = typeof window !== 'undefined' ? (window.AudioContext || window.webkitAudioContext) : null;
let ctx;

function getCtx() {
  if (!ctx && AudioCtx) ctx = new AudioCtx();
  return ctx;
}

function playTone(freq, duration, type = 'square', gain = 0.15) {
  const c = getCtx();
  if (!c) return;
  const osc = c.createOscillator();
  const vol = c.createGain();
  osc.connect(vol);
  vol.connect(c.destination);
  osc.type = type;
  osc.frequency.value = freq;
  vol.gain.setValueAtTime(gain, c.currentTime);
  vol.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
  osc.start(c.currentTime);
  osc.stop(c.currentTime + duration);
}

export const sounds = {
  cursor: () => playTone(880, 0.06),
  confirm: () => {
    playTone(440, 0.08);
    setTimeout(() => playTone(660, 0.08), 80);
  },
  back: () => playTone(440, 0.1),
  open: () => [440, 550, 660].forEach((f, i) => setTimeout(() => playTone(f, 0.1), i * 100)),
  save: () => [440, 550, 660, 880].forEach((f, i) => setTimeout(() => playTone(f, 0.12), i * 120)),
};

let soundEnabled = true;

export function setSoundEnabled(val) {
  soundEnabled = val;
}

export function playSound(name) {
  if (soundEnabled && sounds[name]) sounds[name]();
}
