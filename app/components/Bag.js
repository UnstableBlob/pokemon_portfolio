'use client';

import { useState, useCallback } from 'react';
import { playSound } from '../utils/sound';
import { toolkit } from '../utils/data';

const pockets = [
  { key: 'items', label: 'ITEMS', icon: '🟥', data: toolkit.items },
  { key: 'keyItems', label: 'KEY ITEMS', icon: '🔑', data: toolkit.keyItems },
  { key: 'pokeBalls', label: 'POKé BALLS', icon: '⚪', data: toolkit.pokeBalls },
  { key: 'tms', label: 'TMs/HMs', icon: '💿', data: toolkit.tms },
  { key: 'berries', label: 'BERRIES', icon: '🫐', data: toolkit.berries },
];

export default function Bag() {
  const [activePocket, setActivePocket] = useState('items');
  const [selectedItem, setSelectedItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const pocket = pockets.find(p => p.key === activePocket);

  const handlePocketChange = useCallback((key) => {
    playSound('cursor');
    setActivePocket(key);
    setSelectedItem(null);
    setHoveredItem(null);
  }, []);

  const handleItemClick = useCallback((item) => {
    playSound('confirm');
    setSelectedItem(item);
  }, []);

  return (
    <div>
      <div className="section-title">BAG — TOOLKIT</div>

      {/* Pocket tabs */}
      <div className="bag-pockets">
        {pockets.map((p) => (
          <button
            key={p.key}
            className={`bag-pocket-tab ${activePocket === p.key ? 'active' : ''}`}
            onClick={() => handlePocketChange(p.key)}
          >
            {p.icon} {p.label}
          </button>
        ))}
      </div>

      {/* Item list */}
      <div style={{ minHeight: 200 }}>
        {pocket.data.map((item, i) => (
          <div
            key={i}
            className={`bag-item ${activePocket === 'pokeBalls' ? 'learning-item' : ''}`}
            onClick={() => handleItemClick(item)}
            onMouseEnter={() => setHoveredItem(item)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <span className="bag-item-icon">{pocket.icon}</span>
            <span className="bag-item-name">{item.name}</span>
            <span className="bag-item-qty">{item.qty}</span>
          </div>
        ))}
      </div>

      {/* Description panel */}
      <div className="bag-desc-panel">
        {(hoveredItem || selectedItem)
          ? (hoveredItem || selectedItem).desc
          : 'Select an item to see its description.'
        }
      </div>

      {/* Item popup */}
      {selectedItem && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
        }}
          onClick={() => { setSelectedItem(null); playSound('back'); }}
        >
          <div
            className="fr-box fr-box-float"
            style={{ minWidth: 260, maxWidth: 350 }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 11, marginBottom: 12 }}>
              {selectedItem.name}
            </div>
            <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 8, lineHeight: 2.2, color: 'var(--fr-dark-gray)', marginBottom: 16 }}>
              {selectedItem.desc}
            </div>
            <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 8, color: 'var(--fr-dark-gray)', marginBottom: 16 }}>
              QTY: {selectedItem.qty}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="fr-btn" onClick={() => { setSelectedItem(null); playSound('back'); }}>CANCEL</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
