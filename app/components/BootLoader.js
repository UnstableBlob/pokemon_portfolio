'use client';

import React, { useState, useEffect } from 'react';
import './Loader.css';

const BootLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  // Your custom MERN stack loading sequence
  const loadingPhrases = [
    "Initializing Kanto OS...",
    "Restoring HP at Pokémon Center...",
    "Deploying Max Repel on Bugs...",
    "Entering Hall of Fame..."
  ];

  useEffect(() => {
    // 1. Handle the Progress Bar Filling
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Adjust the '2' to make it load faster or slower
        return prev + 2;
      });
    }, 50);

    // 2. Handle the Text Cycling based on progress percentage
    const textInterval = setInterval(() => {
      setProgress((currentProgress) => {
        const phaseLength = 100 / loadingPhrases.length;
        const currentPhase = Math.floor(currentProgress / phaseLength);
        if (currentPhase < loadingPhrases.length) {
          setTextIndex(currentPhase);
        }
        return currentProgress; // Don't actually change progress here
      })
    }, 100);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [loadingPhrases.length]);

  // 3. Handle the "Snap Shut" when complete
  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setIsClosing(true);
        // Wait for the snap shut animation to finish before unmounting
        setTimeout(() => {
          onComplete();
        }, 300);
      }, 500); // Pause for half a second at 100% so the user sees it
    }
  }, [progress, onComplete]);

  // Determine the color based on your reverse-damage logic
  const getBarColor = () => {
    if (progress < 40) return '#F08030'; // HP Green
    if (progress < 80) return '#F8D030'; // HP Yellow
    return '#78C850'; // HP Red/Orange
  };

  return (
    <div className={`loader-overlay ${isClosing ? 'fade-out' : ''}`}>
      <div className={`dialogue-box ${isClosing ? 'snap-shut' : ''}`}>

        <div className="dialogue-text">
          <span className="blinking-arrow">▶</span>
          {loadingPhrases[textIndex]}
        </div>

        <div className="hp-container">
          <span className="hp-label">HP</span>
          <div className="hp-bar-track-loader">
            <div
              className="hp-bar-fill-loader"
              style={{
                width: `${progress}%`,
                backgroundColor: getBarColor()
              }}
            ></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BootLoader;
