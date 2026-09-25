'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import s from './home.module.css';
import type { Lang } from './lang';

const TARGET = 4.92;

export default function ScoreCounter({ lang = 'pl' }: { lang?: Lang }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(TARGET);
      setDone(true);
      return;
    }
    const controls = animate(0, TARGET, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setValue,
      onComplete: () => setDone(true),
    });
    return () => controls.stop();
  }, [inView]);

  const pct = (value / 5) * 100;

  return (
    <div ref={ref}>
      <div className={s.scoreValue}>
        {/* Static value in the server HTML; the animated counter below starts at 0 */}
        <span className={s.srOnly}>{lang === 'en' ? 'Average rating 4.92/5' : 'Średnia ocena 4,92/5'}</span>
        <span aria-hidden="true">{lang === 'en' ? value.toFixed(2) : value.toFixed(2).replace('.', ',')}</span>
        <small aria-hidden="true">/5</small>
      </div>
      <div className={s.scoreTrack} aria-hidden="true">
        <span className={`${s.scoreFill} ${done ? s.scoreFillDone : ''}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
