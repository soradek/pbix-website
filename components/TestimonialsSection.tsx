'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Testimonial } from '@/data/testimonials';
import ScrollReveal from './ScrollReveal';

function StarRow() {
  return (
    <div style={{ display: 'flex', gap: '3px', marginBottom: '20px' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#1e9953">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t, key: _key }: { t: Testimonial; key?: number }) {
  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid rgba(0,0,0,0.08)',
      borderRadius: '20px',
      padding: '36px 32px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      minWidth: 0,
    }}>
      <StarRow />
      {/* Quote mark */}
      <div style={{
        fontSize: '64px',
        lineHeight: 0.7,
        color: '#1e9953',
        fontFamily: 'Georgia, serif',
        marginBottom: '16px',
        userSelect: 'none',
      }}>
        &ldquo;
      </div>
      <p style={{
        color: '#3d3d3f',
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
        borderTop: '1px solid rgba(0,0,0,0.07)',
      }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #1e9953, #17803f)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '17px',
          fontWeight: 700,
          color: 'white',
          flexShrink: 0,
        }}>
          {t.name.charAt(0)}
        </div>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#1d1d1f' }}>{t.name}</div>
          <div style={{ fontSize: '12px', color: '#6e6e73', marginTop: '2px' }}>{t.role} · {t.company}</div>
        </div>
      </div>
    </div>
  );
}

const VISIBLE = 3;

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const [active, setActive] = useState(0);
  const total = testimonials.length;

  const prev = () => setActive(a => (a - 1 + total) % total);
  const next = () => setActive(a => (a + 1) % total);

  const visible = [0, 1, 2].map(offset => testimonials[(active + offset) % total]);

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

        {/* Cards */}
        <div style={{ position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              className="testimonials-row"
              style={{ display: 'flex', gap: '24px' }}
            >
              {visible.map((t, i) => (
                <TestimonialCard key={i} t={t} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginTop: '48px' }}>
          {/* Prev arrow */}
          <button
            onClick={prev}
            style={{
              width: '48px', height: '48px',
              borderRadius: '50%',
              background: '#ffffff',
              border: '1.5px solid rgba(0,0,0,0.12)',
              color: '#1d1d1f',
              fontSize: '18px',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              transition: 'all 0.2s',
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#1e9953';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.borderColor = '#1e9953';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.color = '#1d1d1f';
              e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)';
            }}
            aria-label="Poprzednia opinia"
          >
            ←
          </button>

          {/* Dots */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: i === active ? '28px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: i === active ? '#1e9953' : 'rgba(0,0,0,0.18)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.3s ease',
                }}
                aria-label={`Opinia ${i + 1}`}
              />
            ))}
          </div>

          {/* Next arrow */}
          <button
            onClick={next}
            style={{
              width: '48px', height: '48px',
              borderRadius: '50%',
              background: '#1e9953',
              border: '1.5px solid #1e9953',
              color: '#ffffff',
              fontSize: '18px',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(30,153,83,0.3)',
              transition: 'all 0.2s',
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#17803f';
              e.currentTarget.style.borderColor = '#17803f';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#1e9953';
              e.currentTarget.style.borderColor = '#1e9953';
            }}
            aria-label="Następna opinia"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
