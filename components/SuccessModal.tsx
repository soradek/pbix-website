'use client';

import { useEffect } from 'react';

interface SuccessModalProps {
  onClose: () => void;
  lang?: 'pl' | 'en';
}

export default function SuccessModal({ onClose, lang = 'pl' }: SuccessModalProps) {
  const isEn = lang === 'en';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          padding: '48px 40px 40px',
          textAlign: 'center',
          maxWidth: '460px',
          width: '100%',
          boxShadow: '0 24px 64px rgba(0,0,0,0.18)',
          position: 'relative',
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '16px', right: '16px',
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#6e6e73', fontSize: '20px', lineHeight: 1,
            padding: '4px 8px', borderRadius: '8px',
            fontFamily: 'inherit',
          }}
          aria-label={isEn ? 'Close' : 'Zamknij'}
        >
          ✕
        </button>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
            <circle cx="36" cy="36" r="34" stroke="#1e9953" strokeWidth="2.5"
              style={{
                strokeDasharray: 214,
                strokeDashoffset: 214,
                animation: 'circleIn 0.5s ease forwards',
              }}
            />
            <polyline points="20,38 31,49 52,25" stroke="#1e9953" strokeWidth="3.5"
              strokeLinecap="round" strokeLinejoin="round"
              style={{
                strokeDasharray: 50,
                strokeDashoffset: 50,
                animation: 'checkIn 0.4s ease 0.4s forwards',
              }}
            />
          </svg>
        </div>

        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#1d1d1f', margin: '0 0 12px', letterSpacing: '-0.3px' }}>
          {isEn ? 'Your message has been sent.' : 'Twoja wiadomość została wysłana.'}
        </h2>
        <p style={{ color: '#6e6e73', fontSize: '16px', lineHeight: 1.7, margin: '0 0 28px' }}>
          {isEn
            ? "I'll get back to you as soon as I can. Talk soon!"
            : 'Odpowiem na nią najszybciej jak tylko będę mógł. Do usłyszenia!'}
        </p>

        <button
          onClick={onClose}
          style={{
            background: '#1e9953', color: 'white', border: 'none',
            padding: '13px 36px', borderRadius: '980px',
            fontSize: '15px', fontWeight: 600, cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
}
