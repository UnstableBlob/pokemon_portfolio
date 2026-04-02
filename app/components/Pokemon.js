'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound } from '../utils/sound';
import { projects } from '../utils/data';

const typeIcons = {
  FIRE: '🔥', WATER: '💧', GRASS: '🌿', ELECTRIC: '⚡',
  PSYCHIC: '🧠', ROCK: '🪨', DRAGON: '🐉', DARK: '⚫', NORMAL: '✨',
};

export default function Pokemon({ onClose }) {
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState('info');

  const handleSelect = useCallback((proj) => {
    playSound('confirm');
    setSelected(proj);
    setTab('info');
  }, []);

  const handleBack = useCallback(() => {
    playSound('back');
    setSelected(null);
  }, []);

  const getHpClass = (curr, max) => {
    const pct = (curr / max) * 100;
    if (pct > 50) return 'hp-high';
    if (pct > 20) return 'hp-mid';
    return 'hp-low';
  };

  if (selected) {
    return (
      <div className="pokemon-screen-wrapper">
        <div className="pokemon-bg-layer">
          <div style={{ padding: '4%', height: '75%' }}>
            <div className="fr-box" style={{ background: '#60a8d8', border: '3px solid #405881', color: 'white', marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12 }}>{selected.name}</span>
                <span style={{ fontSize: 8 }}>Lv. {selected.level}</span>
              </div>
            </div>

            <div className="project-detail" style={{ background: 'rgba(255,255,255,0.95)', padding: '10px 14px', border: '3px solid #405881', height: 'calc(100% - 45px)', overflow: 'hidden' }}>
              {/* Tab buttons */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <button
                  className={`nes-btn is-primary ${tab === 'info' ? 'active' : ''}`}
                  onClick={() => { setTab('info'); playSound('cursor'); }}
                  style={{ fontSize: 7, padding: '2px 8px' }}
                >INFO</button>
                <button
                  className={`nes-btn is-success ${tab === 'moves' ? 'active' : ''}`}
                  onClick={() => { setTab('moves'); playSound('cursor'); }}
                  style={{ fontSize: 7, padding: '2px 8px' }}
                >MOVES</button>
              </div>

              <AnimatePresence mode="wait">
                {tab === 'info' && (
                  <motion.div
                    key="info"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="project-info" style={{ color: '#303030' }}>
                      <div style={{ marginBottom: 4, fontSize: 11, fontWeight: 'bold' }}>{selected.species}</div>
                      <div style={{ marginBottom: 10 }}>
                        <span className={`type-badge type-${selected.type}`} style={{ fontSize: 7, padding: '2px 5px' }}>{selected.type}</span>
                        {selected.type2 && <span className={`type-badge type-${selected.type2}`} style={{ fontSize: 7, padding: '2px 5px', marginLeft: 6 }}>{selected.type2}</span>}
                      </div>

                      <div className="hp-bar-track" style={{ height: 6, marginBottom: 10 }}>
                        <motion.div
                          className={`hp-bar-fill ${getHpClass(selected.hp.current, selected.hp.max)}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${(selected.hp.current / selected.hp.max) * 100}%` }}
                        />
                      </div>

                      <p style={{ fontSize: 9, lineHeight: 1.5, marginBottom: 10 }}>{selected.flavor}</p>
                      
                      <div style={{ marginBottom: 8 }}>
                        <div style={{ color: '#585858', fontSize: 7, marginBottom: 3, textTransform: 'uppercase' }}>TECH:</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                          {selected.tech?.map(t => (
                            <span key={t} style={{ border: '1px solid #405881', padding: '1px 4px', fontSize: 6, borderRadius: 2, background: 'white' }}>{t}</span>
                          ))}
                        </div>
                      </div>

                      <div style={{ marginBottom: 8 }}>
                        <div style={{ color: '#585858', fontSize: 7, marginBottom: 3, textTransform: 'uppercase' }}>IMPACT:</div>
                        <p style={{ fontSize: 8, color: '#202020', lineHeight: 1.4 }}>{selected.impact}</p>
                      </div>

                      <div style={{ marginTop: 10, fontSize: 6, color: '#686868' }}>OT: {selected.ot} ID: {selected.idNo}</div>
                    </div>
                  </motion.div>
                )}

                {tab === 'moves' && (
                  <motion.div key="moves">
                    <div style={{ color: '#303030', fontSize: 9 }}>
                      {selected.moves.map((move, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #eee' }}>
                          <span>{move.name}</span>
                          <span style={{ fontSize: 7, color: '#686868' }}>{move.type} / {move.pp}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="party-footer-gba">
            <div className="party-dialog-gba">
              Check {selected.name}'s info?
            </div>
            <button className="nes-btn is-error" onClick={handleBack} style={{ fontSize: 8, padding: '4px 10px' }}>
              BACK
            </button>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="pokemon-screen-wrapper">
      <div className="pokemon-bg-layer">
        <div className="party-layout">
          {/* Main Slot (Project 1) */}
          <div className="party-main-slot-container">
            {projects[0] && (
              <motion.div
                className="party-slot-gba main-slot-gba"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(projects[0])}
              >
                <div style={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}>
                  <motion.div
                    className="slot-icon-gba"
                    style={{ fontSize: 48 }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    {typeIcons[projects[0].type] || '✨'}
                  </motion.div>
                  <div className="slot-info-gba">
                    <div className="slot-name-gba" style={{ fontSize: 11, marginBottom: 6 }}>{projects[0].name}</div>
                    <div className="slot-meta-gba" style={{ fontSize: 9, marginBottom: 8 }}>Lv.{projects[0].level}</div>
                    <div className="hp-container-gba">
                      <span className="hp-label-gba">HP</span>
                      <div className="hp-bar-gba">
                        <motion.div
                          className="hp-fill-gba"
                          initial={{ width: 0 }}
                          animate={{ width: `${(projects[0].hp.current / projects[0].hp.max) * 100}%` }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                          style={{
                            background: (projects[0].hp.current / projects[0].hp.max) > 0.5 ? '#40c868' : (projects[0].hp.current / projects[0].hp.max) > 0.2 ? '#f8b050' : '#f85838',
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: 8, color: 'white', marginTop: 4 }}>
                      {projects[0].hp.current}/{projects[0].hp.max}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* List Slots (Projects 2-6) */}
          <div className="party-list-container">
            {projects.slice(1, 6).map((proj, i) => (
              <motion.div
                key={i}
                className="party-slot-gba list-slot-gba"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * (i + 1) }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(proj)}
              >
                <div className="slot-icon-gba" style={{ fontSize: 24 }}>
                  {typeIcons[proj.type] || '✨'}
                </div>
                <div className="slot-info-gba">
                  <div className="slot-name-gba">{proj.name}</div>
                  <div className="slot-meta-gba">
                    <span>Lv.{proj.level}</span>
                    <div className="hp-container-gba" style={{ width: '55%' }}>
                      <span className="hp-label-gba" style={{ fontSize: 5 }}>HP</span>
                      <div className="hp-bar-gba">
                        <motion.div
                          className="hp-fill-gba"
                          initial={{ width: 0 }}
                          animate={{ width: `${(proj.hp.current / proj.hp.max) * 100}%` }}
                          transition={{ duration: 0.8, delay: 0.5 + (i * 0.1) }}
                          style={{
                            background: (proj.hp.current / proj.hp.max) > 0.5 ? '#40c868' : (proj.hp.current / proj.hp.max) > 0.2 ? '#f8b050' : '#f85838',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ position: 'absolute', right: 12, bottom: 4, fontSize: 7, color: 'white' }}>
                  {proj.hp.current}/{proj.hp.max}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="party-footer-gba">
          <div className="party-dialog-gba">
            Choose a POKéMON.
          </div>
          {/* <button className="party-cancel-gba" onClick={() => { playSound('back'); onClose && onClose(); }}>
            CANCEL
          </button> */}
        </div>
      </div>
    </div>
  );
}
