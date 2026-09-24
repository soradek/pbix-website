'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQItem } from '@/data/faq';
import ScrollReveal from './ScrollReveal';

export default function FAQSection({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section style={{ padding: '0 24px 120px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: 'var(--fs-h2)', fontWeight: 500, color: 'var(--text)', letterSpacing: 'var(--ls-h2)', margin: 0 }}>
              Najczęściej zadawane pytania
            </h2>
          </div>
        </ScrollReveal>
        <div>
          {items.map((item, i) => (
            <div key={i} style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '24px 0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '16px',
                  textAlign: 'left',
                }}
                aria-expanded={openIndex === i}
              >
                <span style={{ fontSize: 'var(--fs-lead)', fontWeight: 500, color: 'var(--text)', lineHeight: 1.4 }}>{item.q}</span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  style={{ fontSize: 'var(--fs-h3)', color: 'var(--muted)', flexShrink: 0, lineHeight: 1 }}
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ paddingBottom: '24px', color: 'var(--muted)', fontSize: 'var(--fs-body)', lineHeight: 1.75 }}>
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
