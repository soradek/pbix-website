'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import s from './home.module.css';
import type { Lang } from './lang';

const EASE = [0.16, 1, 0.3, 1] as const;

function useOnce() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  return { ref, play: inView || !!reduced, instant: !!reduced };
}

export function VisualBrief({ lang = 'pl' }: { lang?: Lang }) {
  const { ref, play, instant } = useOnce();
  const rows = lang === 'en'
    ? ['Team level', 'Tools in use', 'Sample files', 'Training goal']
    : ['Poziom zespołu', 'Narzędzia w firmie', 'Przykładowe pliki', 'Cel szkolenia'];
  return (
    <div ref={ref} className={s.miniCard}>
      <p className={s.miniCardTitle}>{lang === 'en' ? 'Training enquiry' : 'Zapytanie o szkolenie'}</p>
      {rows.map((label, i) => (
        <div key={label} className={s.miniRow}>
          <span className={s.miniCheck}>
            <motion.span
              className={s.miniCheckFill}
              initial={{ scale: 0, opacity: 0 }}
              animate={play ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: instant ? 0 : 0.35, delay: instant ? 0 : 0.3 + i * 0.5, ease: EASE }}
            />
          </span>
          <motion.span
            initial={{ opacity: 0.45 }}
            animate={play ? { opacity: 1 } : {}}
            transition={{ duration: instant ? 0 : 0.3, delay: instant ? 0 : 0.3 + i * 0.5 }}
          >
            {label}
          </motion.span>
        </div>
      ))}
    </div>
  );
}

export function VisualProgram({ lang = 'pl' }: { lang?: Lang }) {
  const { ref, play, instant } = useOnce();
  const days = [
    lang === 'en'
      ? { day: 'Day 1', pills: ['Power Query', 'Data model', 'Relationships'] }
      : { day: 'Dzień 1', pills: ['Power Query', 'Model danych', 'Relacje'] },
    lang === 'en'
      ? { day: 'Day 2', pills: ['DAX', 'Visuals', 'Your report'] }
      : { day: 'Dzień 2', pills: ['DAX', 'Wizualizacje', 'Wasz raport'] },
  ];
  let order = 0;
  return (
    <div ref={ref} className={s.miniDays}>
      {days.map(d => (
        <div key={d.day} className={s.miniDay}>
          <span className={s.mono}>{d.day}</span>
          {d.pills.map(p => {
            const idx = order++;
            const last = p === 'Wasz raport' || p === 'Your report';
            return (
              <motion.div
                key={p}
                className={`${s.miniPill} ${last ? s.miniPillAccent : ''}`}
                initial={{ opacity: 0, y: 8 }}
                animate={play ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: instant ? 0 : 0.45, delay: instant ? 0 : 0.25 + idx * 0.28, ease: EASE }}
              >
                {p}
              </motion.div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export function VisualReport({ lang = 'pl' }: { lang?: Lang }) {
  const { ref, play, instant } = useOnce();
  const rows: [string, string, number][] = [
    [lang === 'en' ? 'North region' : 'Region Północ', lang === 'en' ? '412,300' : '412 300', 82],
    [lang === 'en' ? 'South region' : 'Region Południe', lang === 'en' ? '356,900' : '356 900', 71],
    [lang === 'en' ? 'West region' : 'Region Zachód', lang === 'en' ? '298,450' : '298 450', 59],
    [lang === 'en' ? 'East region' : 'Region Wschód', lang === 'en' ? '241,800' : '241 800', 48],
  ];
  return (
    <div ref={ref} className={s.miniSheet}>
      <div className={s.miniSheetBar}>
        <span>{lang === 'en' ? 'Sales_report.xlsx' : 'Raport_sprzedaz.xlsx'}</span>
        <motion.span
          className={s.miniRefresh}
          initial={{ scale: 1 }}
          animate={play && !instant ? { scale: [1, 0.86, 1.06, 1], boxShadow: ['0 0 0 0 rgba(30,153,83,0.5)', '0 0 0 0 rgba(30,153,83,0.5)', '0 0 0 8px rgba(30,153,83,0)', '0 0 0 0 rgba(30,153,83,0)'] } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        >
          {lang === 'en' ? 'Refresh' : 'Odśwież'}
        </motion.span>
      </div>
      <div className={s.miniSheetRows}>
        {rows.map(([name, value, pct], i) => (
          <motion.div
            key={name}
            className={s.miniSheetRow}
            initial={{ opacity: 0.35 }}
            animate={play ? { opacity: 1 } : {}}
            transition={{ duration: instant ? 0 : 0.3, delay: instant ? 0 : 0.4 + i * 0.25 }}
          >
            <span>{name}</span>
            <span>{value}</span>
            <span className={s.miniBar}>
              <motion.i
                initial={{ width: 0 }}
                animate={play ? { width: `${pct}%` } : {}}
                transition={{ duration: instant ? 0 : 0.7, delay: instant ? 0 : 0.4 + i * 0.25, ease: EASE }}
              />
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
