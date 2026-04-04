'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { playSound, setSoundEnabled } from '../utils/sound';

const frames = [
  { name: 'TYPE 1', accent: '#e83030', border: '#383830' },
  { name: 'TYPE 2', accent: '#f8d030', border: '#605020' },
  { name: 'TYPE 3', accent: '#30c060', border: '#205030' },
  { name: 'TYPE 4', accent: '#3050d0', border: '#202850' },
  { name: 'TYPE 5', accent: '#7038f8', border: '#382060' },
];

export default function Options({ onSettingsChange }) {
  const [textSpeed, setTextSpeed] = useState('MID');
  const [sound, setSound] = useState('STEREO');
  const [battleScene, setBattleScene] = useState('ON');
  const [battleStyle, setBattleStyle] = useState('SHIFT');
  const [buttonMode, setButtonMode] = useState('HELP');
  const [frame, setFrame] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const options = [
    { label: 'TEXT SPEED', value: textSpeed, options: ['SLOW', 'MID', 'FAST'], setter: setTextSpeed },
    { label: 'BATTLE SCENE', value: battleScene, options: ['ON', 'OFF'], setter: setBattleScene },
    { label: 'BATTLE STYLE', value: battleStyle, options: ['SHIFT', 'SET'], setter: setBattleStyle },
    { label: 'SOUND', value: sound, options: ['MONO', 'STEREO'], setter: setSound },
    { label: 'BUTTON MODE', value: buttonMode, options: ['NORMAL', 'HELP', 'L=A'], setter: setButtonMode },
    { label: 'FRAME', value: frames[frame].name, options: frames.map(f => f.name), setter: (val) => {
      const idx = frames.findIndex(f => f.name === val);
      setFrame(idx);
      applyFrame(idx);
    }},
    { label: 'CANCEL', value: '', options: [], setter: () => {} }
  ];

  // Load settings from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('fr-settings');
      if (saved) {
        const s = JSON.parse(saved);
        if (s.textSpeed) setTextSpeed(s.textSpeed);
        if (s.sound) setSound(s.sound);
        if (typeof s.frame === 'number') setFrame(s.frame);
        if (s.battleScene) setBattleScene(s.battleScene);
        if (s.battleStyle) setBattleStyle(s.battleStyle);
        if (s.buttonMode) setButtonMode(s.buttonMode);
        
        setSoundEnabled(s.sound !== 'OFF');
        applyFrame(s.frame || 0);
      }
    } catch {}
  }, []);

  const saveSettings = useCallback(() => {
    try {
      localStorage.setItem('fr-settings', JSON.stringify({ 
        textSpeed, 
        sound, 
        frame,
        battleScene,
        battleStyle,
        buttonMode
      }));
    } catch {}
  }, [textSpeed, sound, frame, battleScene, battleStyle, buttonMode]);

  useEffect(() => {
    saveSettings();
  }, [saveSettings]);

  const applyFrame = useCallback((idx) => {
    const f = frames[idx];
    document.documentElement.style.setProperty('--frame-accent', f.accent);
    document.documentElement.style.setProperty('--frame-border', f.border);
  }, []);

  const handleOptionChange = (option, direction) => {
    if (option.options.length === 0) return;
    playSound('cursor');
    const currentIndex = option.options.indexOf(option.value);
    let nextIndex = currentIndex + direction;
    if (nextIndex >= option.options.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = option.options.length - 1;
    
    option.setter(option.options[nextIndex]);
    
    if (option.label === 'TEXT SPEED') {
      onSettingsChange?.({ textSpeed: option.options[nextIndex] });
    }
    if (option.label === 'SOUND') {
      setSoundEnabled(option.options[nextIndex] !== 'OFF');
    }
  };

  return (
    <div className="pokemon-screen-wrapper">
      <div className="options-layer">
        <div className="options-container">
          {/* Header Control Tips */}
          <div className="options-header">
            <div className="header-tip">
              <span className="tip-icon">✚</span>PICK
            </div>
            <div className="header-tip">
              <span className="tip-icon">✚</span>SWITCH
            </div>
            <div className="header-tip">
              <span className="tip-icon-round">A</span>
              <span className="tip-icon-round">B</span>CANCEL
            </div>
          </div>

          {/* Title Bar */}
          <div className="options-title-bar">
            <div className="options-title-inner">
              OPTION
            </div>
          </div>

          {/* Main Options List */}
          <div className="options-list-container">
            <div className="options-list-border">
              <div className="options-list-inner">
                {options.map((opt, i) => (
                  <div 
                    key={opt.label}
                    className={`option-item-row ${selectedIndex === i ? 'selected' : ''}`}
                    onMouseEnter={() => {
                      if (selectedIndex !== i) {
                        playSound('cursor');
                        setSelectedIndex(i);
                      }
                    }}
                    onClick={() => {
                      if (opt.label === 'CANCEL') {
                        playSound('back');
                      } else {
                        handleOptionChange(opt, 1);
                      }
                    }}
                  >
                    <span className="option-item-label">{opt.label}</span>
                    <div className="option-item-value-container">
                      {opt.options.length > 0 && (
                        <span className="option-item-value">
                          {opt.value}
                        </span>
                      )}
                    </div>
                    {selectedIndex === i && (
                      <motion.div 
                        className="selection-indicator-gba"
                        layoutId="indicator"
                        initial={false}
                        transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .options-layer {
          position: relative;
          width: 100%;
          aspect-ratio: 1.5;
          max-width: 100%;
          max-height: 100%;
          display: flex;
          background: #384050;
          overflow: hidden;
          box-shadow: 0 0 20px rgba(0,0,0,0.5);
          image-rendering: pixelated;
        }

        .options-container {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 0;
        }

        .options-header {
          height: 10%;
          background: #0088cc;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding: 0 12px;
          gap: 15px;
          color: white;
          font-size: 8px;
          border-bottom: 2px solid #005588;
        }

        .header-tip {
          display: flex;
          align-items: center;
          gap: 4px;
          letter-spacing: 0.5px;
        }

        .tip-icon {
          font-size: 10px;
        }

        .tip-icon-round {
          background: white;
          color: #0088cc;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 6px;
          margin-right: 1px;
        }

        .options-title-bar {
          height: 15%;
          padding: 8px 14px;
          display: flex;
          align-items: center;
        }

        .options-title-inner {
          background: white;
          height: 100%;
          width: 100%;
          border: 3px solid #303030;
          display: flex;
          align-items: center;
          padding: 0 18px;
          font-size: 14px;
          color: #585858;
          box-shadow: inset 0 0 0 1px #e0e0e0;
        }

        .options-list-container {
          flex: 1;
          padding: 0 14px 14px 14px;
          overflow: hidden;
        }

        .options-list-border {
          background: #f8f8f8;
          height: 100%;
          border: 3px solid #707070;
          padding: 4px;
          box-sizing: border-box;
        }

        .options-list-inner {
          background: #f0f0f0;
          height: 100%;
          border: 2px solid #d0d0d0;
          display: flex;
          flex-direction: column;
          padding: 6px 0;
          overflow-y: auto;
          box-sizing: border-box;
        }

        .options-list-inner::-webkit-scrollbar {
          display: none;
        }

        .option-item-row {
          display: flex;
          align-items: center;
          padding: 8px 24px;
          cursor: pointer;
          position: relative;
          z-index: 10;
          min-height: 30px;
        }

        .option-item-label {
          font-size: 10px;
          color: #585858;
          width: 55%;
          position: relative;
          z-index: 2;
          font-weight: bold;
        }

        .option-item-value-container {
          flex: 1;
          position: relative;
          z-index: 2;
        }

        .option-item-value {
          font-size: 10px;
          color: #f85838;
          text-transform: uppercase;
          font-weight: bold;
        }

        .option-item-row.selected .option-item-label {
          color: #383838;
        }

        .selection-indicator-gba {
          position: absolute;
          left: 4px;
          right: 4px;
          top: 2px;
          bottom: 2px;
          background: #d0d8f0;
          border-radius: 1px;
          z-index: 1;
        }
      `}</style>
    </div>
  );
}
