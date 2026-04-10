'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Testimonial } from '@/data/testimonials';
import ScrollReveal from './ScrollReveal';

function StarRow() {
  return (
    <div style={{ display: 'flex', gap: '3px', marginBottom: '20px' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#facc15">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #1a8a49 0%, #1e9953 60%, #178040 100%)',
      borderRadius: '20px',
      padding: '36px 32px',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      boxShadow: '0 8px 32px rgba(30,153,83,0.25)',
      boxSizing: 'border-box',
    }}>
      <StarRow />
      <div style={{
        fontSize: '64px',
        lineHeight: 0.7,
        color: 'rgba(255,255,255,0.35)',
        fontFamily: 'Georgia, serif',
        marginBottom: '16px',
        userSelect: 'none',
      }}>
        &ldquo;
      </div>
      <p style={{
        color: '#ffffff',
        fontSize: '15px',
        lineHeight: 1.75,
        margin: '0 0 28px',
        flex: 1,
        fontStyle: 'italic',
      }}>
        {t.text}
      </p>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        paddingTop: '20px',
        borderTop: '1px solid rgba(255,255,255,0.18)',
      }}>
        <div style={{
          width: '44px', height: '44px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '17px', fontWeight: 700, color: 'white', flexShrink: 0,
          border: '1.5px solid rgba(255,255,255,0.3)',
        }}>
          {t.name.charAt(0)}
        </div>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>{t.name}</div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)', marginTop: '2px' }}>{t.role} · {t.company}</div>
        </div>
      </div>
    </div>
  );
}

const GAP = 24;
const VISIBLE = 3;

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const total = testimonials.length;
  const maxActive = total - VISIBLE;

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        setCardWidth((w - GAP * (VISIBLE - 1)) / VISIBLE);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const step = cardWidth + GAP;

  const prev = () => setActive(a => (a <= 0 ? maxActive : a - 1));
  const next = () => setActive(a => (a >= maxActive ? 0 : a + 1));

  return (
    <section style={{ padding: '120px 24px', background: '#f5f5f7' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '72px' }}>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: '#6e6e73', marginBottom: '16px' }}>Opinie</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-1px', margin: 0 }}>
              Co mówią uczestnicy
            </h2>
          </div>
        </ScrollReveal>

        {/* Sliding track — moves by 1 card per click */}
        <div ref={containerRef} style={{ overflow: 'hidden' }}>
          <motion.div
            animate={{ x: cardWidth ? -active * step : 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', gap: `${GAP}px` }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                style={{
                  flex: `0 0 ${cardWidth || `calc((100% - ${GAP * (VISIBLE - 1)}px) / ${VISIBLE})`}px`,
                  minWidth: cardWidth ? `${cardWidth}px` : `calc((100% - ${GAP * (VISIBLE - 1)}px) / ${VISIBLE})`,
                }}
              >
                <TestimonialCard t={t} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '48px' }}>
          <button
            onClick={prev}
            style={{
              width: '48px', height: '48px', borderRadius: '50%',
              background: '#ffffff', border: '1.5px solid rgba(0,0,0,0.12)',
              color: '#1d1d1f', fontSize: '18px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: 'all 0.2s', flexShrink: 0,
              outline: 'none',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#1e9953'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#1e9953'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.color = '#1d1d1f'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'; }}
            aria-label="Poprzednia opinia"
          >
            ←
          </button>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {Array.from({ length: maxActive + 1 }, (_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: i === active ? '28px' : '8px', height: '8px',
                  borderRadius: '4px',
                  background: i === active ? '#1e9953' : 'rgba(0,0,0,0.18)',
                  border: 'none', cursor: 'pointer', padding: 0,
                  transition: 'all 0.3s ease',
                  outline: 'none',
                }}
                aria-label={`Opinia ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            style={{
              width: '48px', height: '48px', borderRadius: '50%',
              background: '#1e9953', border: 'none',
              color: '#ffffff', fontSize: '18px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(30,153,83,0.35)', transition: 'all 0.2s', flexShrink: 0,
              outline: 'none',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#17803f'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(30,153,83,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#1e9953'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(30,153,83,0.35)'; }}
            aria-label="Następna opinia"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
