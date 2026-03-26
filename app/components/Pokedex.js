'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound } from '../utils/sound';
import { skills } from '../utils/data';

export default function Pokedex() {
  const [selected, setSelected] = useState(null);

  const handleSelect = useCallback((skill) => {
    playSound('confirm');
    setSelected(skill);
  }, []);

  const handleBack = useCallback(() => {
    playSound('back');
    setSelected(null);
  }, []);

  const getStatColor = (val) => {
    if (val >= 85) return 'var(--fr-green)';
    if (val >= 60) return 'var(--fr-yellow)';
    return 'var(--fr-red)';
  };

  if (selected) {
    return (
      <div>
        <div className="section-title">
          <button className="back-btn" onClick={handleBack}>◀ BACK</button>
          POKéDEX — #{selected.id}
        </div>
        <div className="pokedex-detail">
          <div className="pokedex-detail-header">
            <motion.div
              className="pokedex-sprite"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                {selected.sprite}
              </motion.div>
            </motion.div>
            <motion.div
              className="pokedex-info"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="pokedex-info-name">
                {selected.name}
                {selected.shiny && <span className="shiny-star">★</span>}
              </div>
              <div style={{ marginBottom: 8 }}>
                <span className={`type-badge type-${selected.type}`}>{selected.type}</span>
                {selected.type2 && <span className={`type-badge type-${selected.type2}`}>{selected.type2}</span>}
              </div>
              <div className="pokedex-meta">
                HT: {selected.height}<br />
                WT: {selected.weight}
              </div>
            </motion.div>
          </div>

          <motion.div
            className="pokedex-flavor"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {selected.flavor}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ fontFamily: 'var(--font-pixel)', fontSize: 9, marginBottom: 8, color: 'var(--fr-dark-gray)' }}
          >
            BASE STATS
          </motion.div>
          <div className="stats-grid">
            {Object.entries(selected.stats).map(([key, val], i) => {
              const labels = { hp: 'HP', atk: 'ATK', def: 'DEF', spAtk: 'SP.ATK', spDef: 'SP.DEF', speed: 'SPEED' };
              return (
                <div className="stat-row" key={key}>
                  <span className="stat-label">{labels[key]}</span>
                  <span className="stat-value">{val}</span>
                  <div className="stat-bar-track">
                    <motion.div
                      className="stat-bar-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${val}%` }}
                      transition={{ duration: 0.6, delay: 0.4 + (i * 0.1), type: "spring" }}
                      style={{ background: getStatColor(val) }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {selected.evolution && (
            <>
              <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 9, marginTop: 20, marginBottom: 8, color: 'var(--fr-dark-gray)' }}>
                EVOLUTION CHAIN
              </div>
              <div className="evolution-chain">
                {selected.evolution.map((evo, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {i > 0 && <span className="evo-arrow">▶</span>}
                    <div className="evo-stage">{evo}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="section-title">POKéDEX — SKILLS</div>
      <div className="counter-bar">
        <span>SEEN: {skills.length}</span>
        <span>OWN: {skills.length}</span>
      </div>
      <motion.ul
        className="pokedex-list"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
          }
        }}
      >
        {skills.map((skill) => (
          <motion.li
            key={skill.id}
            variants={{
              hidden: { opacity: 0, x: 20 },
              visible: { opacity: 1, x: 0 }
            }}
            whileHover={{ scale: 1.02, x: -5, backgroundColor: 'rgba(0,0,0,0.06)' }}
            whileTap={{ scale: 0.98 }}
            className="pokedex-entry"
            onClick={() => handleSelect(skill)}
          >
            <span className="pokedex-ball">🔴</span>
            <span className="pokedex-num">No{skill.id}</span>
            <span className="pokedex-name">
              {skill.name}
              {skill.shiny && <span className="shiny-star">★</span>}
            </span>
            <span className={`type-badge type-${skill.type}`} style={{ fontSize: 6 }}>{skill.type}</span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
