'use client';

import { motion } from 'framer-motion';
import { Testimonial } from '@/data/testimonials';
import ScrollReveal from './ScrollReveal';
import { IconStar } from './Icons';

function StarRating() {
  return (
    <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
      {[1, 2, 3, 4, 5].map(i => <IconStar key={i} size={15} color="#1e9953" />)}
    </div>
  );
}

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section style={{ padding: '120px 24px', background: '#f5f5f7' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#6e6e73', marginBottom: '16px' }}>Opinie</div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 600, color: '#1d1d1f', letterSpacing: '-1px', margin: 0 }}>
              Co mówią uczestnicy
            </h2>
          </div>
        </ScrollReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              style={{
                background: '#ffffff',
                borderRadius: '24px',
                padding: '36px 32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '0',
                boxShadow: '0 2px 16px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
                transition: 'box-shadow 0.3s, transform 0.3s',
              }}
              whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)' }}
            >
              <StarRating />
              {/* Large decorative quote */}
              <div style={{
                fontSize: '56px',
                color: '#1e9953',
                lineHeight: 0.8,
                fontFamily: 'Georgia, serif',
                marginBottom: '12px',
                userSelect: 'none',
              }}>
                &ldquo;
              </div>
              <p style={{ color: '#1d1d1f', fontSize: '15px', lineHeight: 1.75, margin: '0 0 28px', flex: 1 }}>
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
                  fontWeight: 600,
                  color: 'white',
                  flexShrink: 0,
                }}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1f' }}>{t.name}</div>
                  <div style={{ fontSize: '12px', color: '#6e6e73', marginTop: '2px' }}>{t.role} · {t.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
