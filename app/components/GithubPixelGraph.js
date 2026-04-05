'use client';

import { useState, useEffect } from 'react';

// GBA-style green palette: 0 contributions -> darkest, 4+ -> brightest
// Retro light-theme green palette
const GBA_PALETTE = [
  '#EAEAEA', // 0 - empty
  '#A1D99B', // 1 - soft green
  '#74C476', // 2 - mid green
  '#31A354', // 3 - strong green
  '#006D2C', // 4+ - forest green
];

function getColor(count) {
  if (count === 0) return GBA_PALETTE[0];
  if (count <= 3) return GBA_PALETTE[1];
  if (count <= 6) return GBA_PALETTE[2];
  if (count <= 9) return GBA_PALETTE[3];
  return GBA_PALETTE[4];
}

// Build last N weeks worth of days as a 2D array [week][day 0=Sun..6=Sat]
function buildWeeksFromContributions(contributionDays, numWeeks) {
  // contributionDays is an array of { date: 'YYYY-MM-DD', count: number }
  // We want the last numWeeks*7 days, padded to align to week boundaries
  const today = new Date();
  // Go back numWeeks weeks from the start of this week (Sunday)
  const startDay = new Date(today);
  startDay.setDate(today.getDate() - today.getDay() - (numWeeks - 1) * 7);
  startDay.setHours(0, 0, 0, 0);

  // Build a lookup map
  const lookup = {};
  for (const d of contributionDays) {
    lookup[d.date] = d.count;
  }

  const weeks = [];
  let cursor = new Date(startDay);

  for (let w = 0; w < numWeeks; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const dateStr = cursor.toISOString().slice(0, 10);
      week.push({ date: dateStr, count: lookup[dateStr] || 0 });
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
  }

  return weeks;
}

export default function GithubPixelGraph({ username, numWeeks = 26 }) {
  const [weeks, setWeeks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);

    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then(r => r.json())
      .then(data => {
        if (cancelled) return;
        const days = data.contributions || [];
        setWeeks(buildWeeksFromContributions(days, numWeeks));
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        // On error: render a placeholder grid of zeros
        setWeeks(buildWeeksFromContributions([], numWeeks));
        setError(true);
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [username, numWeeks]);

  if (loading) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${numWeeks}, 1fr)`,
        gap: 1,
        width: '100%',
        opacity: 0.3,
      }}>
        {Array.from({ length: numWeeks * 7 }).map((_, i) => (
          <div key={i} style={{
            aspectRatio: '1',
            background: GBA_PALETTE[0],
            imageRendering: 'pixelated',
          }} />
        ))}
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        // 7 rows (days), numWeeks columns — use column-major order
        gridTemplateColumns: `repeat(${numWeeks}, 1fr)`,
        gridTemplateRows: 'repeat(7, 1fr)',
        gridAutoFlow: 'column',
        gap: 1,
        width: '100%',
        imageRendering: 'pixelated',
      }}
    >
      {weeks.map((week, wi) =>
        week.map((day, di) => (
          <div
            key={`${wi}-${di}`}
            title={`${day.date}: ${day.count}`}
            style={{
              aspectRatio: '1',
              background: getColor(day.count),
              imageRendering: 'pixelated',
              // Pixel-art effect: sharp, no rounding
              borderRadius: 0,
              outline: '1px solid rgba(0,0,0,0.25)',
              outlineOffset: '-1px',
            }}
          />
        ))
      )}
    </div>
  );
}
