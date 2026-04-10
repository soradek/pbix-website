'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Training } from '@/data/trainings';
import ScrollReveal from '@/components/ScrollReveal';
import {
  IconFolder, IconFlask, IconAward, IconMessageCircle,
  IconCheck, IconClock, IconTag,
} from '@/components/Icons';

export default function TrainingPageClient({ training }: { training: Training }) {
  const [openModule, setOpenModule] = useState<number | null>(0);

  return (
    <>
      {/* Hero */}
      <section
        className="training-hero"
        style={{
          padding: '140px 24px 100px',
          background: 'linear-gradient(180deg, rgba(30,153,83,0.04) 0%, rgba(255,255,255,0) 100%)',
          borderBottom: '1px solid rgba(0,0,0,0.07)',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Category badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(30,153,83,0.08)',
            border: '1px solid rgba(30,153,83,0.2)',
            borderRadius: '980px',
            padding: '5px 14px',
            fontSize: '11px',
            letterSpacing: '1.5px',
            textTransform: 'uppercase' as const,
            color: '#1e9953',
            fontWeight: 600,
            marginBottom: '20px',
          }}>
            {training.category}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-2px', lineHeight: 1.05, margin: '0 0 32px' }}
          >
            {training.title}
          </motion.h1>

          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', marginBottom: '44px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <IconClock size={18} color="#6e6e73" />
              <div>
                <div style={{ fontSize: '11px', color: '#6e6e73', marginBottom: '1px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Czas trwania</div>
                <div style={{ fontSize: '16px', fontWeight: 600, color: '#1d1d1f' }}>{training.duration}</div>
              </div>
            </div>
            <div style={{ width: '1px', background: 'rgba(0,0,0,0.08)' }} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <IconTag size={18} color="#6e6e73" />
                <div style={{ fontSize: '11px', color: '#6e6e73', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Cena netto za grupę</div>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {training.pricingTiers.map((tier) => (
                  <div key={tier.maxPeople} style={{
                    background: 'rgba(30,153,83,0.06)',
                    border: '1px solid rgba(30,153,83,0.16)',
                    borderRadius: '12px',
                    padding: '10px 16px',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '10px', color: '#6e6e73', marginBottom: '4px', whiteSpace: 'nowrap' }}>do {tier.maxPeople} osób</div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.3px' }}>{tier.priceLabel}</div>
                  </div>
                ))}
              </div>
            </div>
            {training.language && (
              <>
                <div style={{ width: '1px', background: 'rgba(0,0,0,0.08)' }} />
                <div>
                  <div style={{ fontSize: '11px', color: '#6e6e73', marginBottom: '1px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Język</div>
                  <div style={{ fontSize: '15px', fontWeight: 500, color: '#1d1d1f' }}>{training.language}</div>
                </div>
              </>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
          >
            <Link href="/zapisy" style={{ background: '#1e9953', color: 'white', textDecoration: 'none', padding: '14px 28px', borderRadius: '980px', fontSize: '14px', fontWeight: 600 }}>
              Zapisz się
            </Link>
            <Link href="/kontakt" style={{ border: '1.5px solid rgba(0,0,0,0.15)', color: '#1d1d1f', textDecoration: 'none', padding: '14px 28px', borderRadius: '980px', fontSize: '14px', fontWeight: 500 }}>
              Zapytaj o termin
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Description */}
      <section style={{ padding: '80px 24px' }}>
        <div className="training-desc-grid" style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '56px', alignItems: 'start' }}>
          <ScrollReveal>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1d1d1f', margin: '0 0 18px', letterSpacing: '-0.5px' }}>O szkoleniu</h2>
              <p style={{ color: '#6e6e73', fontSize: '16px', lineHeight: 1.85, margin: 0 }}>{training.description}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.12}>
            <div style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '18px', padding: '24px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1f', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Wymagania wstępne</h3>
              <p style={{ color: '#6e6e73', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>{training.prerequisites}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* For whom + Benefits */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="two-col-grid">
            <ScrollReveal>
              <div style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '20px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1d1d1f', margin: '0 0 20px', letterSpacing: '-0.3px' }}>Dla kogo</h2>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {training.targetAudience.map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#1e9953', flexShrink: 0, marginTop: '1px' }}><IconCheck size={15} color="#1e9953" strokeWidth={2.5} /></span>
                      <span style={{ color: '#6e6e73', fontSize: '13px', lineHeight: 1.65 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.12}>
              <div style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '20px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1d1d1f', margin: '0 0 20px', letterSpacing: '-0.3px' }}>Co zyskasz</h2>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {training.benefits.map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#1e9953', flexShrink: 0, marginTop: '1px' }}><IconCheck size={15} color="#1e9953" strokeWidth={2.5} /></span>
                      <span style={{ color: '#6e6e73', fontSize: '13px', lineHeight: 1.65 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Program - accordion */}
      <section style={{ padding: '0 24px 80px', background: '#f9f9f9' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', paddingTop: '80px', paddingBottom: '80px' }}>
          <ScrollReveal>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, color: '#1d1d1f', margin: '0 0 40px', letterSpacing: '-0.5px' }}>Program szkolenia</h2>
          </ScrollReveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {training.program.map((module, i) => (
              <ScrollReveal key={i} delay={i * 0.04}>
                <div style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  <button
                    onClick={() => setOpenModule(openModule === i ? null : i)}
                    style={{
                      width: '100%',
                      background: openModule === i ? 'rgba(30,153,83,0.05)' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '20px 24px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      textAlign: 'left',
                      fontFamily: 'inherit',
                    }}
                    aria-expanded={openModule === i}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span style={{ fontSize: '11px', color: '#1e9953', fontWeight: 700, minWidth: '28px', letterSpacing: '0.5px' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span style={{ fontSize: '15px', fontWeight: 600, color: '#1d1d1f' }}>{module.title}</span>
                    </div>
                    <motion.span animate={{ rotate: openModule === i ? 45 : 0 }} style={{ color: '#6e6e73', fontSize: '20px', flexShrink: 0, lineHeight: 1 }}>
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openModule === i && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.25 }} style={{ overflow: 'hidden' }}>
                        <ul style={{ margin: 0, padding: '4px 24px 20px 68px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {module.items.map((item, j) => (
                            <li key={j} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                              <span style={{ color: 'rgba(0,0,0,0.2)', flexShrink: 0, fontSize: '12px', marginTop: '3px' }}>—</span>
                              <span style={{ color: '#6e6e73', fontSize: '13px', lineHeight: 1.65 }}>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <ScrollReveal>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, color: '#1d1d1f', margin: '0 0 40px', letterSpacing: '-0.5px' }}>Co otrzymujesz</h2>
          </ScrollReveal>
          <div className="receive-grid">
            {[
              { icon: <IconFolder size={28} color="#1e9953" />, title: 'Materiały', desc: 'Prezentacje i pliki ćwiczeń do zachowania' },
              { icon: <IconFlask size={28} color="#1e9953" />, title: 'Warsztaty', desc: 'Praktyczne zadania na realnych danych' },
              { icon: <IconAward size={28} color="#1e9953" />, title: 'Certyfikat', desc: 'W wersji polskiej i angielskiej' },
              { icon: <IconMessageCircle size={28} color="#1e9953" />, title: 'Konsultacje', desc: 'Pytania po szkoleniu na LinkedIn' },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <div style={{
                  background: '#ffffff',
                  border: '1px solid rgba(0,0,0,0.08)',
                  borderRadius: '18px',
                  padding: '28px 20px',
                  textAlign: 'center',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
                    <div style={{ width: '52px', height: '52px', background: 'rgba(30,153,83,0.08)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {item.icon}
                    </div>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1f', marginBottom: '6px' }}>{item.title}</div>
                  <div style={{ fontSize: '12px', color: '#6e6e73', lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {training.faq && training.faq.length > 0 && (
        <section style={{ padding: '0 24px 80px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <ScrollReveal>
              <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, color: '#1d1d1f', margin: '0 0 40px', letterSpacing: '-0.5px' }}>Pytania o szkolenie</h2>
            </ScrollReveal>
            <div>
              {training.faq.map((item, i) => (
                <FAQItem key={i} item={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ padding: '0 24px 120px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <ScrollReveal>
            <div
              className="cta-box"
              style={{
                background: 'linear-gradient(135deg, rgba(30,153,83,0.07) 0%, rgba(30,153,83,0.03) 100%)',
                border: '1px solid rgba(30,153,83,0.14)',
                borderRadius: '28px',
                padding: '64px 48px',
              }}
            >
              <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#1d1d1f', margin: '0 0 14px', letterSpacing: '-0.5px' }}>
                Gotowy na szkolenie?
              </h2>
              <p style={{ color: '#6e6e73', fontSize: '15px', lineHeight: 1.7, margin: '0 0 32px' }}>
                Zarezerwuj miejsce lub zapytaj o najbliższy termin.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/zapisy" style={{ background: '#1e9953', color: 'white', textDecoration: 'none', padding: '13px 28px', borderRadius: '980px', fontSize: '14px', fontWeight: 600 }}>
                  Zapisz się
                </Link>
                <Link href="/szkolenia" style={{ border: '1.5px solid rgba(0,0,0,0.15)', color: '#1d1d1f', textDecoration: 'none', padding: '13px 28px', borderRadius: '980px', fontSize: '14px', fontWeight: 500 }}>
                  Inne szkolenia
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

function FAQItem({ item }: { item: { q: string; a: string } }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', textAlign: 'left', fontFamily: 'inherit' }}
      >
        <span style={{ fontSize: '15px', fontWeight: 600, color: '#1d1d1f' }}>{item.q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} style={{ color: '#6e6e73', fontSize: '22px', flexShrink: 0 }}>+</motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflow: 'hidden' }}>
            <div style={{ paddingBottom: '20px', color: '#6e6e73', fontSize: '14px', lineHeight: 1.75 }}>{item.a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
