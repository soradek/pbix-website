'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const copy = {
  pl: {
    byline: 'Radosław Sobczak · Certyfikowany Trener Microsoft (MCT)',
    line1: 'Robisz raz.',
    line2: 'Używasz cały czas.',
    lead: 'Szkolenia z Power BI, Excela, SQL i VBA dla zespołów firmowych. Każdy blok ma ten sam rytm: cel, przykład, zadanie. Uczestnicy wychodzą z plikami, których użyją następnego dnia.',
    primary: 'Poznaj szkolenia',
    primaryHref: '/szkolenia',
    secondary: 'Napisz do mnie',
    secondaryHref: '/kontakt',
  },
  en: {
    byline: 'Radosław Sobczak · Microsoft Certified Trainer (MCT)',
    line1: 'Build it once.',
    line2: 'Use it every day.',
    lead: 'Power BI, Excel, SQL and VBA training for corporate teams. Every block follows the same rhythm: goal, example, exercise. Participants leave with files they will use the next morning.',
    primary: 'Explore trainings',
    primaryHref: '/en/trainings',
    secondary: 'Get in touch',
    secondaryHref: '/en/contact',
  },
};

export default function HeroSection({ lang = 'pl' }: { lang?: 'pl' | 'en' }) {
  const t = copy[lang];

  return (
    <section className="hero-section hero-portrait-section">
      <div className="hero-photo">
        <Image
          src="/tlo.jpg"
          alt=""
          fill
          priority
          quality={82}
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: '65% center' }}
        />
      </div>

      <div className="hero-inner">
        <motion.p
          className="hero-byline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        >
          {t.byline}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05, ease: EASE_OUT_EXPO }}
          className="hero-title"
        >
          {t.line1}
          <br />
          <span className="hero-title-accent">{t.line2}</span>
        </motion.h1>

        <motion.p
          className="hero-lead"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE_OUT_EXPO }}
        >
          {t.lead}
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE_OUT_EXPO }}
        >
          <Link href={t.primaryHref} className="hero-btn-primary">
            {t.primary}
          </Link>
          <Link href={t.secondaryHref} className="hero-btn-secondary">
            {t.secondary} <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
