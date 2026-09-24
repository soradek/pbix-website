'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import Link from 'next/link';
import { ThinkingOrb } from 'thinking-orbs';
import s from './home.module.css';
import { FadeIn, SplitHeading } from './motion';
import { ROUTES, type Lang } from './lang';

const AREA_DEFS = [
  { pl: 'Excel', en: 'Excel', category: 'Excel' },
  { pl: 'Tabele przestawne', en: 'Pivot tables', slug: 'excel-poziom-srednio-zaawansowany' },
  { pl: 'VBA', en: 'VBA', slug: 'excel-vba' },
  { pl: 'Power Query', en: 'Power Query', slug: 'excel-power-query' },
  { pl: 'Power BI', en: 'Power BI', slug: 'microsoft-power-bi' },
  { pl: 'Wizualizacja', en: 'Visualisation', category: 'Wizualizacja danych' },
  { pl: 'DAX', en: 'DAX', slug: 'microsoft-dax' },
  { pl: 'SQL', en: 'SQL', slug: 'microsoft-sql-server' },
] as const;

const COPY = {
  pl: {
    title: 'Cała droga danych, od pliku do decyzji',
    sub: 'Od importu i czyszczenia danych, przez model i obliczenia, po raport, który odświeża się jednym kliknięciem.',
    section: 'Obszary szkoleń',
    orb: 'Postęp: obszary szkoleń',
  },
  en: {
    title: 'The whole data journey, from file to decision',
    sub: 'From importing and cleaning data, through the model and calculations, to a report that refreshes with one click.',
    section: 'Training areas',
    orb: 'Progress: training areas',
  },
};

const RING_R = 46;
const RING_LEN = 2 * Math.PI * RING_R;
const FILL_END = 0.82;
const RX = 29;
const RY = 42;

export default function HomeOrbit({ lang = 'pl' }: { lang?: Lang }) {
  const t = COPY[lang];
  const AREAS = AREA_DEFS.map(a => ({
    label: a[lang],
    href: 'slug' in a ? ROUTES[lang].training(a.slug) : ROUTES[lang].category(a.category),
  }));
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  const [lit, setLit] = useState(reduced ? AREAS.length : 0);
  const [complete, setComplete] = useState(!!reduced);

  useMotionValueEvent(scrollYProgress, 'change', raw => {
    if (reduced) return;
    const p = Math.min(1, raw / FILL_END);
    setLit(Math.min(AREAS.length, Math.floor(p * AREAS.length + 0.5)));
    if (p >= 0.995) setComplete(true);
    else if (p < 0.9) setComplete(false);
  });

  const dashOffset = useTransform(scrollYProgress, [0, FILL_END], [RING_LEN, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-20, 70]);
  const cometOffset = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const cometOffsetOuter = useTransform(scrollYProgress, [0, 1], [30, 110]);
  const orbColor = useTransform(scrollYProgress, [0, FILL_END], ['rgb(160, 168, 164)', 'rgb(30, 153, 83)']);

  const current = lit > 0 ? AREAS[lit - 1].label : 'Start';

  return (
    <section
      ref={sectionRef}
      className={`${s.orbitSection} ${s.onWhite} ${reduced ? s.orbitStatic : ''}`}
      aria-label={t.section}
    >
      <div className={s.orbitSticky}>
        <div className={`${s.container} ${s.orbitHead}`}>
          <SplitHeading text={t.title} className={s.h2} />
          <FadeIn as="p" className={s.sub} delay={0.15} y={16}>
            {t.sub}
          </FadeIn>
        </div>

        <div className={s.orbitStage}>
          <motion.div
            className={s.orbitDeco}
            style={{ x: '-50%', y: '-50%', rotate: reduced ? 0 : rotate }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="31" className={s.orbitDecoRing} />
              <circle cx="50" cy="50" r="42" className={s.orbitDecoRing} />
              <circle cx="50" cy="50" r="49.5" className={s.orbitDecoRing} />
              <motion.circle
                cx="50"
                cy="50"
                r="31"
                pathLength={100}
                className={s.orbitComet}
                style={{ strokeDashoffset: reduced ? 0 : cometOffset }}
              />
              <motion.circle
                cx="50"
                cy="50"
                r="42"
                pathLength={100}
                className={s.orbitCometInk}
                style={{ strokeDashoffset: reduced ? 0 : cometOffsetOuter }}
              />
            </svg>
          </motion.div>

          <svg className={s.orbitSvg} viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r={RING_R} className={s.orbitTrack} />
            <motion.circle
              cx="50"
              cy="50"
              r={RING_R}
              className={`${s.orbitProgress} ${complete ? s.orbitProgressDone : ''}`}
              strokeDasharray={RING_LEN}
              style={{ strokeDashoffset: reduced ? 0 : dashOffset }}
              transform="rotate(-90 50 50)"
            />
          </svg>

          <div className={s.orbitCore}>
            <motion.div
              className={`${s.orbTint} ${complete ? s.orbFlash : ''}`}
              style={{ '--orb-color': reduced ? 'rgb(30, 153, 83)' : orbColor } as never}
            >
              <ThinkingOrb state="solving" size={64} theme="light" aria-label={t.orb} />
            </motion.div>
            <span className={`${s.orbGlow} ${complete ? s.orbGlowOn : ''}`} aria-hidden="true" />
            <p className={`${s.mono} ${s.orbitCounter}`}>
              <b>{String(lit).padStart(2, '0')}</b> / {AREAS.length}
            </p>
            <p className={s.orbitCurrent} aria-live="polite">{current}</p>
          </div>

          <ul className={s.orbitList}>
            {AREAS.map((area, i) => {
              const step = 360 / AREAS.length;
              const angle = ((-90 + step / 2 + i * step) * Math.PI) / 180;
              return (
                <li
                  key={area.label}
                  className={s.orbitItemWrap}
                  style={{ left: `${50 + RX * Math.cos(angle)}%`, top: `${50 + RY * Math.sin(angle)}%` }}
                >
                  <Link href={area.href} className={`${s.orbitItem} ${i < lit ? s.orbitItemOn : ''}`}>
                    {area.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
