'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import s from './home.module.css';
import { RollingLink } from './RollingButton';
import { SectionHead } from './motion';
import { ROUTES, type Lang } from './lang';

function Tick() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1e9953" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

const COPY = {
  pl: {
    title: 'Wybierz, jak ma wyglądać szkolenie',
    sub: 'Cena jest ustalana za grupę, nie za osobę. Każdy uczestnik dostaje certyfikat w wersji polskiej i angielskiej.',
    cta: 'Napisz do mnie',
    formats: [
      { title: 'Stacjonarnie u Was', desc: 'Zamknięte szkolenie w Waszej firmie, w dowolnym miejscu w Polsce.', items: ['Na Waszym sprzęcie lub moich laptopach', 'Projektor na życzenie', 'Grupa do 12 osób'] },
      { title: 'Program dedykowany', desc: 'Szkolenie zbudowane na Waszych raportach, plikach i konkretnych wyzwaniach.', items: ['Test poziomujący zespołu', 'Ćwiczenia na Waszych danych', 'Zakres i czas do ustalenia'] },
      { title: 'Online', desc: 'Na żywo przez Microsoft Teams lub Zoom, w tym samym warsztatowym formacie.', items: ['Praca na żywo, nie nagrania', 'Pytania w trakcie zajęć', 'Materiały i pliki warsztatowe'] },
      { title: 'Po angielsku', desc: 'Dla międzynarodowych zespołów i zagranicznych firm działających w Polsce.', items: ['Power BI, Excel i SQL', 'Stacjonarnie lub online', 'Grupa do 12 osób'] },
    ],
  },
  en: {
    title: 'Choose how the training should look',
    sub: 'Pricing is per group, not per person. Every participant receives a certificate in English and Polish.',
    cta: 'Get in touch',
    formats: [
      { title: 'On-site at your company', desc: 'A closed training at your company, anywhere in Poland.', items: ['On your equipment or my laptops', 'Projector on request', 'Groups of up to 12'] },
      { title: 'Bespoke programme', desc: 'Training built on your reports, files and specific challenges.', items: ['Team skills assessment', 'Exercises on your own data', 'Scope and length to be agreed'] },
      { title: 'Online', desc: 'Live via Microsoft Teams or Zoom, in the same hands-on workshop format.', items: ['Live sessions, not recordings', 'Questions during the session', 'Materials and workshop files'] },
      { title: 'In English', desc: 'For international teams and foreign companies operating in Poland.', items: ['Power BI, Excel and SQL', 'On-site or online', 'Groups of up to 12'] },
    ],
  },
};

const DEFAULT_ACTIVE = 1;

export default function HomeFormats({ lang = 'pl' }: { lang?: Lang }) {
  const t = COPY[lang];
  const [active, setActive] = useState(DEFAULT_ACTIVE);
  const [current, setCurrent] = useState(0);
  const [slider, setSlider] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  // On phones the grid becomes a swipe slider: plain light cards, dots track the snapped one
  const isSlider = () => {
    const el = gridRef.current;
    return !!el && el.scrollWidth > el.clientWidth + 1;
  };
  useEffect(() => {
    const sync = () => setSlider(isSlider());
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, []);
  const cardStep = (el: HTMLDivElement) => {
    const cards = el.children;
    return cards.length > 1 ? (cards[1] as HTMLElement).offsetLeft - (cards[0] as HTMLElement).offsetLeft : el.clientWidth;
  };
  const onScroll = () => {
    const el = gridRef.current;
    if (!el || !isSlider()) return;
    setCurrent(Math.min(t.formats.length - 1, Math.round(el.scrollLeft / cardStep(el))));
  };
  const goTo = (i: number) => {
    const el = gridRef.current;
    if (el) el.scrollTo({ left: i * cardStep(el), behavior: 'smooth' });
  };

  return (
    <section className={`${s.section} ${s.onPaper}`}>
      <div className={s.container}>
        <SectionHead
          title={t.title}
          sub={t.sub}
        />

        <div
          ref={gridRef}
          className={s.formatGrid}
          onScroll={onScroll}
          onMouseLeave={() => { if (!isSlider()) setActive(DEFAULT_ACTIVE); }}
        >
          {t.formats.map((f, i) => {
            const isActive = !slider && i === active;
            return (
              <article
                key={f.title}
                className={`${s.formatCard} ${isActive ? s.formatActive : ''}`}
                onMouseEnter={() => { if (!isSlider()) setActive(i); }}
                onFocus={() => setActive(i)}
              >
                <motion.span
                  className={s.formatHighlight}
                  initial={false}
                  animate={{
                    clipPath: isActive
                      ? 'inset(0% 0% 0% 0%)'
                      : active > i
                        ? 'inset(0% 0% 0% 100%)'
                        : 'inset(0% 100% 0% 0%)',
                  }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  aria-hidden="true"
                />
                <div className={s.formatBody}>
                  <h3 className={s.formatTitle}>{f.title}</h3>
                  <p className={s.formatDesc}>{f.desc}</p>
                  <RollingLink href={ROUTES[lang].contact} label={t.cta} variant={isActive ? 'light' : 'dark'} arrow={false} fullWidth />
                  <ul className={s.formatList}>
                    {f.items.map(item => (
                      <li key={item}><Tick />{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
        <div className={s.formatDots} aria-hidden="true">
          {t.formats.map((f, i) => (
            <button
              key={f.title}
              type="button"
              tabIndex={-1}
              className={`${s.formatDot} ${i === current ? s.formatDotOn : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
