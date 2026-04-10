'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Testimonial } from '@/data/testimonials';

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '140px 24px',
        background: '#0a1f12',
      }}
    >
      {/* Background photo with overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/radek2.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        opacity: 0.18,
      }} />
      {/* Dark gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(0,30,15,0.97) 0%, rgba(5,40,20,0.92) 60%, rgba(0,20,10,0.95) 100%)',
      }} />
      {/* Green glow */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        width: '600px',
        height: '400px',
        background: 'rgba(30,153,83,0.08)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>

        {/* Section label */}
        <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '3px', color: 'rgba(30,153,83,0.9)', marginBottom: '24px', fontWeight: 700 }}>
          Co mówią uczestnicy
        </div>

        {/* Big decorative quote */}
        <div style={{
          fontSize: '120px',
          lineHeight: 0.6,
          color: '#1e9953',
          fontFamily: 'Georgia, serif',
          marginBottom: '32px',
          opacity: 0.8,
          userSelect: 'none',
        }}>
          &ldquo;
        </div>

        {/* Testimonial text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <p style={{
              fontSize: 'clamp(18px, 2.5vw, 26px)',
              fontWeight: 400,
              color: '#ffffff',
              lineHeight: 1.65,
              letterSpacing: '-0.3px',
              margin: '0 0 48px',
              fontStyle: 'italic',
            }}>
              {t.text}
            </p>

            {/* Author */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1e9953, #17803f)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: 700,
                color: 'white',
                marginBottom: '12px',
                border: '2px solid rgba(255,255,255,0.15)',
              }}>
                {t.name.charAt(0)}
              </div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.2px' }}>
                {t.name}
              </div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.5px' }}>
                {t.role} · {t.company}
              </div>
              {/* Stars */}
              <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
                {[1,2,3,4,5].map(i => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#1e9953">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '56px' }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? '32px' : '10px',
                height: '10px',
                borderRadius: '5px',
                background: i === active ? '#1e9953' : 'rgba(255,255,255,0.25)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.3s ease',
              }}
              aria-label={`Opinia ${i + 1}`}
            />
          ))}
        </div>

        {/* Prev/Next arrows */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '28px' }}>
          <button
            onClick={() => setActive(prev => (prev - 1 + testimonials.length) % testimonials.length)}
            style={{
              width: '44px', height: '44px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#ffffff',
              fontSize: '18px',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(30,153,83,0.3)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
            aria-label="Poprzednia opinia"
          >
            ←
          </button>
          <button
            onClick={() => setActive(prev => (prev + 1) % testimonials.length)}
            style={{
              width: '44px', height: '44px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#ffffff',
              fontSize: '18px',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(30,153,83,0.3)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
            aria-label="Następna opinia"
          >
            →
          </button>
        </div>

      </div>
    </section>
  );
}
