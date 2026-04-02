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

  const handlePrevPocket = () => {
    playSound('cursor');
    const currentIndex = pockets.findIndex(p => p.key === activePocket);
    const prevIndex = (currentIndex - 1 + pockets.length) % pockets.length;
    setActivePocket(pockets[prevIndex].key);
    setSelectedItem(null);
    setHoveredItem(null);
  };

  const handleNextPocket = () => {
    playSound('cursor');
    const currentIndex = pockets.findIndex(p => p.key === activePocket);
    const nextIndex = (currentIndex + 1) % pockets.length;
    setActivePocket(pockets[nextIndex].key);
    setSelectedItem(null);
    setHoveredItem(null);
  };

  return (
    <div className="bag-screen-container">
      <div className="bag-background">

        {/* Pocket Title */}
        <div className="bag-pocket-title">
          {pocket.label}
        </div>

        {/* Navigation Arrows */}
        <button className="bag-nav-arrow bag-arrow-left" onClick={handlePrevPocket}>
          <img src={`${BASE_PATH}/sprites/left.png`} alt="Prev pocket" />
        </button>
        <button className="bag-nav-arrow bag-arrow-right" onClick={handleNextPocket}>
          <img src={`${BASE_PATH}/sprites/right.png`} alt="Next pocket" />
        </button>

        {/* Item List */}
        <div className="bag-items-list-container">
          <ul className="bag-items-list">
            {pocket.data.map((item, i) => {
              const isSelected = selectedItem === item;
              const isHovered = hoveredItem === item;
              const showCursor = isSelected || (isHovered && !selectedItem);

              const isPokeBallPocket = activePocket === 'pokeBalls';
              const displayName = isPokeBallPocket
                ? item.name.split(' - ')[1] || item.name
                : item.name;

              return (
                <li
                  key={i}
                  className="bag-list-item"
                  onClick={() => handleItemClick(item)}
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <span className="bag-list-cursor" style={{ visibility: showCursor ? 'visible' : 'hidden' }}>▶</span>
                  {isPokeBallPocket && (
                    <img
                      src={getBallSprite(item.name)}
                      alt="ball"
                      className="bag-list-item-sprite"
                    />
                  )}
                  <span className="bag-list-name">{displayName}</span>
                  <span className="bag-list-qty">
                    <span className="times">x</span>
                    {item.qty.toString().padStart(2, ' ')}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Bottom Description Area */}
        <div className="bag-description-area">
          <div className="bag-desc-icon">
            {activePocket === 'pokeBalls' && (hoveredItem || selectedItem) && (
              <img
                src={getBallSprite((hoveredItem || selectedItem).name)}
                alt="ball"
                className="bag-item-ball-sprite"
                loading="lazy"
              />
            )}
            {activePocket !== 'pokeBalls' && (hoveredItem || selectedItem) && (
              <span className="bag-item-icon">{pocket.icon}</span>
            )}
          </div>
          <div className="bag-desc-text">
            {(hoveredItem || selectedItem)
              ? (hoveredItem || selectedItem).desc
              : 'Select an item to see its description. Use the arrows to navigate.'
            }
          </div>
        </div>
      </div>
    </div>
  );
}
