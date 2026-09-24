'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import s from './home.module.css';
import { RollingLink } from './RollingButton';
import { ROUTES, type Lang } from './lang';

const COPY = {
  pl: {
    line1: 'Raporty, które',
    words: ['robisz raz.', 'odświeżają się same.', 'mówią same za siebie.'],
    intro: 'Szkolenia dla zespołów firmowych, stacjonarnie w całej Polsce i online. Po polsku i po angielsku.',
    primary: 'Zobacz szkolenia',
    secondary: 'Napisz do mnie',
    alt: 'Radosław Sobczak, certyfikowany trener Microsoft',
    tools: [
      { label: 'Power BI', href: ROUTES.pl.category('Power BI') },
      { label: 'Excel', href: ROUTES.pl.category('Excel') },
      { label: 'SQL', href: ROUTES.pl.category('SQL') },
      { label: 'VBA', href: ROUTES.pl.training('excel-vba') },
      { label: 'AI w Excelu', href: ROUTES.pl.training('excel-ai') },
      { label: 'Projekty', href: ROUTES.pl.projects },
    ],
  },
  en: {
    line1: 'Reports that',
    words: ['you build once.', 'refresh themselves.', 'speak for themselves.'],
    intro: 'Training for corporate teams, on-site across Poland and online. In English and Polish.',
    primary: 'Explore trainings',
    secondary: 'Get in touch',
    alt: 'Radosław Sobczak, Microsoft Certified Trainer',
    tools: [
      { label: 'Power BI', href: ROUTES.en.category('Power BI') },
      { label: 'Excel', href: ROUTES.en.category('Excel') },
      { label: 'SQL', href: ROUTES.en.category('SQL') },
      { label: 'VBA', href: ROUTES.en.training('excel-vba') },
      { label: 'AI in Excel', href: ROUTES.en.training('excel-ai') },
      { label: 'Projects', href: ROUTES.en.projects },
    ],
  },
};
const TYPE_MS = 55;
const DELETE_MS = 30;
const HOLD_MS = 2200;

function useTypewriter(words: string[]) {
  const [text, setText] = useState(words[0]);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setAnimate(true);
  }, []);

  useEffect(() => {
    if (!animate) return;
    let wordIndex = 0;
    let charIndex = words[0].length;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const word = words[wordIndex];
      if (deleting) {
        charIndex -= 1;
        setText(word.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
        timer = setTimeout(tick, DELETE_MS);
      } else {
        const next = words[wordIndex];
        charIndex += 1;
        setText(next.slice(0, charIndex));
        if (charIndex === next.length) {
          deleting = true;
          timer = setTimeout(tick, HOLD_MS);
        } else {
          timer = setTimeout(tick, TYPE_MS);
        }
      }
    };

    timer = setTimeout(tick, HOLD_MS);
    return () => clearTimeout(timer);
  }, [animate, words]);

  return text;
}

// Entrance runs in CSS (.enter / .splitWordIn) so the hero paints without waiting for hydration
function enter(delay: number, y = 24): { className: string; style: CSSProperties } {
  return { className: s.enter, style: { '--d': `${delay}s`, '--enter-y': `${y}px` } as CSSProperties };
}

export default function HomeHero({ lang = 'pl' }: { lang?: Lang }) {
  const t = COPY[lang];
  const routes = ROUTES[lang];
  const word = useTypewriter(t.words);
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);


  return (
    <section ref={ref} className={s.hero}>
      <motion.div className={s.heroGrid} style={reduced ? undefined : { y: gridY }} aria-hidden="true" />

      <motion.div className={s.heroPortrait} style={reduced ? undefined : { y: portraitY }}>
        <div
          className={`${s.heroPortraitInner} ${s.enter}`}
          style={{ '--d': '0.1s', '--enter-y': '80px' } as CSSProperties}
        >
          <Image
            src="/radek-cutout.png"
            alt={t.alt}
            fill
            priority
            quality={82}
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>
      </motion.div>

      <motion.div
        className={`${s.container} ${s.heroInner}`}
        style={reduced ? undefined : { y: copyY, opacity: copyOpacity }}
      >
        <div className={s.heroTop}>
          <ul className={`${s.heroTools} ${s.mono}`}>
            {t.tools.map((tool, i) => (
              <li key={tool.label} {...enter(i * 0.05, 10)}>
                <Link href={tool.href}>/ {tool.label}</Link>
              </li>
            ))}
          </ul>
          <p className={`${s.heroIntro} ${s.enter}`} style={enter(0.15, 12).style}>
            {t.intro}
          </p>
        </div>

        <div className={s.heroBottom}>
          <div className={s.heroCopy}>
            <h1 className={s.heroTitle} aria-label={`${t.line1} ${t.words[0]}`}>
              <span className={s.splitMask} aria-hidden="true">
                <span className={`${s.splitWord} ${s.splitWordIn}`} style={{ '--d': '0.2s' } as CSSProperties}>
                  {t.line1}
                </span>
              </span>
              <span className={`${s.heroWordLine} ${s.enter}`} style={enter(0.4, 30).style} aria-hidden="true">
                <span className={s.heroWord}>{word}</span>
                <span className={s.caret} />
              </span>
            </h1>
            <div className={`${s.actions} ${s.enter}`} style={enter(0.55, 16).style}>
              <RollingLink href={routes.trainings} label={t.primary} variant="dark" />
              <RollingLink href={routes.contact} label={t.secondary} variant="outline" arrow={false} />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
