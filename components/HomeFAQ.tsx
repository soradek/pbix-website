'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { faqItems, faqItemsEn } from '@/data/faq';

export default function HomeFAQ({ lang = 'pl' }: { lang?: 'pl' | 'en' }) {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const items = lang === 'en' ? faqItemsEn : faqItems;
  const heading = lang === 'en' ? 'Frequently asked questions' : 'Najczęściej zadawane pytania';
  const ctaTitle = lang === 'en' ? "Let's talk about your training." : 'Porozmawiajmy o Twoim szkoleniu.';
  const ctaDesc = lang === 'en' ? "Write to me — let's define the scope and schedule a session tailored to your needs." : 'Napisz do mnie – ustalmy zakres i termin zajęć dopasowanych do Twoich potrzeb.';
  const ctaBtn = lang === 'en' ? 'Contact me' : 'Skontaktuj się';
  const ctaHref = lang === 'en' ? '/en/contact' : '/kontakt';
  const trainingsHref = lang === 'en' ? '/en/trainings' : '/szkolenia';
  const trainingsLabel = lang === 'en' ? 'View trainings' : 'Zobacz szkolenia';
  const badge = lang === 'en' ? '4,500+ trained professionals · MCT certified' : '4 500+ przeszkolonych pracowników · certyfikat MCT';

  return (
    <section id="faq" style={{ padding: '120px 24px', background: 'var(--paper)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="faq-cta-grid">

          {/* Left – FAQ */}
          <div>
            <ScrollReveal>
              <div style={{ marginBottom: '48px' }}>
                <h2 style={{ fontSize: 'var(--fs-h2)', fontWeight: 500, color: 'var(--text)', letterSpacing: 'var(--ls-h2)', margin: 0 }}>
                  {heading}
                </h2>
              </div>
            </ScrollReveal>
            <div>
              {items.map((item, i) => (
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
                      <span style={{ fontSize: 'var(--fs-body)', fontWeight: 500, color: 'var(--text)', lineHeight: 1.4 }}>{item.q}</span>
                      <motion.span
                        animate={{ rotate: faqOpen === i ? 45 : 0 }}
                        style={{ fontSize: 'var(--fs-h3)', color: faqOpen === i ? 'var(--accent)' : 'var(--muted)', flexShrink: 0, lineHeight: 1 }}
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
                          <div style={{ paddingBottom: '22px', color: 'var(--muted)', fontSize: 'var(--fs-ui)', lineHeight: 1.75 }}>
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
                <h2 style={{ fontSize: 'var(--fs-h3)', fontWeight: 500, color: 'var(--white)', letterSpacing: 'var(--ls-h3)', margin: '0 0 14px', lineHeight: 1.2 }}>
                  {ctaTitle}
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 'var(--fs-ui)', lineHeight: 1.75, margin: '0 0 36px' }}>
                  {ctaDesc}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <Link href={ctaHref} style={{ background: 'var(--white)', color: 'var(--accent)', textDecoration: 'none', padding: '15px 32px', borderRadius: '980px', fontSize: 'var(--fs-ui)', fontWeight: 700, display: 'block', textAlign: 'center' }}>
                    {ctaBtn}
                  </Link>
                  <Link href={trainingsHref} style={{ border: '1.5px solid rgba(255,255,255,0.35)', color: 'var(--white)', textDecoration: 'none', padding: '15px 32px', borderRadius: '980px', fontSize: 'var(--fs-ui)', fontWeight: 500, display: 'block', textAlign: 'center' }}>
                    {trainingsLabel}
                  </Link>
                </div>
                <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.55)', fontSize: 'var(--fs-small)' }}>
                  {badge}
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
