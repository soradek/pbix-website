'use client';

import { clearConsent } from '@/lib/consent';

export default function CookieSettingsLink() {
  return (
    <button
      type="button"
      onClick={() => clearConsent()}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        color: 'var(--text)',
        opacity: 0.7,
        textDecoration: 'none',
        fontSize: 'var(--fs-small)',
        cursor: 'pointer',
        fontFamily: 'inherit',
        textAlign: 'left',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
    >
      Ustawienia cookies
    </button>
  );
}
