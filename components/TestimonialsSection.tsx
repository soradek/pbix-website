'use client';

import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { Testimonial } from '@/data/testimonials';
import ScrollReveal from './ScrollReveal';

function StarRow({ small = false }: { small?: boolean }) {
  return (
    <div style={{ display: 'flex', gap: '3px', marginBottom: small ? '12px' : '20px' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width={small ? 13 : 16} height={small ? 13 : 16} viewBox="0 0 24 24" fill="#facc15">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t, small = false }: { t: Testimonial; small?: boolean }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #1a8a49 0%, #1e9953 60%, #178040 100%)',
      borderRadius: small ? '16px' : '20px',
      padding: small ? '24px 20px' : '36px 32px',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      boxShadow: '0 8px 32px rgba(30,153,83,0.25)',
      boxSizing: 'border-box',
    }}>
      <StarRow small={small} />
      {!small && (
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
      )}
      <p style={{
        color: '#ffffff',
        fontSize: small ? '13px' : '15px',
        lineHeight: 1.65,
        margin: small ? '0 0 16px' : '0 0 28px',
        flex: 1,
        fontStyle: 'italic',
      }}>
        {t.text}
      </p>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        paddingTop: small ? '14px' : '20px',
        borderTop: '1px solid rgba(255,255,255,0.18)',
      }}>
        <div style={{
          width: small ? '36px' : '44px',
          height: small ? '36px' : '44px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: small ? '14px' : '17px', fontWeight: 700, color: 'white', flexShrink: 0,
          border: '1.5px solid rgba(255,255,255,0.3)',
        }}>
          {t.name.charAt(0)}
        </div>
        <div>
          <div style={{ fontSize: small ? '13px' : '14px', fontWeight: 700, color: '#ffffff' }}>{t.name}</div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.65)', marginTop: '2px' }}>{t.role} · {t.company}</div>
        </div>
      </div>
    </div>
  );
}

const GAP = 24;
const VISIBLE_DESKTOP = 3;
const VISIBLE_MOBILE = 1;
const SWIPE_THRESHOLD = 40;

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const total = testimonials.length;

  useLayoutEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        const visible = mobile ? VISIBLE_MOBILE : VISIBLE_DESKTOP;
        setCardWidth((w - GAP * (visible - 1)) / visible);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const visible = isMobile ? VISIBLE_MOBILE : VISIBLE_DESKTOP;
  const maxActive = total - visible;
  const step = cardWidth + GAP;

  // clamp active when switching between mobile/desktop
  const clampedActive = Math.min(active, maxActive);

  const prev = () => setActive(a => (a <= 0 ? maxActive : a - 1));
  const next = () => setActive(a => (a >= maxActive ? 0 : a + 1));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      delta > 0 ? next() : prev();
    }
    touchStartX.current = null;
  };

  return (
    <section style={{ padding: isMobile ? '72px 16px' : '120px 24px', background: '#f5f5f7' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '40px' : '72px' }}>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: '#6e6e73', marginBottom: '16px' }}>Opinie</div>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 48px)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-1px', margin: 0 }}>
              Co mówią uczestnicy
            </h2>
          </div>
        </ScrollReveal>

        {/* Sliding track */}
        <div
          ref={containerRef}
          style={{ overflow: 'hidden', touchAction: 'pan-y' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div
            animate={{ x: cardWidth ? -clampedActive * step : 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', gap: `${GAP}px` }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                style={{
                  flex: `0 0 ${cardWidth ? `${cardWidth}px` : `calc((100% - ${GAP * (visible - 1)}px) / ${visible})`}`,
                  minWidth: cardWidth ? `${cardWidth}px` : `calc((100% - ${GAP * (visible - 1)}px) / ${visible})`,
                }}
              >
                <TestimonialCard t={t} small={isMobile} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: isMobile ? '28px' : '48px' }}>
          <button
            onClick={prev}
            style={{
              width: '44px', height: '44px', borderRadius: '50%',
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

          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {Array.from({ length: maxActive + 1 }, (_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: i === clampedActive ? '24px' : '12px', height: '12px',
                  borderRadius: '4px',
                  background: i === clampedActive ? '#1e9953' : 'rgba(0,0,0,0.18)',
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
              width: '44px', height: '44px', borderRadius: '50%',
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
