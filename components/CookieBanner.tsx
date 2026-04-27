'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { getStoredConsent, setConsent } from '@/lib/consent';

type View = 'hidden' | 'banner' | 'settings';

export default function CookieBanner() {
  const [view, setView] = useState<View>('hidden');
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existing = getStoredConsent();
    if (!existing) {
      const t = setTimeout(() => setView('banner'), 600);
      return () => clearTimeout(t);
    }
    setAnalytics(existing.analytics);
    setMarketing(existing.marketing);
  }, []);

  useEffect(() => {
    const handler = () => {
      const current = getStoredConsent();
      if (!current) {
        setView('banner');
        setAnalytics(false);
        setMarketing(false);
      } else {
        setAnalytics(current.analytics);
        setMarketing(current.marketing);
      }
    };
    window.addEventListener('pbix:consent-changed', handler);
    return () => window.removeEventListener('pbix:consent-changed', handler);
  }, []);

  function acceptAll() {
    setConsent({ analytics: true, marketing: true });
    setView('hidden');
  }

  function rejectAll() {
    setConsent({ analytics: false, marketing: false });
    setView('hidden');
  }

  function saveCustom() {
    setConsent({ analytics, marketing });
    setView('hidden');
  }

  return (
    <AnimatePresence>
      {view === 'banner' && (
        <motion.div
          key="banner"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          role="dialog"
          aria-label="Zgoda na pliki cookies"
          aria-live="polite"
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            right: '20px',
            zIndex: 250,
            maxWidth: '560px',
            margin: '0 auto',
            background: '#ffffff',
            border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: '20px',
            boxShadow: '0 24px 64px rgba(0,0,0,0.18)',
            padding: '24px',
          }}
        >
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#1d1d1f', margin: '0 0 8px', letterSpacing: '-0.3px' }}>
            Pliki cookies
          </h2>
          <p style={{ fontSize: '13px', color: '#6e6e73', lineHeight: 1.6, margin: '0 0 18px' }}>
            Używamy plików cookies, aby zapewnić działanie strony oraz – za Twoją zgodą – mierzyć ruch i wyświetlać dopasowane treści.
            Szczegóły w <Link href="/polityka-prywatnosci" style={{ color: '#1e9953', textDecoration: 'underline' }}>polityce prywatności</Link>.
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={acceptAll}
              style={btn('primary')}
            >
              Akceptuj wszystkie
            </button>
            <button
              onClick={rejectAll}
              style={btn('secondary')}
            >
              Tylko niezbędne
            </button>
            <button
              onClick={() => setView('settings')}
              style={btn('ghost')}
            >
              Ustawienia
            </button>
          </div>
        </motion.div>
      )}

      {view === 'settings' && (
        <motion.div
          key="settings-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setView('banner')}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            zIndex: 260,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Ustawienia cookies"
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              maxWidth: '520px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '32px',
              boxShadow: '0 24px 64px rgba(0,0,0,0.20)',
            }}
          >
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1d1d1f', margin: '0 0 8px', letterSpacing: '-0.4px' }}>
              Ustawienia plików cookies
            </h2>
            <p style={{ fontSize: '13px', color: '#6e6e73', lineHeight: 1.6, margin: '0 0 24px' }}>
              Wybierz, na które kategorie cookies wyrażasz zgodę. Możesz w każdej chwili zmienić ustawienia w stopce.
            </p>

            <ConsentRow
              title="Niezbędne"
              description="Wymagane do działania strony (np. utrzymanie sesji, zabezpieczenie formularzy). Nie można ich wyłączyć."
              checked
              disabled
            />
            <ConsentRow
              title="Analityczne"
              description="Pomagają mierzyć ruch i ulepszać stronę (Google Tag Manager, statystyki anonimowe)."
              checked={analytics}
              onChange={setAnalytics}
            />
            <ConsentRow
              title="Marketingowe"
              description="Pixele Meta i LinkedIn — pozwalają wyświetlać dopasowane reklamy poza stroną."
              checked={marketing}
              onChange={setMarketing}
            />

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '24px' }}>
              <button onClick={saveCustom} style={btn('primary')}>Zapisz wybór</button>
              <button onClick={acceptAll} style={btn('secondary')}>Akceptuj wszystkie</button>
              <button onClick={rejectAll} style={btn('ghost')}>Odrzuć wszystkie</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function btn(kind: 'primary' | 'secondary' | 'ghost'): React.CSSProperties {
  const base: React.CSSProperties = {
    border: 'none',
    padding: '11px 18px',
    borderRadius: '980px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'background 0.2s, color 0.2s',
  };
  if (kind === 'primary') return { ...base, background: '#1e9953', color: '#ffffff' };
  if (kind === 'secondary') return { ...base, background: 'rgba(0,0,0,0.06)', color: '#1d1d1f' };
  return { ...base, background: 'transparent', color: '#6e6e73' };
}

interface RowProps {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (next: boolean) => void;
}

function ConsentRow({ title, description, checked, disabled, onChange }: RowProps) {
  return (
    <div style={{ display: 'flex', gap: '14px', padding: '14px 0', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1f', marginBottom: '4px' }}>{title}</div>
        <div style={{ fontSize: '12px', color: '#6e6e73', lineHeight: 1.55 }}>{description}</div>
      </div>
      <label style={{ display: 'inline-flex', alignItems: 'center', cursor: disabled ? 'not-allowed' : 'pointer', flexShrink: 0 }}>
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          aria-label={title}
          style={{
            width: '20px',
            height: '20px',
            accentColor: '#1e9953',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.5 : 1,
          }}
        />
      </label>
    </div>
  );
}
