'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import { trainings, Training } from '@/data/trainings';
import { getTrainingEnContent, enPriceLabel } from '@/data/trainings-en';
import { IconBarChart, IconExcel, IconDatabase, IconPieChart, IconArrowRight } from '@/components/Icons';

const categories = ['All', 'Power BI', 'Excel', 'SQL', 'Data Visualisation'] as const;
type Category = typeof categories[number];

const categoryMap: Record<string, string> = {
  'Data Visualisation': 'Wizualizacja danych',
  'All': 'Wszystkie',
};

const getCategoryIcon = (cat: string, size = 20) => {
  if (cat === 'Power BI') return <IconBarChart size={size} color="currentColor" />;
  if (cat === 'Excel') return <IconExcel size={size} color="currentColor" />;
  if (cat === 'SQL') return <IconDatabase size={size} color="currentColor" />;
  if (cat === 'Data Visualisation' || cat === 'Wizualizacja danych') return <IconPieChart size={size} color="currentColor" />;
  return null;
};

function getPlCategory(enCat: Category): string {
  return categoryMap[enCat] ?? enCat;
}

function TrainingsContent() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  useEffect(() => {
    const cat = searchParams.get('category');
    const matched = categories.find(c => c === cat || getPlCategory(c as Category) === cat);
    setActiveCategory(matched ?? 'All');
  }, [searchParams]);

  const plCategory = getPlCategory(activeCategory);
  const filtered = activeCategory === 'All'
    ? trainings
    : trainings.filter(t => t.category === plCategory);

  return (
    <>
      <section style={{ padding: '140px 24px 72px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: '#6e6e73', marginBottom: '16px' }}>Offer</div>
          <h1 style={{ fontSize: 'clamp(44px, 8vw, 76px)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-2.5px', lineHeight: 1.05, margin: '0 0 20px' }}>Trainings</h1>
          <p style={{ fontSize: '18px', color: '#6e6e73', lineHeight: 1.65, margin: 0, fontWeight: 400 }}>
            Specialised courses in Power BI, Excel, SQL and data visualisation.<br />
            Each training — 2 days of intensive, hands-on practice.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 24px 56px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '56px' }}>
            {categories.map(cat => {
              const active = activeCategory === cat;
              return (
                <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  background: active ? '#1e9953' : '#ffffff',
                  border: `1px solid ${active ? '#1e9953' : 'rgba(0,0,0,0.1)'}`,
                  color: active ? 'white' : '#6e6e73',
                  padding: '12px 20px', borderRadius: '980px', fontSize: '13px', fontWeight: 500,
                  cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit',
                  boxShadow: active ? '0 4px 12px rgba(30,153,83,0.25)' : 'none',
                }}>
                  {cat !== 'All' && <span style={{ display: 'flex', color: active ? 'rgba(255,255,255,0.85)' : '#6e6e73' }}>{getCategoryIcon(cat, 14)}</span>}
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="training-grid">
            {filtered.map(training => <TrainingCard key={training.slug} training={training} />)}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 24px 120px', background: '#f9f9f9' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <ScrollReveal>
            <div style={{ background: 'rgba(30,153,83,0.06)', border: '1px solid rgba(30,153,83,0.16)', borderRadius: '24px', padding: '56px 40px' }}>
              <h2 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, color: '#1d1d1f', margin: '0 0 14px', letterSpacing: '-0.5px' }}>
                Not sure which training to choose?
              </h2>
              <p style={{ color: '#6e6e73', fontSize: '15px', lineHeight: 1.7, margin: '0 0 28px' }}>
                I have a skills assessment test — fill it in and I will match the right training to your level.
              </p>
              <Link href="/en/contact" style={{ background: '#1e9953', color: 'white', textDecoration: 'none', padding: '13px 28px', borderRadius: '980px', fontSize: '14px', fontWeight: 600 }}>
                Get in touch
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

export default function TrainingsEnClient() {
  return (
    <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
      <TrainingsContent />
    </Suspense>
  );
}

function TrainingCard({ training }: { training: Training }) {
  const en = getTrainingEnContent(training.slug);
  const titleDisplay = en?.title ?? training.title;
  const descDisplay = en?.description ?? training.description;
  const categoryDisplay = training.category === 'Wizualizacja danych' ? 'Data Visualisation' : training.category;
  const durationDisplay = training.duration.replace('2 dni / 16 godzin', '2 days / 16 hours');
  const priceLabelDisplay = enPriceLabel(training.price);

  return (
    <Link href={`/en/trainings/${training.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <div style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '20px', padding: '28px', height: '100%', display: 'flex', flexDirection: 'column', gap: '14px', transition: 'all 0.25s', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(30,153,83,0.3)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(30,153,83,0.10)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
        <div style={{ width: '44px', height: '44px', background: 'rgba(30,153,83,0.08)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1e9953' }}>
          {getCategoryIcon(training.category, 22)}
        </div>
        <div>
          <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#1e9953', marginBottom: '5px', fontWeight: 600 }}>
            {categoryDisplay}
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1d1d1f', margin: 0, lineHeight: 1.35 }}>{titleDisplay}</h3>
        </div>
        <p style={{ color: '#6e6e73', fontSize: '13px', lineHeight: 1.65, margin: 0, flex: 1 }}>
          {descDisplay.substring(0, 90)}...
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid rgba(0,0,0,0.06)', marginTop: 'auto' }}>
          <div>
            <div style={{ fontSize: '10px', color: '#6e6e73', marginBottom: '2px' }}>{durationDisplay}</div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.3px' }}>{priceLabelDisplay}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#1e9953', fontSize: '13px', fontWeight: 500 }}>
            Details <IconArrowRight size={14} color="#1e9953" />
          </div>
        </div>
      </div>
    </Link>
  );
}
