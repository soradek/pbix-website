'use client';

import { clients } from '@/data/clients';

export default function ClientsMarquee({ lang = 'pl' }: { lang?: 'pl' | 'en' }) {
  const doubled = [...clients, ...clients];

  return (
    <section style={{
      padding: '80px 0',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #003d20 0%, #1e9953 55%, #006633 100%)',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '64px', padding: '0 24px' }}>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#ffffff', letterSpacing: '-1px', margin: 0 }}>
          {lang === 'en' ? 'Trusted by' : 'Zaufali mi'}
        </h2>
      </div>
      <div style={{ overflow: 'hidden' }}>
        <div className="marquee-track">
          {doubled.map((client, i) => (
            <div
              key={i}
              className="marquee-item"
              style={{
                padding: '0 56px',
                fontSize: '18px',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.75)',
                whiteSpace: 'nowrap',
                letterSpacing: '-0.3px',
                flexShrink: 0,
                transition: 'color 0.3s',
              }}
            >
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
