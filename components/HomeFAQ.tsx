'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { faqItems } from '@/data/faq';

export default function HomeFAQ() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <section style={{ padding: '120px 24px', background: '#f9f9f9' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="faq-cta-grid">

          {/* Left – FAQ */}
          <div>
            <ScrollReveal>
              <div style={{ marginBottom: '48px' }}>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: '#6e6e73', marginBottom: '16px' }}>FAQ</div>
                <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-1px', margin: 0 }}>
                  Najczęściej zadawane pytania
                </h2>
              </div>
            </ScrollReveal>
            <div>
              {faqItems.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                    <button
                      onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                      style={{
                        width: '100%', background: 'none', border: 'none',
                        cursor: 'pointer', padding: '22px 0',
                        display: 'flex', justifyContent: 'space-between',
                        alignItems: 'center', gap: '16px', textAlign: 'left',
                      }}
                      aria-expanded={faqOpen === i}
                    >
                      <span style={{ fontSize: '16px', fontWeight: 500, color: '#1d1d1f', lineHeight: 1.4 }}>{item.q}</span>
                      <motion.span
                        animate={{ rotate: faqOpen === i ? 45 : 0 }}
                        style={{ fontSize: '24px', color: faqOpen === i ? '#1e9953' : '#6e6e73', flexShrink: 0, lineHeight: 1 }}
                      >
                        +
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {faqOpen === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ overflow: 'hidden', willChange: 'height' }}
                        >
                          <div style={{ paddingBottom: '22px', color: '#6e6e73', fontSize: '15px', lineHeight: 1.75 }}>
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Right – CTA */}
          <div className="faq-cta-sticky" style={{ position: 'sticky', top: '88px', alignSelf: 'start' }}>
            <ScrollReveal delay={0.1}>
              <div style={{
                background: 'linear-gradient(135deg, #003d20 0%, #1e9953 55%, #006633 100%)',
                borderRadius: '28px', padding: '56px 48px', textAlign: 'center',
              }}>
                <h2 style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.8px', margin: '0 0 14px', lineHeight: 1.2 }}>
                  Porozmawiajmy o Twoim szkoleniu.
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: 1.75, margin: '0 0 36px' }}>
                  Napisz do mnie – ustalmy zakres i termin zajęć dopasowanych do Twoich potrzeb.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <Link href="/kontakt" style={{ background: '#ffffff', color: '#1e9953', textDecoration: 'none', padding: '15px 32px', borderRadius: '980px', fontSize: '15px', fontWeight: 700, display: 'block', textAlign: 'center' }}>
                    Skontaktuj się
                  </Link>
                  <Link href="/szkolenia" style={{ border: '1.5px solid rgba(255,255,255,0.35)', color: '#ffffff', textDecoration: 'none', padding: '15px 32px', borderRadius: '980px', fontSize: '15px', fontWeight: 500, display: 'block', textAlign: 'center' }}>
                    Zobacz szkolenia
                  </Link>
                </div>
                <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.55)', fontSize: '13px' }}>
                  4 500+ przeszkolonych pracowników · certyfikat MCT
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
