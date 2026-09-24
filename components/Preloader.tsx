'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ThinkingOrb } from 'thinking-orbs';
import s from './Preloader.module.css';

// The overlay fades out on a pure CSS timeline (see Preloader.module.css), so it never
// waits for hydration or window.load. JS only removes it from the DOM afterwards and
// shortens the intro delay for entrance animations on later client navigations.
const REMOVE_AFTER_MS = 1700;

export default function Preloader() {
  const isEn = usePathname()?.startsWith('/en');
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setGone(true);
      document.documentElement.style.setProperty('--intro', '0.15s');
    }, REMOVE_AFTER_MS);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  return (
    <div className={s.overlay} role="status" aria-live="polite">
      <div className={s.orb}>
        <ThinkingOrb state="connecting" size={64} theme="light" aria-hidden="true" />
      </div>
      <div className={s.bar} aria-hidden="true">
        <span />
      </div>
      <p className={s.text}>{isEn ? 'Loading page' : 'Wczytywanie strony'}</p>
    </div>
  );
}
