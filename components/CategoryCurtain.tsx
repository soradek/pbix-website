'use client';

import { motion } from 'framer-motion';
import { CATEGORY_COLORS } from '@/data/categoryColors';

export { CATEGORY_COLORS };

// One slanted rhombus sweeping right → left. Width is 2.4× the viewport so the
// shape fully covers the screen while x is between -80vw and -60vw.
const WIDTH_VW = 240;
const COVER_X = '-70vw';
const PHASE_S = 0.525;
const EASE = [0.76, 0, 0.24, 1] as const;


const SESSION_KEY = 'pbix-category-curtain-shown';

function shownCategories(): string[] {
  try {
    const value = JSON.parse(sessionStorage.getItem(SESSION_KEY) ?? '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export function curtainAlreadyShown(category: string): boolean {
  return shownCategories().includes(category);
}

export function markCurtainShown(category: string) {
  try {
    const shown = shownCategories();
    if (!shown.includes(category)) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify([...shown, category]));
    }
  } catch {}
}

interface Props {
  label: string;
  text?: string;
  phase: 'cover' | 'reveal';
  onCovered: () => void;
  onDone: () => void;
}

export default function CategoryCurtain({ label, text: textOverride, phase, onCovered, onDone }: Props) {
  const { bg, fg } = CATEGORY_COLORS[label] ?? CATEGORY_COLORS.Wszystkie;
  const text = textOverride ?? (label === 'Wszystkie' ? 'Wszystkie szkolenia' : label);

  return (
    <div
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 120, overflow: 'hidden', pointerEvents: 'none' }}
    >
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: `${WIDTH_VW}vw`,
          background: bg,
          clipPath: 'polygon(25% 0, 100% 0, 75% 100%, 0 100%)',
          willChange: 'transform',
        }}
        initial={{ x: '100vw' }}
        animate={{ x: phase === 'cover' ? COVER_X : `-${WIDTH_VW}vw` }}
        transition={{ duration: PHASE_S, ease: EASE }}
        onAnimationComplete={() => (phase === 'cover' ? onCovered() : onDone())}
      >
        <span
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            color: fg,
            fontSize: 'var(--fs-display)',
            fontWeight: 500,
            letterSpacing: 'var(--ls-display)',
            lineHeight: 'var(--lh-display)',
            whiteSpace: 'nowrap',
          }}
        >
          {text}
        </span>
      </motion.div>
    </div>
  );
}
