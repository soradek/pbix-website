'use client';

import { clients } from '@/data/clients';

export default function ClientsMarquee({ lang = 'pl' }: { lang?: 'pl' | 'en' }) {
  const doubled = [...clients, ...clients];

  return (
    <section
      style={{
        padding: '120px 24px',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #003d20 0%, #1e9953 55%, #006633 100%)',
        position: 'relative',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '80px', maxWidth: '800px', margin: '0 auto 80px' }}>
        <h2
          style={{
            fontSize: 'var(--fs-h2)',
            fontWeight: 500,
            color: 'var(--white)',
            letterSpacing: 'var(--ls-h2)',
            margin: 0,
            lineHeight: 'var(--lh-h2)',
          }}
        >
          {lang === 'en' ? 'These Companies I\'ve Already Trained' : 'Te firmy już szkoliłem'}
        </h2>
      </div>
      <div
        style={{
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div className="marquee-track">
          {doubled.map((client, i) => (
            <div
              key={i}
              className="marquee-item"
              style={{
                padding: '0 48px',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '64px',
              }}
            >
              <img
                src={`/logos/${client.slug}.png`}
                alt={client.name}
                title={client.name}
                style={{
                  height: `${client.cssHeight}px`,
                  width: 'auto',
                  opacity: 0.85,
                  transition: 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'block',
                  filter: 'brightness(1.05)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = '1';
                  (e.currentTarget as HTMLImageElement).style.filter = 'brightness(1.15)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = '0.85';
                  (e.currentTarget as HTMLImageElement).style.filter = 'brightness(1.05)';
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
