'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import { trainings, Training } from '@/data/trainings';
import { IconBarChart, IconExcel, IconDatabase, IconPieChart, IconArrowRight } from '@/components/Icons';

const categories = ['Wszystkie', 'Power BI', 'Excel', 'SQL', 'Wizualizacja danych'] as const;

const getCategoryIcon = (cat: string, size = 20) => {
  if (cat === 'Power BI') return <IconBarChart size={size} color="currentColor" />;
  if (cat === 'Excel') return <IconExcel size={size} color="currentColor" />;
  if (cat === 'SQL') return <IconDatabase size={size} color="currentColor" />;
  if (cat === 'Wizualizacja danych') return <IconPieChart size={size} color="currentColor" />;
  return null;
};

const VALID_CATEGORIES = ['Power BI', 'Excel', 'SQL', 'Wizualizacja danych'];

function SzkoleniasContent() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>(() => {
    const kat = searchParams.get('kategoria');
    return kat && VALID_CATEGORIES.includes(kat) ? kat : 'Wszystkie';
  });

  useEffect(() => {
    const kat = searchParams.get('kategoria');
    if (kat && VALID_CATEGORIES.includes(kat)) setActiveCategory(kat);
    else setActiveCategory('Wszystkie');
  }, [searchParams]);

  const filtered = activeCategory === 'Wszystkie'
    ? trainings
    : trainings.filter(t => t.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section style={{ padding: '140px 24px 72px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: '#6e6e73', marginBottom: '16px' }}>Oferta</div>
          <h1 style={{ fontSize: 'clamp(44px, 8vw, 76px)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-2.5px', lineHeight: 1.05, margin: '0 0 20px' }}>
            Szkolenia
          </h1>
          <p style={{ fontSize: '18px', color: '#6e6e73', lineHeight: 1.65, margin: 0, fontWeight: 400 }}>
            Specjalistyczne kursy z Power BI, Excel, SQL i wizualizacji danych.<br />
            Każde szkolenie – 2 dni intensywnej, praktycznej nauki.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section style={{ padding: '0 24px 56px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '56px' }}>
            {categories.map(cat => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: active ? '#1e9953' : '#ffffff',
                    border: `1px solid ${active ? '#1e9953' : 'rgba(0,0,0,0.1)'}`,
                    color: active ? 'white' : '#6e6e73',
                    padding: '12px 20px',
                    borderRadius: '980px',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: 'inherit',
                    boxShadow: active ? '0 4px 12px rgba(30,153,83,0.25)' : 'none',
                  }}
                >
                  {cat !== 'Wszystkie' && <span style={{ display: 'flex', color: active ? 'rgba(255,255,255,0.85)' : '#6e6e73' }}>{getCategoryIcon(cat, 14)}</span>}
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="training-grid">
            {filtered.map((training) => (
              <TrainingCardLocal key={training.slug} training={training} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px 120px', background: '#f9f9f9' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <ScrollReveal>
            <div style={{
              background: 'rgba(30,153,83,0.06)',
              border: '1px solid rgba(30,153,83,0.16)',
              borderRadius: '24px',
              padding: '56px 40px',
            }}>
              <h2 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, color: '#1d1d1f', margin: '0 0 14px', letterSpacing: '-0.5px' }}>
                Nie wiesz, które szkolenie wybrać?
              </h2>
              <p style={{ color: '#6e6e73', fontSize: '15px', lineHeight: 1.7, margin: '0 0 28px' }}>
                Dysponuję testem poziomującym – wypełnij go, a dopasuję szkolenie do Twojego poziomu.
              </p>
              <Link
                href="/kontakt"
                style={{ background: '#1e9953', color: 'white', textDecoration: 'none', padding: '13px 28px', borderRadius: '980px', fontSize: '14px', fontWeight: 600 }}
              >
                Skontaktuj się
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

export default function SzkoleniasPage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <Navbar />
      <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
        <SzkoleniasContent />
      </Suspense>
      <Footer />
    </main>
  );
}

function TrainingCardLocal({ training }: { training: Training }) {
  return (
    <Link href={`/szkolenia/${training.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <div
        style={{
          background: '#ffffff',
          border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: '20px',
          padding: '28px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          transition: 'all 0.25s',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(30,153,83,0.3)';
          e.currentTarget.style.boxShadow = '0 8px 28px rgba(30,153,83,0.10)';
          e.currentTarget.style.transform = 'translateY(-3px)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)';
          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        {/* Icon */}
        <div style={{ width: '44px', height: '44px', background: 'rgba(30,153,83,0.08)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1e9953' }}>
          {getCategoryIcon(training.category, 22)}
        </div>

        <div>
          <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#1e9953', marginBottom: '5px', fontWeight: 600 }}>{training.category}</div>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1d1d1f', margin: 0, lineHeight: 1.35 }}>{training.title}</h3>
        </div>

        <p style={{ color: '#6e6e73', fontSize: '13px', lineHeight: 1.65, margin: 0, flex: 1 }}>
          {training.description.substring(0, 90)}...
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid rgba(0,0,0,0.06)', marginTop: 'auto' }}>
          <div>
            <div style={{ fontSize: '10px', color: '#6e6e73', marginBottom: '2px' }}>{training.duration}</div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.3px' }}>{training.priceLabel}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#1e9953', fontSize: '13px', fontWeight: 500 }}>
            Szczegóły <IconArrowRight size={14} color="#1e9953" />
          </div>
        </div>
      </div>
    </Link>
  );
}
