'use client';

import { useState, useEffect, useCallback } from 'react';
import { playSound, setSoundEnabled } from '../utils/sound';

const frames = [
  { name: 'FIRE RED', accent: '#e83030', border: '#383830' },
  { name: 'GOLD', accent: '#f8d030', border: '#605020' },
  { name: 'EMERALD', accent: '#30c060', border: '#205030' },
  { name: 'SAPPHIRE', accent: '#3050d0', border: '#202850' },
  { name: 'AMETHYST', accent: '#7038f8', border: '#382060' },
];

export default function Options({ onSettingsChange }) {
  const [textSpeed, setTextSpeed] = useState('MID');
  const [sound, setSound] = useState('ON');
  const [frame, setFrame] = useState(0);

  // Load settings from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('fr-settings');
      if (saved) {
        const s = JSON.parse(saved);
        if (s.textSpeed) setTextSpeed(s.textSpeed);
        if (s.sound) setSound(s.sound);
        if (typeof s.frame === 'number') setFrame(s.frame);
        setSoundEnabled(s.sound !== 'OFF');
        applyFrame(s.frame || 0);
      }
    } catch {}
  }, []);

  const saveSettings = useCallback((ts, snd, fr) => {
    try {
      localStorage.setItem('fr-settings', JSON.stringify({ textSpeed: ts, sound: snd, frame: fr }));
    } catch {}
  }, []);

  const applyFrame = useCallback((idx) => {
    const f = frames[idx];
    document.documentElement.style.setProperty('--frame-accent', f.accent);
    document.documentElement.style.setProperty('--frame-border', f.border);
  }, []);

  const handleTextSpeed = useCallback((val) => {
    playSound('cursor');
    setTextSpeed(val);
    saveSettings(val, sound, frame);
    onSettingsChange?.({ textSpeed: val });
  }, [sound, frame, saveSettings, onSettingsChange]);

  const handleSound = useCallback((val) => {
    setSound(val);
    setSoundEnabled(val !== 'OFF');
    if (val !== 'OFF') playSound('cursor');
    saveSettings(textSpeed, val, frame);
  }, [textSpeed, frame, saveSettings]);

  const handleFrame = useCallback((idx) => {
    playSound('cursor');
    setFrame(idx);
    applyFrame(idx);
    saveSettings(textSpeed, sound, idx);
  }, [textSpeed, sound, saveSettings, applyFrame]);

  return (
    <div>
      <div className="section-title">OPTION — SETTINGS</div>

      <div style={{ padding: '8px 0' }}>
        {/* TEXT SPEED */}
        <div className="option-row">
          <span className="option-label">TEXT SPEED</span>
          <div className="option-values">
            {['SLOW', 'MID', 'FAST'].map(val => (
              <button
                key={val}
                className={`option-value ${textSpeed === val ? 'active' : ''}`}
                onClick={() => handleTextSpeed(val)}
              >
                {val}
              </button>
            ))}
          </div>
        </div>

        {/* SOUND */}
        <div className="option-row">
          <span className="option-label">SOUND</span>
          <div className="option-values">
            {['ON', 'OFF'].map(val => (
              <button
                key={val}
                className={`option-value ${sound === val ? 'active' : ''}`}
                onClick={() => handleSound(val)}
              >
                {val}
              </button>
            ))}
          </div>
        </div>

        {/* FRAME */}
        <div className="option-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
          <span className="option-label">FRAME</span>
          <div className="option-values" style={{ flexWrap: 'wrap' }}>
            {frames.map((f, i) => (
              <button
                key={i}
                className={`option-value ${frame === i ? 'active' : ''}`}
                onClick={() => handleFrame(i)}
                style={{
                  borderColor: f.accent,
                  ...(frame === i ? { background: f.accent } : {}),
                }}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>

        {/* Credits */}
        <div style={{
          margin: '30px 24px',
          padding: 16,
          fontFamily: 'var(--font-pixel)',
          fontSize: 7,
          color: 'var(--fr-dark-gray)',
          lineHeight: 2.2,
          borderTop: '2px solid rgba(0,0,0,0.1)',
        }}>
          POKéMON FIRE RED PORTFOLIO<br />
          BUILT WITH NEXT.JS + NES.CSS<br />
          DESIGN INSPIRED BY GAME FREAK<br />
          © {new Date().getFullYear()} ATHAR
        </div>
      </div>
    </div>
  );
}
