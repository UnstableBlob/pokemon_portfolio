'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PixelTransition.css';

export default function PixelTransition({
  children,
  activeSection,
  gridSize = 7,
  pixelColor = '#1a1a2e',
  animationStepDuration = 0.3
}) {
  const [displayContent, setDisplayContent] = useState(children);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pixels, setPixels] = useState([]);
  const contentRef = useRef(children);

  // Re-generate pixels if dependencies change
  useEffect(() => {
    const newPixels = [];
    const middleRow = (gridSize - 1) / 2;
    const maxStages = Math.floor(gridSize / 2);
    // Dedicate 70% of duration to the row progression, 30% to randomness within that row
    const stageDuration = (animationStepDuration * 0.7) / (maxStages || 1);
    const randomVariance = animationStepDuration * 0.3;

    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        // Enter: edges first (0 delay), middle last (max delay)
        const distFromEdge = Math.min(r, gridSize - 1 - r);
        const enterDelay = (distFromEdge * stageDuration) + (Math.random() * randomVariance);

        // Exit: middle first (0 delay), edges last (max delay)
        const distFromMiddle = Math.abs(r - middleRow);
        const exitDelay = (distFromMiddle * stageDuration) + (Math.random() * randomVariance);

        newPixels.push({
          id: `${r}-${c}`,
          r,
          c,
          enterDelay,
          exitDelay
        });
      }
    }
    setPixels(newPixels);
  }, [gridSize, animationStepDuration]);

  // Keep ref up to date with the newest children to safely swap it during transition
  useEffect(() => {
    contentRef.current = children;
  }, [children]);

  const isFirstRender = useRef(true);

  useEffect(() => {
    // Prevent transition on initial mount
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Start the transition sequence
    setIsTransitioning(true);

    // Calculate the mid-point of the animation where the screen is fully covered by pixels
    // We add a small 50ms buffer to ensure visually complete coverage
    const midPoint = (animationStepDuration * 1000) + 50;

    const timeout = setTimeout(() => {
      // Swap the content while the screen is covered
      setDisplayContent(contentRef.current);

      // Setting to false triggers AnimatePresence exit animations (pixels staggering out)
      setIsTransitioning(false);
    }, midPoint);

    return () => clearTimeout(timeout);
  }, [activeSection, animationStepDuration]);

  return (
    <div className="pixel-transition-wrapper">
      <div className="pixel-transition-content">
        {displayContent}
      </div>

      <div className="pixel-transition-overlay" style={{ pointerEvents: isTransitioning ? 'auto' : 'none' }}>
        <AnimatePresence>
          {isTransitioning && pixels.map((px) => (
            <motion.div
              key={px.id}
              className="pixel-transition-pixel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0, delay: px.enterDelay } }}
              exit={{ opacity: 0, transition: { duration: 0, delay: px.exitDelay } }}
              style={{
                backgroundColor: pixelColor,
                // Add +1px to hide subpixel gaps in the grid rendering
                width: `calc(100% / ${gridSize} + 1px)`,
                height: `calc(100% / ${gridSize} + 1px)`,
                left: `${px.c * (100 / gridSize)}%`,
                top: `${px.r * (100 / gridSize)}%`
              }}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
