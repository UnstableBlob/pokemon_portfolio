'use client';

import { useState, useCallback, useEffect } from 'react';
import { playSound } from '../utils/sound';

export default function Save() {
  const [step, setStep] = useState(0); // 0=ask, 1=saving, 2=form, 3=done
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  // Auto-advance from step 1 (saving animation) to step 2 (form)
  useEffect(() => {
    if (step === 1) {
      const timer = setTimeout(() => {
        setStep(2);
        playSound('open');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleYes = useCallback(() => {
    playSound('confirm');
    setStep(1);
  }, []);

  const handleNo = useCallback(() => {
    playSound('back');
    setStep(0);
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    playSound('save');

    // Flash screen
    const flash = document.getElementById('flash-overlay');
    if (flash) {
      flash.classList.add('active');
      setTimeout(() => flash.classList.remove('active'), 150);
    }

    setTimeout(() => {
      setStep(3);
      setSubmitted(true);
    }, 300);
  }, []);

  const handleReset = useCallback(() => {
    setStep(0);
    setFormData({ name: '', email: '', message: '' });
    setSubmitted(false);
    playSound('back');
  }, []);

  return (
    <div>
      <div className="section-title">SAVE — CONTACT</div>

      <div className="save-dialog">
        {/* Step 0: Ask */}
        {step === 0 && (
          <div className="fr-box" style={{ maxWidth: 400, margin: '40px auto', textAlign: 'center' }}>
            <div style={{ marginBottom: 20, lineHeight: 2.2 }}>
              Would you like to save<br />the game?
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
              <button className="save-option active" onClick={handleYes}>▶ YES</button>
              <button className="save-option" onClick={handleNo}>NO</button>
            </div>
          </div>
        )}

        {/* Step 1: Saving animation */}
        {step === 1 && (
          <div className="fr-box" style={{ maxWidth: 400, margin: '40px auto', textAlign: 'center' }}>
            <div style={{ lineHeight: 2.2 }}>
              Saving<span className="saving-dots"></span>
            </div>
            <div style={{ marginTop: 12, fontSize: 8, color: 'var(--fr-dark-gray)' }}>
              Do not turn off the power.
            </div>
          </div>
        )}

        {/* Step 2: Contact form */}
        {step === 2 && (
          <div style={{ maxWidth: 440, margin: '20px auto' }}>
            <div className="fr-box" style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 8, color: 'var(--fr-dark-gray)', marginBottom: 8 }}>
                SAVE FILE — Enter your information
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 16 }}>
                <label className="fr-label">PLAYER NAME</label>
                <input
                  className="fr-input"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Your name..."
                  required
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label className="fr-label">SAVE LOCATION (EMAIL)</label>
                <input
                  className="fr-input"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label className="fr-label">MESSAGE DATA</label>
                <textarea
                  className="fr-textarea"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Your message..."
                  required
                />
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button type="submit" className="fr-btn">SAVE GAME</button>
                <button type="button" className="fr-btn" style={{ background: 'var(--fr-dark-gray)' }} onClick={handleReset}>CANCEL</button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="fr-box" style={{ maxWidth: 440, margin: '40px auto', textAlign: 'center' }}>
            <div style={{ fontSize: 10, marginBottom: 16, color: 'var(--fr-green)' }}>
              ✓ {formData.name} saved the game.
            </div>
            <div className="fr-box" style={{ textAlign: 'left', marginBottom: 16, fontSize: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ color: 'var(--fr-dark-gray)' }}>PLAYER:</span>
                <span>{formData.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ color: 'var(--fr-dark-gray)' }}>LOCATION:</span>
                <span>{formData.email}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--fr-dark-gray)' }}>TIME:</span>
                <span>{new Date().toLocaleString()}</span>
              </div>
            </div>
            <button className="fr-btn" onClick={handleReset}>NEW SAVE</button>
          </div>
        )}
      </div>
    </div>
  );
}
