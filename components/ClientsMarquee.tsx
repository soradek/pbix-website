'use client';

import { clients } from '@/data/clients';

export default function ClientsMarquee() {
  const doubled = [...clients, ...clients];

  return (
    <section style={{
      padding: '80px 0',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #003d20 0%, #1e9953 55%, #006633 100%)',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '48px', padding: '0 24px' }}>
        <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,0.7)', fontWeight: 700 }}>
          Zaufali mi
        </div>
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
