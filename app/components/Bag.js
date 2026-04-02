'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound } from '../utils/sound';
import { toolkit } from '../utils/data';

const pockets = [
  { key: 'items', label: 'ITEMS', icon: '🟥', data: toolkit.items },
  { key: 'keyItems', label: 'KEY ITEMS', icon: '🔑', data: toolkit.keyItems },
  { key: 'pokeBalls', label: 'POKé BALLS', icon: '⚪', data: toolkit.pokeBalls },
  { key: 'tms', label: 'TMs/HMs', icon: '💿', data: toolkit.tms },
  { key: 'berries', label: 'BERRIES', icon: '🫐', data: toolkit.berries },
];

const BASE_PATH = '/pokemon_portfolio';

const getBallSprite = (itemName = '') => {
  if (itemName.startsWith('MASTER BALL')) return `${BASE_PATH}/sprites/masterball.png`;
  if (itemName.startsWith('ULTRA BALL')) return `${BASE_PATH}/sprites/ultraball.png`;
  if (itemName.startsWith('GREAT BALL')) return `${BASE_PATH}/sprites/greatball.png`;
  if (itemName.startsWith('NET BALL')) return `${BASE_PATH}/sprites/netball.png`;
  if (itemName.startsWith('TIMER BALL')) return `${BASE_PATH}/sprites/timerball.png`;
  return `${BASE_PATH}/sprites/pokeball.png`;
};

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
      <motion.div 
        style={{ minHeight: 200 }}
        key={activePocket}
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
        {pocket.data.map((item, i) => (
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 20 },
              visible: { opacity: 1, x: 0 }
            }}
            whileHover={{ scale: 1.01, backgroundColor: 'rgba(0,0,0,0.06)' }}
            whileTap={{ scale: 0.98 }}
            key={i}
            className={`bag-item ${activePocket === 'pokeBalls' ? 'learning-item' : ''}`}
            onClick={() => handleItemClick(item)}
            onMouseEnter={() => setHoveredItem(item)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {activePocket === 'pokeBalls' ? (
              <img
                src={getBallSprite(item.name)}
                alt={item.name}
                className="bag-item-ball-sprite"
                loading="lazy"
              />
            ) : (
              <span className="bag-item-icon">{pocket.icon}</span>
            )}
            <span className="bag-item-name">{item.name}</span>
            <span className="bag-item-qty">{item.qty}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Description panel */}
      <div className="bag-desc-panel">
        {(hoveredItem || selectedItem)
          ? (hoveredItem || selectedItem).desc
          : 'Select an item to see its description.'
        }
      </div>

      {/* Item popup */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
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
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
