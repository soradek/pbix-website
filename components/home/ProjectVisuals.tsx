'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import s from './home.module.css';
import { EASE_EXPO } from './motion';
import type { Lang } from './lang';

// Palette mirrors :root tokens (SVG presentation attributes can't read CSS vars reliably)
const C = {
  panel: '#141816',
  tile: '#1c211e',
  line: 'rgba(238,241,239,0.12)',
  dim: 'rgba(238,241,239,0.5)',
  paper: '#eef1ef',
  accent: '#1e9953',
  bright: '#2fbf6d',
  yellow: '#F2C811',
};
const MONO = { fontFamily: 'var(--font-geist-mono), ui-monospace, monospace' };

const L = {
  pl: {
    sales: 'Sprzedaż · wszystkie regiony', live: 'na żywo', revenue: 'Przychód', margin: 'Marża', orders: 'Zamówienia',
    trend: 'Trend tygodniowy', byRegion: 'Wg regionu',
    report: 'Raport Power BI', nightly: 'odświeżanie co noc', before: 'Przed', now: 'Teraz', days14: '14 dni', days2: '2 dni',
    stores: '200+ sklepów', region: 'Region', only: 'widzi tylko swoje dane', regions: ['Północ', 'Wschód', 'Południe', 'Zachód'],
    files: ['sprzedaz_Q1_FINAL.xlsx', 'dane_marzec (2).xlsx', 'SharePoint › Raporty', 'raport_zarzad_v3.pdf'],
    oneLink: 'Jeden link dla wszystkich', always: 'zawsze aktualne dane',
  },
  en: {
    sales: 'Sales · all regions', live: 'live', revenue: 'Revenue', margin: 'Margin', orders: 'Orders',
    trend: 'Weekly trend', byRegion: 'By region',
    report: 'Power BI report', nightly: 'refreshed nightly', before: 'Before', now: 'Now', days14: '14 days', days2: '2 days',
    stores: '200+ stores', region: 'Region', only: 'sees only its own data', regions: ['North', 'East', 'South', 'West'],
    files: ['sales_Q1_FINAL.xlsx', 'data_march (2).xlsx', 'SharePoint › Reports', 'board_report_v3.pdf'],
    oneLink: 'One link for everyone', always: 'always up-to-date data',
  },
};

function useStage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduced = useReducedMotion();
  return { ref, on: inView || !!reduced, reduced: !!reduced };
}

function Frame({ children, stageRef }: { children: ReactNode; stageRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div ref={stageRef} className={s.projectVisual}>
      {children}
    </div>
  );
}

function Count({ on, to, delay = 0, format }: { on: boolean; to: number; delay?: number; format: (v: number) => string }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!on) return;
    const c = animate(0, to, { duration: 1.8, ease: EASE_EXPO, delay, onUpdate: setV });
    return () => c.stop();
  }, [on, to, delay]);
  return <>{format(v)}</>;
}

const KPI_FORMAT = {
  pl: [
    (v: number) => `${v.toFixed(1).replace('.', ',')} mln zł`,
    (v: number) => `${v.toFixed(1).replace('.', ',')}%`,
    (v: number) => Math.round(v).toLocaleString('pl-PL'),
  ],
  en: [
    (v: number) => `PLN ${v.toFixed(1)}M`,
    (v: number) => `${v.toFixed(1)}%`,
    (v: number) => Math.round(v).toLocaleString('en-US'),
  ],
};
const KPI_VALUES = [2.4, 32.8, 12480];

const draw = (on: boolean, delay = 0, duration = 1.4) => ({
  initial: { pathLength: 0 },
  animate: on ? { pathLength: 1 } : { pathLength: 0 },
  transition: { duration, ease: EASE_EXPO, delay },
});

/* 01 · Sales dashboard ------------------------------------------------------ */
function VisualSales({ lang }: { lang: Lang }) {
  const t = L[lang];
  const { ref, on } = useStage();
  const bars = [0.55, 0.8, 0.45, 0.95, 0.7, 0.6];
  const kpis = [
    { label: t.revenue, spark: 'M0 18 L22.4 14 L44.9 16 L67.3 9 L89.8 11 L112.2 4' },
    { label: t.margin, spark: 'M0 12 L22.4 13 L44.9 8 L67.3 10 L89.8 6 L112.2 7' },
    { label: t.orders, spark: 'M0 16 L22.4 10 L44.9 12 L67.3 6 L89.8 8 L112.2 2' },
  ];
  return (
    <Frame stageRef={ref}>
      <svg viewBox="0 0 480 346" role="img" aria-label={t.sales}>
        <text x="20" y="30" fill={C.dim} fontSize="10" style={MONO} letterSpacing="1">{t.sales.toUpperCase()}</text>
        <motion.circle cx="410" cy="26" r="3.5" fill={C.bright}
          animate={on ? { opacity: [1, 0.25, 1] } : {}} transition={{ duration: 1.6, repeat: Infinity }} />
        <text x="420" y="30" fill={C.bright} fontSize="10" style={MONO}>{t.live.toUpperCase()}</text>

        {kpis.map((k, i) => (
          <g key={k.label} transform={`translate(${20 + i * 150} 48)`}>
            <rect width="140" height="86" rx="10" fill={C.tile} />
            <text x="14" y="24" fill={C.dim} fontSize="10" style={MONO}>{k.label.toUpperCase()}</text>
            <text x="14" y="52" fill={i === 0 ? C.yellow : C.paper} fontSize="20" fontWeight="500"
              style={{ fontVariantNumeric: 'tabular-nums' }}>
              <Count on={on} to={KPI_VALUES[i]} delay={0.2 + i * 0.12} format={KPI_FORMAT[lang][i]} />
            </text>
            <g transform="translate(14 60)">
              <motion.path d={k.spark} fill="none" stroke={C.bright} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
                {...draw(on, 0.4 + i * 0.1, 1.1)} />
            </g>
          </g>
        ))}

        <g transform="translate(20 148)">
          <rect width="290" height="178" rx="10" fill={C.tile} />
          <text x="14" y="24" fill={C.dim} fontSize="10" style={MONO}>{t.trend.toUpperCase()}</text>
          {[60, 100, 140].map(y => <line key={y} x1="14" x2="276" y1={y} y2={y} stroke={C.line} />)}
          <motion.path d="M14 150 C50 140 60 118 92 122 S140 90 170 98 S220 60 246 58 L276 44 L276 160 L14 160 Z"
            fill={C.accent} initial={{ opacity: 0 }} animate={{ opacity: on ? 0.18 : 0 }} transition={{ duration: 1.2, delay: 0.9 }} />
          <motion.path d="M14 150 C50 140 60 118 92 122 S140 90 170 98 S220 60 246 58 L276 44"
            fill="none" stroke={C.bright} strokeWidth="2.5" strokeLinecap="round" {...draw(on, 0.3, 1.6)} />
          <motion.circle cx="276" cy="44" r="5" fill={C.yellow}
            initial={{ scale: 0 }} animate={{ scale: on ? 1 : 0 }} transition={{ delay: 1.7, duration: 0.4 }} />
        </g>

        <g transform="translate(320 148)">
          <rect width="140" height="178" rx="10" fill={C.tile} />
          <text x="14" y="24" fill={C.dim} fontSize="10" style={MONO}>{t.byRegion.toUpperCase()}</text>
          {bars.map((b, i) => (
            <motion.rect key={i} x={16 + i * 19} width="12" rx="3"
              fill={i === 3 ? C.yellow : C.paper} fillOpacity={i === 3 ? 1 : 0.8}
              initial={{ height: 0, y: 160 }}
              animate={on ? { height: b * 110, y: 160 - b * 110 } : { height: 0, y: 160 }}
              transition={{ duration: 1, ease: EASE_EXPO, delay: 0.5 + i * 0.07 }} />
          ))}
        </g>
      </svg>
    </Frame>
  );
}

/* 02 · Month-end close: sources → report, 14 → 2 days ---------------------- */
function VisualClose({ lang }: { lang: Lang }) {
  const t = L[lang];
  const { ref, on, reduced } = useStage();
  const sources = ['SAP', 'Excel', 'SQL Server'];
  return (
    <Frame stageRef={ref}>
      <svg viewBox="0 0 480 330" role="img" aria-label={`SAP, Excel, SQL Server → ${t.report}`}>
        {sources.map((src, i) => {
          const y = 34 + i * 62;
          return (
            <g key={src}>
              <motion.g initial={{ opacity: 0, x: -12 }} animate={on ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, ease: EASE_EXPO, delay: i * 0.12 }}>
                <rect x="20" y={y} width="120" height="44" rx="10" fill={C.tile} stroke={C.line} />
                <text x="80" y={y + 27} textAnchor="middle" fill={C.paper} fontSize="13" fontWeight="500">{src}</text>
              </motion.g>
              <path d={`M140 ${y + 22} C 210 ${y + 22}, 220 128, 290 128`} fill="none" stroke={C.line} strokeWidth="2" />
              <motion.path d={`M140 ${y + 22} C 210 ${y + 22}, 220 128, 290 128`} fill="none" stroke={C.bright}
                strokeWidth="2" strokeDasharray="6 10" strokeLinecap="round"
                initial={{ strokeDashoffset: 0, opacity: 0 }}
                animate={on ? { strokeDashoffset: reduced ? 0 : -64, opacity: 1 } : {}}
                transition={{ strokeDashoffset: { duration: 1.4, repeat: Infinity, ease: 'linear' }, opacity: { delay: 0.4 + i * 0.1 } }} />
            </g>
          );
        })}

        <motion.g initial={{ opacity: 0, scale: 0.92 }} animate={on ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: EASE_EXPO, delay: 0.5 }} style={{ transformOrigin: '375px 128px' }}>
          <rect x="290" y="70" width="170" height="116" rx="12" fill={C.paper} />
          <rect x="304" y="84" width="54" height="8" rx="4" fill={C.yellow} />
          <text x="304" y="112" fill={C.panel} fontSize="13" fontWeight="500">{t.report}</text>
          {[0, 1, 2, 3, 4].map(i => (
            <rect key={i} x={306 + i * 26} y={168 - [22, 34, 28, 44, 38][i]} width="16" height={[22, 34, 28, 44, 38][i]} rx="3"
              fill={i === 3 ? C.accent : '#141816'} fillOpacity={i === 3 ? 1 : 0.2} />
          ))}
        </motion.g>
        <text x="375" y="206" textAnchor="middle" fill={C.dim} fontSize="10" style={MONO}>{t.nightly.toUpperCase()}</text>

        <g transform="translate(20 240)">
          <text x="0" y="12" fill={C.dim} fontSize="10" style={MONO}>{t.before.toUpperCase()}</text>
          <rect x="70" y="2" width="300" height="12" rx="6" fill={C.tile} />
          <motion.rect x="70" y="2" height="12" rx="6" fill={C.paper} fillOpacity="0.35"
            initial={{ width: 0 }} animate={{ width: on ? 300 : 0 }} transition={{ duration: 1.2, ease: EASE_EXPO, delay: 0.8 }} />
          <text x="440" y="12" textAnchor="end" fill={C.paper} fontSize="11" style={MONO}>{t.days14}</text>

          <text x="0" y="52" fill={C.dim} fontSize="10" style={MONO}>{t.now.toUpperCase()}</text>
          <rect x="70" y="42" width="300" height="12" rx="6" fill={C.tile} />
          <motion.rect x="70" y="42" height="12" rx="6" fill={C.bright}
            initial={{ width: 0 }} animate={{ width: on ? 43 : 0 }} transition={{ duration: 1, ease: EASE_EXPO, delay: 1.3 }} />
          <text x="440" y="52" textAnchor="end" fill={C.bright} fontSize="11" style={MONO}>{t.days2}</text>
        </g>
      </svg>
    </Frame>
  );
}

/* 03 · HR analytics: 200 stores, row-level security by region -------------- */
function VisualHR({ lang }: { lang: Lang }) {
  const t = L[lang];
  const { ref, on, reduced } = useStage();
  const [region, setRegion] = useState(0);

  useEffect(() => {
    if (!on || reduced) return;
    const id = setInterval(() => setRegion(r => (r + 1) % 4), 2200);
    return () => clearInterval(id);
  }, [on, reduced]);

  const COLS = 20, ROWS = 10, GAP = 20;
  return (
    <Frame stageRef={ref}>
      <svg viewBox="0 0 480 330" role="img" aria-label={`${t.stores}: ${t.region} ${t.only}`}>
        <text x="20" y="30" fill={C.dim} fontSize="10" style={MONO}>{t.stores.toUpperCase()}</text>
        {t.regions.map((r, i) => (
          <text key={r} x={50 + i * 100 + 40} y="58" textAnchor="middle" fontSize="10" style={MONO}
            fill={i === region ? C.bright : C.dim}>{r.toUpperCase()}</text>
        ))}
        <g transform="translate(50 76)">
          {Array.from({ length: COLS * ROWS }, (_, n) => {
            const col = n % COLS, row = Math.floor(n / COLS);
            const reg = Math.floor(col / 5);
            const active = reg === region;
            return (
              <motion.circle key={n} cx={col * GAP + (reg * 0)} cy={row * GAP} r="4.5"
                initial={{ scale: 0, opacity: 0 }}
                animate={on ? { scale: 1, opacity: active ? 1 : 0.18 } : {}}
                fill={active ? C.bright : C.paper}
                transition={{ scale: { delay: (col + row) * 0.015, duration: 0.4 }, opacity: { duration: 0.5 } }} />
            );
          })}
        </g>
        <motion.g key={region} initial={{ opacity: 0, y: 8 }} animate={on ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE_EXPO }}>
          <rect x="20" y="276" width="440" height="36" rx="10" fill={C.tile} stroke={C.line} />
          <g transform="translate(38 285)" stroke={C.yellow} strokeWidth="1.6" fill="none">
            <rect x="0" y="7" width="13" height="10" rx="2" />
            <path d="M3 7 V4.5 a3.5 3.5 0 0 1 7 0 V7" />
          </g>
          <text x="62" y="299" fill={C.paper} fontSize="12">
            <tspan fontWeight="600">{t.region} {t.regions[region]}</tspan>
            <tspan fill={C.dim}> · {t.only}</tspan>
          </text>
        </motion.g>
      </svg>
    </Frame>
  );
}

const FILE_TYPES = {
  xlsx: { color: '#217346', letter: 'X' },
  sharepoint: { color: '#038387', letter: 'S' },
  pdf: { color: '#D93025', letter: 'PDF' },
} as const;
const fileType = (f: string): keyof typeof FILE_TYPES =>
  f.endsWith('.xlsx') ? 'xlsx' : f.endsWith('.pdf') ? 'pdf' : 'sharepoint';

/* 04 · Finance: file chaos → one link ------------------------------------- */
function VisualFinance({ lang }: { lang: Lang }) {
  const t = L[lang];
  const { ref, on } = useStage();
  return (
    <Frame stageRef={ref}>
      <svg viewBox="0 0 480 330" role="img" aria-label={t.oneLink}>
        {t.files.map((f, i) => {
          const rot = [-8, 5, -3, 9][i];
          const x = [24, 60, 32, 80][i];
          const y = [40, 92, 150, 205][i];
          return (
            <motion.g key={f}
              initial={{ opacity: 0, x: x - 20, y, rotate: rot }}
              animate={on ? { opacity: [0, 1, 1, 0.22], x: [x - 20, x, x, x + 24], y, rotate: [rot, rot, rot, 0] } : {}}
              transition={{ duration: 2.6, times: [0, 0.2, 0.6, 1], delay: i * 0.12, ease: EASE_EXPO }}>
              <rect width="188" height="42" rx="8" fill={C.tile} stroke={C.line} />
              <rect x="12" y="11" width="16" height="20" rx="2" fill={FILE_TYPES[fileType(f)].color} />
              <text x="20" y="25" textAnchor="middle" fill="#fbfcfb" fontSize="7" fontWeight="700">{FILE_TYPES[fileType(f)].letter}</text>
              <text x="38" y="26" fill={C.paper} fontSize="11" style={MONO}>{f}</text>
            </motion.g>
          );
        })}

        <motion.path d="M268 165 L300 165" stroke={C.dim} strokeWidth="1.6" strokeLinecap="round" fill="none"
          {...draw(on, 1.5, 0.5)} />
        <motion.path d="M294 159 L300 165 L294 171" stroke={C.dim} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"
          {...draw(on, 1.8, 0.3)} />

        <motion.g initial={{ opacity: 0, x: 20 }} animate={on ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE_EXPO, delay: 1.7 }}>
          <rect x="310" y="92" width="150" height="146" rx="12" fill={C.paper} />
          <rect x="324" y="106" width="122" height="24" rx="12" fill="#141816" fillOpacity="0.08" />
          <circle cx="338" cy="118" r="4" fill={C.accent} />
          <text x="348" y="122" fill={C.panel} fontSize="10" style={MONO}>app.powerbi.com</text>
          <path d="M326 212 L350 190 L372 198 L398 168 L444 150" fill="none" stroke={C.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="324" y="144" width="40" height="7" rx="3.5" fill={C.yellow} />
        </motion.g>
        <motion.text x="385" y="262" textAnchor="middle" fill={C.paper} fontSize="12" fontWeight="500"
          initial={{ opacity: 0 }} animate={{ opacity: on ? 1 : 0 }} transition={{ delay: 2.1 }}>{t.oneLink}</motion.text>
        <motion.text x="385" y="280" textAnchor="middle" fill={C.bright} fontSize="10" style={MONO}
          initial={{ opacity: 0 }} animate={{ opacity: on ? 1 : 0 }} transition={{ delay: 2.2 }}>{t.always.toUpperCase()}</motion.text>
      </svg>
    </Frame>
  );
}

const VISUALS = [VisualSales, VisualClose, VisualHR, VisualFinance];

export default function ProjectVisual({ index, lang = 'pl' }: { index: number; lang?: Lang }) {
  const V = VISUALS[index % VISUALS.length];
  return <V lang={lang} />;
}
