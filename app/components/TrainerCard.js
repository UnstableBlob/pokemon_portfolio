'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { playSound } from '../utils/sound';
import { trainerInfo } from '../utils/data';

const badgeEmojis = ['🪨', '💧', '⚡', '🌈', '👻', '🧠', '🌋', '🌍'];

export default function TrainerCard() {
  const [flipped, setFlipped] = useState(false);
  const [hoveredBadge, setHoveredBadge] = useState(null);

  const handleFlip = useCallback(() => {
    playSound('confirm');
    setFlipped(prev => !prev);
  }, []);

  return (
    <div className="section-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
      <div style={{ textAlign: 'center', width: '100%' }}>
        <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 10, color: '#303030', marginBottom: '16px' }}>
          TRAINER CARD — {trainerInfo.name}
        </div>

        <div className="trainer-card-wrapper">
          <motion.div
            className="trainer-card"
            onClick={handleFlip}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          >
            {/* FRONT FACE */}
            <div className="card-face card-front">
              <div className="tc-overlay">
                <div className="tc-header-id">
                  {trainerInfo.idNo}
                </div>

                <div className="tc-main-info">
                  {/* Row 1: NAME */}
                  <div className="tc-row" style={{ marginTop: '0.5%' }}>
                    <span className="tc-value" style={{ fontSize: 9 }}>{trainerInfo.name}</span>
                  </div>
                  {/* Row 2: MONEY (used for Role) */}
                  <div className="tc-row" style={{ marginTop: '10%' }}>
                    <span className="tc-value" style={{ fontSize: 6.5 }}>{trainerInfo.money}</span>
                  </div>
                  {/* Row 3: POKEDEX (Skills) */}
                  <div className="tc-row" style={{ marginTop: '0%' }}>
                    <span className="tc-value" style={{ fontSize: 7 }}>{trainerInfo.pokedex} SKILLS FOUND</span>
                  </div>
                  {/* Row 4: TIME */}
                  <div className="tc-row" style={{ marginTop: '0%' }}>
                    <span className="tc-value" style={{ fontSize: 7 }}>{trainerInfo.time}</span>
                  </div>
                </div>

                <div className="tc-badges-container">
                  {trainerInfo.badges.map((badge, i) => (
                    <div
                      key={i}
                      className="tc-badge-slot"
                      onMouseEnter={() => setHoveredBadge(i)}
                      onMouseLeave={() => setHoveredBadge(null)}
                    >
                      {badge.earned ? (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.1 * i }}
                          style={{ fontSize: 13 }}
                        >
                          {badgeEmojis[i]}
                        </motion.span>
                      ) : null}

                      {hoveredBadge === i && (
                        <div className="badge-tooltip" style={{ bottom: '130%', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', zIndex: 10 }}>
                          <div style={{ fontSize: 8 }}>{badge.name}</div>
                          <div style={{ fontSize: 6, opacity: 0.8 }}>{badge.desc}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* BACK FACE */}
            <div className="card-face card-back">
              <div className="tc-overlay">
                <div className="tc-back-content">
                  <div className="tc-back-header">
                    <span style={{ marginLeft: '62%', fontSize: 8 }}>BLOB</span>
                  </div>
                  <div className="tc-back-bio">
                    {trainerInfo.bio}
                  </div>
                  {/* <div className="tc-back-links">
                    <a
                      href={trainerInfo.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nes-btn is-primary"
                      style={{ padding: '2px 8px', fontSize: 5.5, textDecoration: 'none' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      GITHUB
                    </a>
                    <a
                      href={trainerInfo.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nes-btn is-success"
                      style={{ padding: '2px 8px', fontSize: 5.5, textDecoration: 'none' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      LINKEDIN
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 7, color: 'rgba(50,50,50,0.5)', marginTop: '12px' }}>
          ( Click card to flip )
        </div>
      </div>
    </div>
  );
}
