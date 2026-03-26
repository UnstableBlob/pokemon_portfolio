'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { playSound } from '../utils/sound';
import { trainerInfo } from '../utils/data';

const socials = [
  {
    key: 'github',
    label: 'GITHUB',
    icon: '🐙',
    desc: 'Source code & projects',
    href: trainerInfo.links.github,
    color: 'var(--fr-box-border)',
  },
  {
    key: 'linkedin',
    label: 'LINKEDIN',
    icon: '💼',
    desc: 'Professional profile',
    href: trainerInfo.links.linkedin,
    color: '#0a66c2',
  },
  {
    key: 'email',
    label: 'EMAIL',
    icon: '✉️',
    desc: trainerInfo.links.email,
    href: `mailto:${trainerInfo.links.email}`,
    color: 'var(--fr-red)',
  },
];

export default function Save() {
  const handleClick = useCallback(() => {
    playSound('confirm');
  }, []);

  return (
    <div>
      <div className="section-title">SAVE — CONTACT</div>

      <div className="save-dialog">
        {/* Intro box */}
        <motion.div
          className="fr-box"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{ maxWidth: 440, margin: '24px auto 20px', textAlign: 'center' }}
        >
          <div style={{ lineHeight: 2.4, marginBottom: 6 }}>
            Would you like to save<br />the game?
          </div>
          <div style={{ fontSize: 7, color: 'var(--fr-dark-gray)' }}>
            Choose a save slot below.
          </div>
        </motion.div>

        {/* Social buttons */}
        <div style={{ maxWidth: 440, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {socials.map((social, i) => (
            <motion.a
              key={social.key}
              href={social.href}
              target={social.key !== 'email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="fr-box"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 + 0.2, type: 'spring', stiffness: 300, damping: 22 }}
              whileHover={{ scale: 1.02, x: 6 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleClick(social.key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer',
                padding: '10px 14px',
              }}
            >
              <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 9, color: 'var(--fr-red)', minWidth: 12 }}>▶</span>
              <span style={{ fontSize: 22 }}>{social.icon}</span>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 10, marginBottom: 4, color: social.color }}>
                  {social.label}
                </div>
                <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 7, color: 'var(--fr-dark-gray)' }}>
                  {social.desc}
                </div>
              </div>
              <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 9, color: 'var(--fr-dark-gray)' }}>›</span>
            </motion.a>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: 7,
            color: 'var(--fr-dark-gray)',
            textAlign: 'center',
            marginTop: 24,
            lineHeight: 2.2,
          }}
        >
          Do not turn off the power.
        </motion.div>
      </div>
    </div>
  );
}
