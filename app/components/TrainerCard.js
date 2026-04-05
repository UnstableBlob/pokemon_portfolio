'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { playSound } from '../utils/sound';
import { trainerInfo } from '../utils/data';
import GithubPixelGraph from './GithubPixelGraph';

const Sparkle = ({ x, y, delay }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{
      scale: [0, 1.5, 0],
      opacity: [0, 1, 0],
      translateY: [0, -30],
      translateX: [0, (Math.random() - 0.5) * 40]
    }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 4,
      height: 4,
      backgroundColor: '#f8d030',
      boxShadow: '0 0 5px #f8d030',
      zIndex: 1000,
      pointerEvents: 'none',
      imageRendering: 'pixelated'
    }}
  />
);

const badgeEmojis = ['🚀', '🔮', '🏗️', '🎓', '👻', '🧠', '🌋', '🌍'];

export default function TrainerCard() {
  const [flipped, setFlipped] = useState(false);
  const [hoveredBadge, setHoveredBadge] = useState(null);
  const [sparkles, setSparkles] = useState([]);

  const handleFlip = useCallback(() => {
    playSound('confirm');
    setFlipped(prev => !prev);

    // Trigger sparkles
    const newSparkles = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100 + '%',
      y: Math.random() * 100 + '%',
      delay: Math.random() * 0.3
    }));
    setSparkles(newSparkles);
    setTimeout(() => setSparkles([]), 1000);
  }, []);

  return (
    <div className="trainer-screen-wrapper">
      <div className="trainer-bg-layer">
        <div className="trainer-card-wrapper">
          <motion.div
            className={`trainer-card ${flipped ? 'is-flipped' : ''}`}
            onClick={handleFlip}
            initial={false}
            animate={{
              rotateY: flipped ? 180 : 0,
              scale: flipped ? [1, 1.1, 1] : [1, 1.1, 1],
              z: flipped ? 50 : 0
            }}
            transition={{
              rotateY: { type: "spring", stiffness: 260, damping: 20 },
              scale: { duration: 0.4 },
            }}
            // whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Holographic Shine Overlay */}
            <motion.div
              className="card-shine"
              initial={{ opacity: 0 }}
              animate={{
                opacity: flipped ? [0, 0.8, 0] : [0, 0.8, 0],
                backgroundPosition: flipped ? ['0% 0%', '200% 200%'] : ['200% 200%', '0% 0%']
              }}
              whileHover={{
                opacity: 0.15,
                backgroundPosition: ['0% 0%', '200% 0%'],
                transition: { repeat: Infinity, duration: 3, ease: "linear" }
              }}
              transition={{ duration: 0.6 }}
            />
            {/* FRONT FACE */}
            <div className="card-face card-front">
              <div className="tc-overlay">
                <div className="tc-header-id">
                  {trainerInfo.idNo}
                </div>

                <div className="tc-main-info">
                  {/* Row 1: NAME */}
                  <div className="tc-row" style={{ marginTop: '0.5%' }}>
                    <span className="tc-value" style={{ fontSize: 13 }}>{trainerInfo.name}</span>
                  </div>
                  {/* Row 2: MONEY (used for Role) */}
                  <div className="tc-row" style={{ marginTop: '15%' }}>
                    <span className="tc-value" style={{ fontSize: 13 }}>{trainerInfo.money}</span>
                  </div>
                  {/* Row 3: POKEDEX (Skills) */}
                  <div className="tc-row" style={{ marginTop: '7%' }}>
                    <span className="tc-value" style={{ fontSize: 13 }}>{trainerInfo.pokedex} SKILLS FOUND</span>
                  </div>
                  {/* Row 4: TIME */}
                  <div className="tc-row" style={{ marginTop: '7%' }}>
                    <span className="tc-value" style={{ fontSize: 13 }}>{trainerInfo.time}</span>
                  </div>
                </div>

                <div className="tc-badges-container">
                  {trainerInfo.badges.map((badge, i) => (
                    <div
                      key={i}
                      className="tc-badge-slot"
                      onMouseEnter={() => !flipped && setHoveredBadge(i)}
                      onMouseLeave={() => setHoveredBadge(null)}
                    >
                      {badge.earned ? (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.1 * i }}
                          style={{ fontSize: 25 }}
                        >
                          {badgeEmojis[i]}
                        </motion.span>
                      ) : null}

                      {hoveredBadge === i && !flipped && (
                        <div className="badge-tooltip" style={{ bottom: '130%', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', zIndex: 10 }}>
                          <div style={{ fontSize: 11 }}>{badge.name}</div>
                          <div style={{ fontSize: 9, opacity: 0.8 }}>{badge.desc}</div>
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
                    <span style={{ marginLeft: '62%', fontSize: 20 }}>BLOB</span>
                  </div>

                  {/* Compact bio info */}
                  <div style={{
                    marginTop: '8%',
                    marginBottom: '5%',
                    fontFamily: 'var(--font-pixel)',
                    fontSize: 7,
                    lineHeight: 1.6,
                    color: '#303030',
                    textAlign: 'center',
                    minHeight: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {trainerInfo.bio}
                  </div>

                  {/* GitHub Pixel Graph — fills remaining space */}
                  <div style={{
                    padding: '0 4% 4%',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                  }}>
                    {/* Label row */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontFamily: 'var(--font-pixel)',
                      fontSize: 10,
                      color: '#404040',
                      paddingBottom: 3,
                      borderBottom: '1px solid #c0c0c0',
                      marginBottom: 3
                    }}>
                      <span style={{ fontWeight: 'bold', letterSpacing: '0.2px' }}>GITHUB CONTRIBUTIONS</span>
                      <span style={{ opacity: 1, fontSize: 10 }}>6 MO</span>
                    </div>

                    {/* Pixel graph container - Light Retro Theme */}
                    <div style={{
                      background: '#FFFFFF',
                      border: '3px solid #383838',
                      padding: '8px 6px',
                      boxShadow: '2px 2px 0px #A0B0C0',
                      imageRendering: 'pixelated',
                      marginBottom: 2
                    }}>
                      <GithubPixelGraph
                        username={trainerInfo.links.github.split('/').pop()}
                        numWeeks={26}
                      />
                    </div>

                    {/* Legend - Themed and aligned */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      justifyContent: 'flex-end',
                      fontFamily: 'var(--font-pixel)',
                      fontSize: 6,
                      color: '#404040',
                      marginTop: 4,
                    }}>
                      <span>LESS</span>
                      {['#EAEAEA', '#A1D99B', '#74C476', '#31A354', '#006D2C'].map(c => (
                        <div key={c} style={{ width: 6, height: 6, background: c, outline: '1px solid rgba(0,0,0,0.15)', borderRadius: 0, imageRendering: 'pixelated' }} />
                      ))}
                      <span>MORE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Sparkles */}
            {sparkles.map(s => (
              <Sparkle key={s.id} x={s.x} y={s.y} delay={s.delay} />
            ))}
          </motion.div>
        </div>

        <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 7, color: 'rgba(255, 255, 255, 1)', marginTop: '12px' }}>
          ( Click card to flip )
        </div>
      </div >
    </div >
  );
}
