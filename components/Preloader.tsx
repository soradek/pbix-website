'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ThinkingOrb } from 'thinking-orbs';
import s from './Preloader.module.css';

const MIN_VISIBLE_MS = 600;

export default function Preloader() {
  const isEn = usePathname()?.startsWith('/en');
  const [progress, setProgress] = useState(12);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const creep = setInterval(() => setProgress(p => (p < 88 ? p + (88 - p) * 0.12 : p)), 120);

    const finish = () => {
      const wait = Math.max(0, MIN_VISIBLE_MS - (performance.now() - start));
      setTimeout(() => {
        clearInterval(creep);
        setProgress(100);
        setTimeout(() => setLeaving(true), 250);
        setTimeout(() => setGone(true), 900);
      }, wait);
    };

    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish, { once: true });

    return () => {
      clearInterval(creep);
      window.removeEventListener('load', finish);
    };
  }, []);

  if (gone) return null;

  return (
    <div className={`${s.overlay} ${leaving ? s.leaving : ''}`} role="status" aria-live="polite">
      <div className={s.orb}>
        <ThinkingOrb state="connecting" size={64} theme="light" aria-hidden="true" />
      </div>
      <div className={s.bar} aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
      <p className={s.text}>{isEn ? 'Loading page' : 'Wczytywanie strony'}</p>
      <p className={s.percent} aria-hidden="true">{Math.round(progress)}%</p>
    </div>
  );
}
