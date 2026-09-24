'use client';

import { useState, useEffect, Suspense, type CSSProperties } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useReducedMotion } from 'framer-motion';
import { trainings, Training } from '@/data/trainings';
import { getTrainingEnContent, enPriceLabel } from '@/data/trainings-en';
import CategoryCurtain, { CATEGORY_COLORS, curtainAlreadyShown, markCurtainShown } from '@/components/CategoryCurtain';
import s from '@/components/home/home.module.css';
import PageHero from '@/components/home/PageHero';
import HomeFinalCta from '@/components/home/HomeFinalCta';
import { FadeIn } from '@/components/home/motion';
import type { Lang } from '@/components/home/lang';

const categories = ['Wszystkie', 'Power BI', 'Excel', 'SQL', 'Wizualizacja danych'] as const;
const VALID_CATEGORIES: string[] = ['Power BI', 'Excel', 'SQL', 'Wizualizacja danych'];

const EN_LABELS: Record<string, string> = {
  Wszystkie: 'All',
  'Wizualizacja danych': 'Data Visualisation',
};

const COPY = {
  pl: {
    base: '/szkolenia',
    param: 'kategoria',
    title: 'Szkolenia',
    lead: 'Specjalistyczne kursy z Power BI, Excela, SQL i wizualizacji danych. Czas trwania i zakres dopasowuję do zespołu.',
    details: 'Szczegóły',
    allCurtain: 'Wszystkie szkolenia',
  },
  en: {
    base: '/en/trainings',
    param: 'category',
    title: 'Trainings',
    lead: 'Specialised courses in Power BI, Excel, SQL and data visualisation. I tailor the duration and scope to your team.',
    details: 'Details',
    allCurtain: 'All trainings',
  },
};

function label(cat: string, lang: Lang) {
  return lang === 'en' ? EN_LABELS[cat] ?? cat : cat;
}

// Accepts both the PL key and the EN label, so shared links work on either site
function parseCategory(raw: string | null): string {
  if (!raw) return 'Wszystkie';
  if (VALID_CATEGORIES.includes(raw)) return raw;
  const fromEn = Object.keys(EN_LABELS).find(k => EN_LABELS[k] === raw);
  return fromEn && fromEn !== 'Wszystkie' ? fromEn : 'Wszystkie';
}

const filterBy = (cat: string) => (cat === 'Wszystkie' ? trainings : trainings.filter(t => t.category === cat));

interface Props {
  initialCategory?: string;
  initialTrainings?: Training[];
  lang?: Lang;
}

function SzkoleniasContent({ initialCategory = 'Wszystkie', initialTrainings = trainings, lang = 'pl' }: Props) {
  const t = COPY[lang];
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [filtered, setFiltered] = useState(initialTrainings);

  useEffect(() => {
    const cat = parseCategory(searchParams.get(t.param) ?? searchParams.get('kategoria'));
    setActiveCategory(cat);
    setFiltered(filterBy(cat));
  }, [searchParams, t.param]);

  const reduced = useReducedMotion();
  const [curtain, setCurtain] = useState<{ cat: string; phase: 'cover' | 'reveal' } | null>(null);

  function applyCategory(cat: string) {
    setActiveCategory(cat);
    setFiltered(filterBy(cat));
    const params = new URLSearchParams();
    if (cat !== 'Wszystkie') params.set(t.param, label(cat, lang));
    router.replace(`${t.base}${params.size ? `?${params}` : ''}`, { scroll: false });
  }

  function handleCategory(cat: string) {
    if (cat === activeCategory || curtain) return;
    if (reduced || curtainAlreadyShown(cat)) {
      applyCategory(cat);
      return;
    }
    markCurtainShown(cat);
    setCurtain({ cat, phase: 'cover' });
  }

  return (
    <>
      {curtain && (
        <CategoryCurtain
          label={curtain.cat}
          text={curtain.cat === 'Wszystkie' ? t.allCurtain : label(curtain.cat, lang)}
          phase={curtain.phase}
          onCovered={() => {
            applyCategory(curtain.cat);
            setCurtain({ cat: curtain.cat, phase: 'reveal' });
          }}
          onDone={() => setCurtain(null)}
        />
      )}

      <PageHero title={t.title} lead={t.lead} />

      <section className={`${s.onWhite} ${s.trainingsSection}`}>
        <div className={s.container}>
          <div className={s.catFilters} role="group">
            {categories.map(cat => {
              const tone = CATEGORY_COLORS[cat];
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategory(cat)}
                  aria-pressed={activeCategory === cat}
                  className="cat-btn"
                  style={{ '--tone-bg': tone.bg, '--tone-fg': tone.fg } as CSSProperties}
                >
                  {label(cat, lang)}
                </button>
              );
            })}
          </div>

          <ul className={s.trainingGrid}>
            {filtered.map((training, i) => (
              <FadeIn as="li" key={training.slug} delay={(i % 3) * 0.05} y={20}>
                <TrainingCard training={training} lang={lang} />
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      <HomeFinalCta lang={lang} />
    </>
  );
}

export default function SzkoleniasClient(props: Props) {
  return (
    <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
      <SzkoleniasContent {...props} />
    </Suspense>
  );
}

function TrainingCard({ training, lang }: { training: Training; lang: Lang }) {
  const tone = CATEGORY_COLORS[training.category] ?? CATEGORY_COLORS.Wszystkie;
  const en = lang === 'en' ? getTrainingEnContent(training.slug) : undefined;
  const title = en?.title ?? training.title;
  const desc = en?.description ?? training.description;
  const duration = lang === 'en' ? training.duration.replace('2 dni / 16 godzin', '2 days / 16 hours') : training.duration;
  const price = lang === 'en' ? enPriceLabel(training.price) : training.priceLabel;
  const href = lang === 'en' ? `/en/trainings/${training.slug}` : `/szkolenia/${training.slug}`;

  return (
    <Link
      href={href}
      className={s.trainingCard}
      style={{ '--tone-bg': tone.bg, '--tone-ink': tone.ink } as CSSProperties}
    >
      <p className={`${s.mono} ${s.blogCat}`}>{label(training.category, lang)}</p>
      <h2 className={s.relatedTitle}>{title}</h2>
      <p className={s.blogExcerpt}>{desc.substring(0, 110).trim()}…</p>
      <div className={s.trainingCardFoot}>
        <div>
          <p className={`${s.mono} ${s.trainingCardDuration}`}>{duration}</p>
          <p className={s.trainingCardPrice}>{price}</p>
        </div>
        <span className={`${s.mono} ${s.relatedMore}`}>{COPY[lang].details} →</span>
      </div>
    </Link>
  );
}
