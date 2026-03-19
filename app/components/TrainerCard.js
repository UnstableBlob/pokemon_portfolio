'use client';

import { useState, useCallback } from 'react';
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
    <div>
      <div className="section-title">{trainerInfo.name} — TRAINER CARD</div>
      <div style={{ padding: 20, textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 8, color: 'var(--fr-dark-gray)', marginBottom: 12 }}>
          Click to flip the card
        </div>

        <div className="trainer-card-wrapper">
          <div className={`trainer-card ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
            {/* FRONT */}
            <div className="card-face card-front">
              <div style={{ padding: 14 }}>
                {/* Header */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  marginBottom: 12, borderBottom: '2px solid var(--fr-box-border)', paddingBottom: 8
                }}>
                  <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 10, color: 'var(--fr-box-border)' }}>
                    TRAINER CARD
                  </span>
                  <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 8, color: 'var(--fr-dark-gray)' }}>
                    ID No.{trainerInfo.idNo}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: 16 }}>
                  {/* Left info */}
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 9, lineHeight: 2.8 }}>
                      <div style={{ display: 'flex' }}>
                        <span style={{ color: 'var(--fr-dark-gray)', minWidth: 80 }}>NAME:</span>
                        <span>{trainerInfo.name}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ color: 'var(--fr-dark-gray)', minWidth: 80 }}></span>
                        <span style={{ color: 'var(--fr-yellow)', fontSize: 12 }}>★★★</span>
                      </div>
                      <div style={{ display: 'flex' }}>
                        <span style={{ color: 'var(--fr-dark-gray)', minWidth: 80 }}>MONEY:</span>
                        <span style={{ fontSize: 8 }}>{trainerInfo.money}</span>
                      </div>
                      <div style={{ display: 'flex' }}>
                        <span style={{ color: 'var(--fr-dark-gray)', minWidth: 80 }}>POKéDEX:</span>
                        <span>{trainerInfo.pokedex}</span>
                      </div>
                      <div style={{ display: 'flex' }}>
                        <span style={{ color: 'var(--fr-dark-gray)', minWidth: 80 }}>TIME:</span>
                        <span>{trainerInfo.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right trainer sprite */}
                  <div style={{
                    width: 64, height: 80,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 48,
                  }}>
                    🧑‍💻
                  </div>
                </div>

                {/* Badges */}
                <div style={{
                  borderTop: '2px solid var(--fr-box-border)',
                  paddingTop: 8,
                  marginTop: 4,
                }}>
                  <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 7, color: 'var(--fr-dark-gray)', marginBottom: 6 }}>
                    BADGES
                  </div>
                  <div className="badge-case">
                    {trainerInfo.badges.map((badge, i) => (
                      <div
                        key={i}
                        className={`badge-item ${!badge.earned ? 'unearned' : ''}`}
                        onMouseEnter={() => setHoveredBadge(i)}
                        onMouseLeave={() => setHoveredBadge(null)}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {badgeEmojis[i]}
                        {hoveredBadge === i && (
                          <div className="badge-tooltip">
                            <div>{badge.name}</div>
                            <div style={{ color: 'var(--fr-dark-gray)' }}>{badge.desc}</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* BACK */}
            <div className="card-face card-back">
              <div style={{ padding: 20, textAlign: 'left', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 10, marginBottom: 16, color: 'var(--fr-box-border)' }}>
                  ABOUT {trainerInfo.name}
                </div>
                <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 8, lineHeight: 2.2, color: 'var(--fr-dark-gray)', marginBottom: 20 }}>
                  {trainerInfo.bio}
                </div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <a
                    href={trainerInfo.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fr-btn"
                    style={{ textDecoration: 'none', fontSize: 8 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    GITHUB
                  </a>
                  <a
                    href={trainerInfo.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fr-btn"
                    style={{ textDecoration: 'none', fontSize: 8 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    LINKEDIN
                  </a>
                  <a
                    href={`mailto:${trainerInfo.links.email}`}
                    className="fr-btn"
                    style={{ textDecoration: 'none', fontSize: 8 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    EMAIL
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
