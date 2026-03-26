'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound } from '../utils/sound';
import { projects } from '../utils/data';

const typeIcons = {
  FIRE: '🔥', WATER: '💧', GRASS: '🌿', ELECTRIC: '⚡',
  PSYCHIC: '🧠', ROCK: '🪨', DRAGON: '🐉', DARK: '⚫', NORMAL: '✨',
};

export default function Pokemon() {
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
      <div>
        <div className="section-title">
          <button className="back-btn" onClick={handleBack}>◀ BACK</button>
          POKéMON — {selected.name}
        </div>
        <div className="project-detail">
          {/* Tab buttons */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
            <button
              className={`save-option ${tab === 'info' ? 'active' : ''}`}
              onClick={() => { setTab('info'); playSound('cursor'); }}
              style={{ fontSize: 8, fontFamily: 'var(--font-pixel)' }}
            >INFO</button>
            <button
              className={`save-option ${tab === 'moves' ? 'active' : ''}`}
              onClick={() => { setTab('moves'); playSound('cursor'); }}
              style={{ fontSize: 8, fontFamily: 'var(--font-pixel)' }}
            >MOVES</button>
          </div>

            <AnimatePresence mode="wait">
              {tab === 'info' && (
                <motion.div
                  key="info"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="project-detail-header">
                    <motion.div 
                      className="project-sprite"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                    >
                      {typeIcons[selected.type] || '✨'}
                    </motion.div>
                    <div className="project-info">
                      <div className="project-info-name">{selected.name}</div>
                      <div className="project-info-species">{selected.species}</div>
                      <div style={{ marginBottom: 8 }}>
                        <span className={`type-badge type-${selected.type}`}>{selected.type}</span>
                        {selected.type2 && <span className={`type-badge type-${selected.type2}`}>{selected.type2}</span>}
                      </div>
                      <span className={`status-badge status-${selected.status}`}>{selected.status}</span>
                    </div>
                  </div>

                  <div className="fr-box" style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-pixel)', fontSize: 8, marginBottom: 8 }}>
                      <span>Lv. {selected.level}</span>
                      <span>{selected.hp.current}/{selected.hp.max} HP</span>
                    </div>
                    <div className="hp-bar-track">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(selected.hp.current / selected.hp.max) * 100}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={`hp-bar-fill ${getHpClass(selected.hp.current, selected.hp.max)}`}
                      />
                    </div>
                  </div>

                  <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 8, lineHeight: 2.5, padding: '8px 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--fr-dark-gray)' }}>OT:</span>
                      <span>{selected.ot}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--fr-dark-gray)' }}>ID No.:</span>
                      <span>{selected.idNo}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--fr-dark-gray)' }}>HELD ITEM:</span>
                      <span>{selected.held}</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {tab === 'moves' && (
                <motion.div 
                  key="moves"
                  className="project-moves"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 9, marginBottom: 12, color: 'var(--fr-dark-gray)' }}>
                    KNOWN MOVES
                  </div>
                  {selected.moves.map((move, i) => (
                    <motion.div 
                      key={i} 
                      className="project-move"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className={`type-badge type-${move.type}`} style={{ fontSize: 6 }}>{move.type}</span>
                      <span className="project-move-name">{move.name}</span>
                      <span className="project-move-pp">PP: {move.pp}</span>
                      <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 7, color: 'var(--fr-dark-gray)' }}>
                        PWR {move.power}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="section-title">POKéMON — PROJECTS</div>
      <div style={{ padding: 8, fontFamily: 'var(--font-pixel)', fontSize: 8, color: 'var(--fr-dark-gray)', borderBottom: '2px solid var(--fr-box-border)', background: 'var(--fr-white)' }}>
        Choose a POKéMON.
      </div>
      <motion.div 
        className="party-grid"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
      >
        {projects.map((proj, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              show: { opacity: 1, scale: 1 }
            }}
            whileHover={{ scale: i === 0 ? 1.02 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`party-slot ${i === 0 ? 'slot-main' : ''}`}
            onClick={() => handleSelect(proj)}
          >
            <motion.div 
              className="party-slot-icon"
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
            >
              {typeIcons[proj.type] || '✨'}
            </motion.div>
            <div className="party-slot-info">
              <div className="party-slot-name">
                {proj.name}
                {proj.status !== 'OK' && (
                  <span className={`status-badge status-${proj.status}`} style={{ marginLeft: 6 }}>{proj.status}</span>
                )}
              </div>
              <div className="party-slot-level">Lv.{proj.level} — {proj.species}</div>
              <div className="party-hp">
                <span className="party-hp-label">HP</span>
                <div className="party-hp-bar">
                  <motion.div
                    className="party-hp-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${(proj.hp.current / proj.hp.max) * 100}%` }}
                    transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
                    style={{
                      background: (proj.hp.current / proj.hp.max) > 0.5 ? 'var(--fr-green)' : (proj.hp.current / proj.hp.max) > 0.2 ? 'var(--fr-orange)' : 'var(--fr-red)',
                    }}
                  />
                </div>
                <span className="party-hp-text">{proj.hp.current}/{proj.hp.max}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
