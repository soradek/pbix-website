'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconPhone, IconMail } from '@/components/Icons';

const PHONE = '+48 123 456 789';
const EMAIL = 'kontakt@pbix.pl';

export default function FloatingCTA() {
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 600);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '24px',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '10px',
      }}
    >
      {/* Mini menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            style={{
              background: '#ffffff',
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: '18px',
              padding: '8px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              minWidth: '180px',
            }}
            role="menu"
            aria-label="Szybki kontakt"
          >
            <a
              href={`tel:${PHONE.replace(/\s/g, '')}`}
              role="menuitem"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                borderRadius: '12px',
                textDecoration: 'none',
                color: '#1d1d1f',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(30,153,83,0.06)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              onClick={() => setOpen(false)}
            >
              <span style={{ color: '#1e9953' }}><IconPhone size={18} color="#1e9953" /></span>
              Zadzwoń
            </a>
            <a
              href={`mailto:${EMAIL}`}
              role="menuitem"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                borderRadius: '12px',
                textDecoration: 'none',
                color: '#1d1d1f',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(30,153,83,0.06)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              onClick={() => setOpen(false)}
            >
              <span style={{ color: '#1e9953' }}><IconMail size={18} color="#1e9953" /></span>
              Napisz email
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Szybki kontakt"
        aria-expanded={open}
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: '#1e9953',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 18px rgba(30,153,83,0.40)',
          transition: 'transform 0.2s, background 0.2s',
          outline: 'none',
          position: 'relative',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = '#17803f')}
        onMouseLeave={(e) => (e.currentTarget.style.background = '#1e9953')}
      >
        {/* Pulse ring */}
        {pulse && !open && (
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: '-6px',
              borderRadius: '50%',
              border: '2px solid rgba(30,153,83,0.4)',
              animation: 'floatingPulse 0.6s ease-out forwards',
            }}
          />
        )}
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}>
          <IconPhone size={22} color="#ffffff" />
        </motion.span>
      </button>
    </div>
  );
}
