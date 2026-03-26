'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound } from './utils/sound';
import Pokedex from './components/Pokedex';
import Pokemon from './components/Pokemon';
import Bag from './components/Bag';
import TrainerCard from './components/TrainerCard';
import Save from './components/Save';
import Options from './components/Options';

const menuItems = [
  { key: 'pokedex', label: 'POKéDEX', icon: '📖' },
  { key: 'pokemon', label: 'POKéMON', icon: '🔴' },
  { key: 'bag', label: 'BAG', icon: '🎒' },
  { key: 'trainer', label: 'ATHAR', icon: '🪪' },
  { key: 'save', label: 'SAVE', icon: '💾' },
  { key: 'option', label: 'OPTION', icon: '⚙️' },
  { key: 'exit', label: 'EXIT', icon: '🚪' },
];

export default function Home() {
  const [activeMenu, setActiveMenu] = useState(0);
  const [activeSection, setActiveSection] = useState(null);
  const [mobileView, setMobileView] = useState('menu'); // 'menu' or 'content'
  const contentRef = useRef(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        playSound('cursor');
        setActiveMenu(prev => (prev + 1) % menuItems.length);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        playSound('cursor');
        setActiveMenu(prev => (prev - 1 + menuItems.length) % menuItems.length);
      }
      if (e.key === 'Enter' || e.key === 'z') {
        e.preventDefault();
        handleMenuSelect(menuItems[activeMenu].key);
      }
      if (e.key === 'Escape' || e.key === 'Backspace') {
        e.preventDefault();
        if (activeSection) {
          handleBack();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeMenu, activeSection]);

  // Load saved settings on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('fr-settings');
      if (saved) {
        const s = JSON.parse(saved);
        if (typeof s.frame === 'number') {
          const frames = [
            { accent: '#e83030', border: '#383830' },
            { accent: '#f8d030', border: '#605020' },
            { accent: '#30c060', border: '#205030' },
            { accent: '#3050d0', border: '#202850' },
            { accent: '#7038f8', border: '#382060' },
          ];
          const f = frames[s.frame];
          if (f) {
            document.documentElement.style.setProperty('--frame-accent', f.accent);
            document.documentElement.style.setProperty('--frame-border', f.border);
          }
        }
      }
    } catch { }
  }, []);

  const handleMenuSelect = useCallback((key) => {
    if (key === 'exit') {
      playSound('back');
      setActiveSection(null);
      setMobileView('menu');
      return;
    }

    playSound('confirm');
    setActiveSection(key);
    setMobileView('content');
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, []);

  const handleBack = useCallback(() => {
    playSound('back');
    setActiveSection(null);
    setMobileView('menu');
  }, []);

  const handleMenuHover = useCallback((idx) => {
    setActiveMenu(idx);
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case 'pokedex': return <Pokedex />;
      case 'pokemon': return <Pokemon />;
      case 'bag': return <Bag />;
      case 'trainer': return <TrainerCard />;
      case 'save': return <Save />;
      case 'option': return <Options />;
      default: return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          fontFamily: 'var(--font-pixel)',
          fontSize: 9,
          color: 'var(--fr-dark-gray)',
          lineHeight: 2.5,
          textAlign: 'center',
          padding: 40,
        }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>🎮</div>
          <div>Select an option from<br />the menu to begin.</div>
          <div style={{ fontSize: 7, marginTop: 20, color: 'var(--fr-gray)' }}>
            Use ↑↓ arrows + Enter<br />
            or click a menu item
          </div>
        </div>
      );
    }
  };

  return (
    <div className="gba-wrapper">
      <div className="gba-screen">
        <div className={`portfolio-shell ${mobileView === 'menu' ? 'menu-open' : 'content-open'}`}>
          {/* World backdrop */}
          <div className="world-backdrop scanlines" />

          {/* Menu panel */}
          <div className="menu-panel">
            <motion.div
              className="menu-box fr-box fr-box-float"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {menuItems.map((item, idx) => (
                <motion.div
                  key={item.key}
                  className={`menu-item ${activeMenu === idx ? 'active' : ''}`}
                  onClick={() => {
                    setActiveMenu(idx);
                    handleMenuSelect(item.key);
                  }}
                  onMouseEnter={() => handleMenuHover(idx)}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="menu-cursor">▶</span>
                  <span>{item.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: 7,
                color: 'rgba(255,255,255,0.7)',
                textAlign: 'center',
                marginTop: 20,
                lineHeight: 2,
              }}
            >
              ↑↓ NAVIGATE &nbsp; ENTER SELECT<br />
              ESC BACK
            </motion.div>
          </div>

          {/* Content panel */}
          <div className="content-panel" ref={contentRef}>
            {/* Mobile back button */}
            {activeSection && mobileView === 'content' && (
              <button
                className="back-btn"
                onClick={handleBack}
                style={{
                  position: 'sticky',
                  top: 0,
                  background: 'var(--fr-cream)',
                  zIndex: 10,
                  borderBottom: '2px solid var(--fr-box-border)',
                  width: '100%',
                  display: 'none',
                }}
              >
                ◀ MENU
              </button>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection || 'empty'}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                style={{ height: '100%' }}
              >
                {renderSection()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
