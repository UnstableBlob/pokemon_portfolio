'use client';

import { useState, useCallback } from 'react';
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
            <div className="pokedex-sprite">
              {selected.sprite}
            </div>
            <div className="pokedex-info">
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
            </div>
          </div>

          <div className="pokedex-flavor">
            {selected.flavor}
          </div>

          <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 9, marginBottom: 8, color: 'var(--fr-dark-gray)' }}>
            BASE STATS
          </div>
          <div className="stats-grid">
            {Object.entries(selected.stats).map(([key, val]) => {
              const labels = { hp: 'HP', atk: 'ATK', def: 'DEF', spAtk: 'SP.ATK', spDef: 'SP.DEF', speed: 'SPEED' };
              return (
                <div className="stat-row" key={key}>
                  <span className="stat-label">{labels[key]}</span>
                  <span className="stat-value">{val}</span>
                  <div className="stat-bar-track">
                    <div
                      className="stat-bar-fill"
                      style={{ width: `${val}%`, background: getStatColor(val) }}
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
      <ul className="pokedex-list">
        {skills.map((skill) => (
          <li
            key={skill.id}
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
          </li>
        ))}
      </ul>
    </div>
  );
}
