'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { playSound } from '../utils/sound';
import { trainerInfo } from '../utils/data';

export default function Save() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const menuItems = [
    { 
      type: 'continue',
      label: 'LINKEDIN',
      player: 'ATHARVA',
      time: '2024:04',
      badges: '08',
      href: trainerInfo.links.linkedin,
    },
    { 
      type: 'newgame',
      label: 'GITHUB',
      href: trainerInfo.links.github,
    },
    { 
      type: 'email',
      label: 'EMAIL',
      href: `mailto:atharva20453@gmail.com`,
    }
  ];

  const handleSelect = useCallback((item) => {
    if (item.href) {
      playSound('confirm');
      window.open(item.href, '_blank');
    }
  }, []);

  return (
    <div className="pokemon-screen-wrapper">
      <div className="save-bg-layer">
        <div className="save-menu-stack">
          {menuItems.map((item, i) => {
            if (item.type === 'continue') {
              return (
                <div 
                  key={i}
                  className={`save-slot-continue ${selectedIndex === i ? 'active' : ''}`}
                  onMouseEnter={() => { if(selectedIndex !== i) { playSound('cursor'); setSelectedIndex(i); } }}
                  onClick={() => handleSelect(item)}
                >
                  <div className="slot-inner-white">
                    <div className="slot-title">{item.label}</div>
                    <div className="slot-grid">
                      <div className="slot-row">
                        <span className="label-blue">PLAYER</span>
                        <span className="value-black">{item.player}</span>
                      </div>
                      <div className="slot-row">
                        <span className="label-blue">TIME</span>
                        <span className="value-black">{item.time}</span>
                      </div>
                      <div className="slot-row" style={{ marginTop: 'auto' }}>
                        <span className="label-blue">BADGES</span>
                        <span className="value-black">{item.badges}</span>
                      </div>
                    </div>
                  </div>
                  {selectedIndex === i && <motion.div layoutId="save-cursor" className="save-selection-border" />}
                </div>
              );
            }

            return (
              <div
                key={i}
                className={`save-slot-bar ${selectedIndex === i ? 'active' : ''}`}
                onMouseEnter={() => { if(selectedIndex !== i) { playSound('cursor'); setSelectedIndex(i); } }}
                onClick={() => handleSelect(item)}
              >
                <div className="slot-inner-gray">
                   {item.label}
                </div>
                {selectedIndex === i && <motion.div layoutId="save-cursor" className="save-selection-border" />}
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .save-menu-stack {
          width: 85%;
          max-width: 440px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .save-slot-continue {
          position: relative;
          background: #303030;
          padding: 3px;
          cursor: pointer;
        }

        .slot-inner-white {
          background: white;
          border: 2px solid #d0d0d0;
          padding: 20px 24px;
          min-height: 140px;
          display: flex;
          flex-direction: column;
        }

        .slot-title {
          font-family: 'Press Start 2P', cursive;
          font-size: 13px;
          color: #303030;
          margin-bottom: 24px;
          letter-spacing: 1px;
        }

        .slot-grid {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .slot-row {
          display: flex;
          gap: 40px;
          align-items: baseline;
        }

        .label-blue {
          font-family: 'Press Start 2P', cursive;
          font-size: 10px;
          color: #50a0f8; 
          width: 110px;
        }

        .value-black {
          font-family: 'Press Start 2P', cursive;
          font-size: 10px;
          color: #383838;
          text-transform: uppercase;
        }

        .save-slot-bar {
          position: relative;
          background: #303030;
          padding: 3px;
          cursor: pointer;
        }

        .slot-inner-gray {
          background: #808080;
          border: 2px solid #989898;
          padding: 14px 24px;
          font-family: 'Press Start 2P', cursive;
          font-size: 10px;
          color: #303030;
          text-transform: uppercase;
        }

        .save-slot-bar.active .slot-inner-gray {
          background: #a0a0a0;
        }

        .save-selection-border {
          position: absolute;
          inset: -6px;
          border: 4px solid #f8d038;
          pointer-events: none;
          z-index: 10;
        }
      `}</style>
    </div>
  );
}
