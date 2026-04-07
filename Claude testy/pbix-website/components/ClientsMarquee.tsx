'use client';

import { clients } from '@/data/clients';

export default function ClientsMarquee() {
  const doubled = [...clients, ...clients, ...clients];

  return (
    <section style={{
      padding: '80px 0',
      borderTop: '1px solid rgba(0,0,0,0.08)',
      borderBottom: '1px solid rgba(0,0,0,0.08)',
      overflow: 'hidden',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '48px', padding: '0 24px' }}>
        <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#6e6e73' }}>
          Zaufali mi
        </div>
      </div>
      <div style={{ overflow: 'hidden' }}>
        <div className="marquee-track">
          {doubled.map((client, i) => (
            <div
              key={i}
              style={{
                padding: '0 56px',
                fontSize: '18px',
                fontWeight: 500,
                color: 'rgba(0,0,0,0.28)',
                whiteSpace: 'nowrap',
                letterSpacing: '-0.3px',
                flexShrink: 0,
                transition: 'color 0.3s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#1e9953'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(0,0,0,0.28)'; }}
            >
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
