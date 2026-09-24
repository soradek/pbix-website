'use client';

import { useState, useEffect, type CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Training } from '@/data/trainings';
import { faqItems, faqItemsEn } from '@/data/faq';
import { getTrainingEnContent, enTierLabel } from '@/data/trainings-en';
import { toneFor } from '@/data/categoryColors';
import s from '@/components/home/home.module.css';
import { FadeIn, SectionHead, SplitHeading, EASE_EXPO } from '@/components/home/motion';
import { RollingLink } from '@/components/home/RollingButton';
import HomeFaq from '@/components/home/HomeFaq';
import HomeFinalCta from '@/components/home/HomeFinalCta';
import { ROUTES } from '@/components/home/lang';

const t = {
  pl: {
    duration: 'Czas trwania', price: 'Cena netto za grupę', upTo: 'do', people: 'osób',
    language: 'Język', contact: 'Napisz do mnie', programmeLink: 'Zobacz program',
    priceNote: 'Cena obejmuje szkolenie zamknięte, materiały szkoleniowe i certyfikaty dla wszystkich uczestników.',
    about: 'O szkoleniu', prerequisites: 'Wymagania wstępne',
    forWhom: 'Dla kogo', benefits: 'Co zyskasz',
    programme: 'Program szkolenia',
    whatYouGet: 'Co otrzymujesz',
    materials: 'Materiały', materialsDesc: 'Prezentacje i pliki ćwiczeń do zachowania.',
    workshops: 'Warsztaty', workshopsDesc: 'Praktyczne zadania na realnych danych.',
    certificate: 'Certyfikat', certificateDesc: 'W wersji polskiej i angielskiej, papierowy oraz cyfrowy.',
    consultations: 'Konsultacje', consultationsDesc: 'Pytania po szkoleniu na LinkedIn.',
    faq: 'Pytania o szkolenie',
  },
  en: {
    duration: 'Duration', price: 'Net price per group', upTo: 'up to', people: 'people',
    language: 'Language', contact: 'Get in touch', programmeLink: 'See the programme',
    priceNote: 'The price covers a closed training, training materials and certificates for all participants.',
    about: 'About the training', prerequisites: 'Prerequisites',
    forWhom: 'Who is this for', benefits: 'What you\'ll gain',
    programme: 'Training programme',
    whatYouGet: 'What you get',
    materials: 'Materials', materialsDesc: 'Presentations and exercise files to keep.',
    workshops: 'Workshops', workshopsDesc: 'Hands-on tasks using real business data.',
    certificate: 'Certificate', certificateDesc: 'In Polish and English, print and digital.',
    consultations: 'Consultations', consultationsDesc: 'Post-training questions via LinkedIn.',
    faq: 'Training FAQs',
  },
};

// Same subset of general questions as on the home page
const GLOBAL_FAQ_IDX = [0, 1, 2, 4, 5, 9, 10, 13];

// Video mapping: slug overrides category
const videoBySlug: Record<string, string> = {
  'excel-ai': '/BG-AI.webm',
};
const videoByCategory: Record<string, string> = {
  'Excel': '/BG-EX.webm',
  'Power BI': '/BG-BI.mp4',
  'SQL': '/BG-BI.mp4',
  'Wizualizacja danych': '/BG-Viz.mp4',
};

export default function TrainingPageClient({ training, lang = 'pl' }: { training: Training; lang?: 'pl' | 'en' }) {
  const tx = t[lang];
  const en = lang === 'en' ? getTrainingEnContent(training.slug) : undefined;
  const tone = toneFor(training.category);

  // EN content overrides, fall back to PL if EN not available
  const titleDisplay = en?.title ?? training.title;
  const descDisplay = en?.description ?? training.description;
  const prereqDisplay = en?.prerequisites ?? training.prerequisites;
  const audienceDisplay = en?.targetAudience ?? training.targetAudience;
  const benefitsDisplay = en?.benefits ?? training.benefits;
  const programDisplay = en?.program ?? training.program;
  const trainingFaqDisplay = en?.faq ?? training.faq ?? [];
  const globalFaq = (lang === 'en' ? faqItemsEn : faqItems);
  const faqDisplay = [
    ...trainingFaqDisplay,
    ...GLOBAL_FAQ_IDX.map(i => globalFaq[i]).filter(Boolean),
  ].filter((item, i, all) => all.findIndex(x => x.q === item.q) === i);

  const categoryDisplay =
    lang === 'en' && training.category === 'Wizualizacja danych'
      ? 'Data Visualisation'
      : training.category;
  const durationDisplay =
    lang === 'en'
      ? training.duration.replace('2 dni / 16 godzin', '2 days / 16 hours')
      : training.duration;
  const languageDisplay =
    lang === 'en' ? (en?.language ?? training.language) : training.language;

  const tiersDisplay = lang === 'en'
    ? training.pricingTiers.map(tier => ({ ...tier, priceLabel: enTierLabel(tier.price) }))
    : training.pricingTiers;

  const [openModule, setOpenModule] = useState<number | null>(0);
  // null until measured, so phones never start loading the hero video
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  const videoSrc = videoBySlug[training.slug] ?? videoByCategory[training.category] ?? null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsMobile(window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [training.slug]);

  const gets = [
    { title: tx.materials, desc: tx.materialsDesc },
    { title: tx.workshops, desc: tx.workshopsDesc },
    { title: tx.certificate, desc: tx.certificateDesc },
    { title: tx.consultations, desc: tx.consultationsDesc },
  ];

  return (
    <div className={s.page} style={{ '--tone-bg': tone.bg, '--tone-ink': tone.ink } as CSSProperties}>
      {/* Hero */}
      <section className={s.trainingHero}>
        {videoSrc && isMobile === false && (
          <>
            <video className={s.trainingHeroVideo} autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
              <source src={videoSrc} type={videoSrc.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
            </video>
            <div className={s.trainingHeroShade} />
          </>
        )}
        <div className={`${s.container} ${s.trainingHeroGrid}`}>
          <div>
            <p className={`${s.mono} ${s.trainingCat}`}>
              <span className={s.trainingSwatch} aria-hidden="true" />
              {categoryDisplay}
            </p>
            <SplitHeading as="h1" text={titleDisplay} className={s.trainingTitle} onMount />
            <FadeIn className={s.actions} delay={0.35} y={16}>
              <RollingLink href={ROUTES[lang].contact} label={tx.contact} variant="light" />
              <RollingLink href="#program" label={tx.programmeLink} variant="outlineDark" arrow={false} />
            </FadeIn>
          </div>

          <FadeIn className={s.trainingMeta} delay={0.25} y={16}>
            <dl className={s.metaList}>
              <div>
                <dt className={s.mono}>{tx.duration}</dt>
                <dd>{durationDisplay}</dd>
              </div>
              {training.language && (
                <div>
                  <dt className={s.mono}>{tx.language}</dt>
                  <dd>{languageDisplay}</dd>
                </div>
              )}
            </dl>
            <p className={`${s.mono} ${s.metaLabel}`}>{tx.price}</p>
            <dl className={s.metaList}>
              {tiersDisplay.map(tier => (
                <div key={tier.maxPeople}>
                  <dt>{tx.upTo} {tier.maxPeople} {tx.people}</dt>
                  <dd className={s.metaPrice}>{tier.priceLabel}</dd>
                </div>
              ))}
            </dl>
            <p className={s.metaNote}>{tx.priceNote}</p>
          </FadeIn>
        </div>
      </section>

      {/* About */}
      <section className={`${s.section} ${s.onWhite}`}>
        <div className={`${s.container} ${s.trainingAbout}`}>
          <div>
            <SplitHeading text={tx.about} className={s.h2} />
            <FadeIn as="p" className={s.trainingLead} delay={0.1} y={16}>{descDisplay}</FadeIn>
          </div>
          <FadeIn className={s.trainingAside} delay={0.2} y={16}>
            <p className={`${s.mono} ${s.metaLabelLight}`}>{tx.prerequisites}</p>
            <p className={s.trainingAsideText}>{prereqDisplay}</p>
          </FadeIn>
        </div>

        <div className={`${s.container} ${s.trainingLists}`}>
          {[{ title: tx.forWhom, items: audienceDisplay }, { title: tx.benefits, items: benefitsDisplay }].map((col, c) => (
            <FadeIn key={col.title} delay={c * 0.1}>
              <h2 className={s.trainingListTitle}>{col.title}</h2>
              <ul className={s.plusList}>
                {col.items.map(item => <li key={item}>{item}</li>)}
              </ul>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Program */}
      <section id="program" className={`${s.section} ${s.onPaper}`}>
        <div className={s.container}>
          <SectionHead title={tx.programme} />
          <ol className={s.moduleList}>
            {programDisplay.map((module, i) => {
              const open = openModule === i;
              return (
                <li key={module.title} className={s.module}>
                  <button
                    type="button"
                    className={s.moduleHead}
                    onClick={() => setOpenModule(open ? null : i)}
                    aria-expanded={open}
                  >
                    <span className={`${s.mono} ${s.moduleIndex}`}>{String(i + 1).padStart(2, '0')}</span>
                    <span className={s.moduleTitle}>{module.title}</span>
                    <span className={`${s.faqPlus} ${open ? s.faqPlusOpen : ''}`} aria-hidden="true" />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE_EXPO }}
                        style={{ overflow: 'hidden' }}
                      >
                        <ul className={s.moduleItems}>
                          {module.items.map(item => <li key={item}>{item}</li>)}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* What you get */}
      <section className={`${s.section} ${s.onWhite}`}>
        <div className={s.container}>
          <SectionHead title={tx.whatYouGet} />
          <ol className={s.getsGrid}>
            {gets.map((item, i) => (
              <FadeIn as="li" key={item.title} delay={i * 0.08}>
                <span className={`${s.mono} ${s.getsIndex}`}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className={s.getsTitle}>{item.title}</h3>
                <p className={s.getsDesc}>{item.desc}</p>
              </FadeIn>
            ))}
          </ol>
        </div>
      </section>

      <HomeFaq items={faqDisplay} lang={lang} title={tx.faq} />
      <HomeFinalCta lang={lang} />
    </div>
  );
}
