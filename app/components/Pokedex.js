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
      <div className="pokedex-screen-wrapper">
        <div className="pokedex-bg-layer">
          <div className="pokedex-detail-screen">
            {/* HEADER */}
            <div className="pokedex-header">
              <div className="header-inner">
                POKéMON LIST
              </div>
            </div>

            <div className="pokedex-detail-content">
              {/* TOP INFO BOX */}
              <div className="pokedex-detail-top">
                <div className="pd-info-left">
                  <div className="pd-row-main">
                    <span className="pd-num">No{selected.id}</span>
                    <span className="pd-name">{selected.name.toUpperCase()}</span>
                  </div>
                  <div className="pd-species">
                    {selected.type.toUpperCase()} POKéMON
                  </div>
                  <div className="pd-meta-row">
                    <span className="pd-meta-label">HT</span>
                    <span className="pd-meta-value">5' 07"</span>
                  </div>
                  <div className="pd-meta-row">
                    <span className="pd-meta-label">WT</span>
                    <span className="pd-meta-value">132.5 lbs.</span>
                  </div>
                </div>
                <div className="pd-sprite-container">
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="pd-sprite-main"
                  >
                    {selected.sprite}
                  </motion.div>
                </div>
              </div>

              {/* BOTTOM FLAVOR BOX */}
              <div className="pokedex-detail-bottom">
                <p className="pd-flavor-text">
                  {selected.flavor}
                </p>
              </div>
            </div>

            {/* FOOTER */}
            <div className="pokedex-footer">
              <div className="footer-controls-detail">
                <div className="control-item">
                  <span className="control-btn-rect">START</span> CRY
                </div>
                <div className="control-item">
                  <span className="control-btn-alt">Ⓐ</span> NEXT DATA
                </div>
                <div className="control-item" onClick={handleBack} style={{ cursor: 'pointer' }}>
                  <span className="control-btn-alt">Ⓑ</span> CANCEL
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pokedex-screen-wrapper">
      <div className="pokedex-bg-layer">
        <div className="pokedex-screen">
          {/* HEADER */}
          <div className="pokedex-header">
        <div className="header-inner">
          POKéMON LIST
        </div>
      </div>

      <div className="pokedex-list-container">
        {/* Background Stripes */}
        <div className="pokedex-stripes-bg" />

        <ul className="pokedex-list">
          {skills.map((skill, index) => (
            <motion.li
              key={skill.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="pokedex-entry"
              onClick={() => handleSelect(skill)}
            >
              <div className="entry-selector">
                <div className="selector-arrow">▶</div>
              </div>

              <div className="entry-content">
                <span className="pokedex-num">No{skill.id}</span>
                
                <img 
                  src="/pokemon_portfolio/sprites/pokeball.png" 
                  alt="poke" 
                  className="pokedex-ball-img"
                />

                <span className="pokedex-name">
                  {skill.name.toUpperCase()}
                  {skill.shiny && <span className="shiny-star">★</span>}
                </span>

                <div className="pokedex-types">
                  <span className={`type-badge type-${skill.type}`}>{skill.type}</span>
                  {skill.type2 && (
                    <span className={`type-badge type-${skill.type2}`}>{skill.type2}</span>
                  )}
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* FOOTER */}
      <div className="pokedex-footer">
        <div className="footer-controls">
          <div className="control-item">
            <span className="control-btn">╋</span> PICK
          </div>
          <div className="control-item">
            <span className="control-btn">Ⓐ</span> OK
          </div>
          <div className="control-item">
            <span className="control-btn">Ⓑ</span> CANCEL
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}
