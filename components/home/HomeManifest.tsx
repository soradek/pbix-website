'use client';

import { useEffect, useRef, useState } from 'react';
import s from './home.module.css';
import type { Lang } from './lang';

const COPY = {
  pl: {
    paragraphs: [
      'Formułę można przepisywać co miesiąc, a raport sklejać ręcznie w każdy poniedziałek. Można też co miesiąc przeklejać wykresy z Excela do PowerPointa.',
      'Można też raz zbudować rozwiązanie, które później działa samo i wykonuje pracę za Ciebie.',
    ],
    motto: 'Robisz raz. Używasz cały czas.',
    foot: 'Na tej zasadzie opieram każde szkolenie.',
  },
  en: {
    paragraphs: [
      'You can rewrite the same formula every month and stitch the report together by hand every Monday. You can also copy charts from Excel into PowerPoint every month.',
      'Or you can build the solution once, so it runs on its own and does the work for you.',
    ],
    motto: 'Build it once. Use it every day.',
    foot: 'Every training I run is built on this principle.',
  },
};

export default function HomeManifest({ lang = 'pl' }: { lang?: Lang }) {
  const t = COPY[lang];
  const WORDS = t.paragraphs.map(p => p.split(' '));
  const TOTAL = WORDS.reduce((n, w) => n + w.length, 0);
  const ref = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLit(TOTAL);
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.3;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end + rect.height * 0.6)));
      setLit(Math.round(progress * TOTAL));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [TOTAL]);

  let index = 0;

  return (
    <section className={`${s.section} ${s.onInk}`}>
      <div className={s.container}>
        <div ref={ref}>
          {WORDS.map((words, p) => (
            <p key={p} className={`${s.manifestText} ${p > 0 ? s.manifestSecond : ''}`}>
              {words.map(w => {
                const i = index++;
                return (
                  <span key={i} className={`${s.word} ${i < lit ? s.wordLit : ''} ${p > 0 && i < lit ? s.wordAccent : ''}`}>
                    {w}{' '}
                  </span>
                );
              })}
            </p>
          ))}
        </div>
        <div className={s.manifestFoot}>
          <span className={s.manifestMotto}>{t.motto}</span>
          <span>{t.foot}</span>
        </div>
      </div>
    </section>
  );
}
