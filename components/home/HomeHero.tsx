'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform, type MotionProps } from 'framer-motion';
import s from './home.module.css';
import { RollingLink } from './RollingButton';
import { EASE_EXPO } from './motion';
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

const INTRO_DELAY = 0.55;

function enter(delay: number, y = 24): MotionProps {
  return {
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: EASE_EXPO, delay: INTRO_DELAY + delay },
  };
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

  const m = (props: MotionProps): MotionProps => (reduced ? {} : props);

  return (
    <section ref={ref} className={s.hero}>
      <motion.div className={s.heroGrid} style={reduced ? undefined : { y: gridY }} aria-hidden="true" />

      <motion.div className={s.heroPortrait} style={reduced ? undefined : { y: portraitY }}>
        <motion.div
          className={s.heroPortraitInner}
          {...m({
            initial: { opacity: 0, y: 80 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 1.4, ease: EASE_EXPO, delay: INTRO_DELAY + 0.1 },
          })}
        >
          <Image
            src="/radek-cutout.png"
            alt={t.alt}
            fill
            priority
            quality={82}
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className={`${s.container} ${s.heroInner}`}
        style={reduced ? undefined : { y: copyY, opacity: copyOpacity }}
      >
        <div className={s.heroTop}>
          <ul className={`${s.heroTools} ${s.mono}`}>
            {t.tools.map((tool, i) => (
              <motion.li key={tool.label} {...m(enter(i * 0.05, 10))}>
                <Link href={tool.href}>/ {tool.label}</Link>
              </motion.li>
            ))}
          </ul>
          <motion.p className={s.heroIntro} {...m(enter(0.15, 12))}>
            {t.intro}
          </motion.p>
        </div>

        <div className={s.heroBottom}>
          <div className={s.heroCopy}>
            <h1 className={s.heroTitle} aria-label={`${t.line1} ${t.words[0]}`}>
              <span className={s.splitMask} aria-hidden="true">
                <motion.span
                  className={s.splitWord}
                  {...m({
                    initial: { y: '105%' },
                    animate: { y: '0%' },
                    transition: { duration: 1.1, ease: EASE_EXPO, delay: INTRO_DELAY + 0.2 },
                  })}
                >
                  {t.line1}
                </motion.span>
              </span>
              <motion.span className={s.heroWordLine} aria-hidden="true" {...m(enter(0.4, 30))}>
                <span className={s.heroWord}>{word}</span>
                <span className={s.caret} />
              </motion.span>
            </h1>
            <motion.div className={s.actions} {...m(enter(0.55, 16))}>
              <RollingLink href={routes.trainings} label={t.primary} variant="dark" />
              <RollingLink href={routes.contact} label={t.secondary} variant="outline" arrow={false} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
