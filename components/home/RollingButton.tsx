import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import s from './home.module.css';

type Variant = 'dark' | 'light' | 'outline' | 'outlineDark';

interface BaseProps {
  label: string;
  variant?: Variant;
  arrow?: boolean;
  fullWidth?: boolean;
  small?: boolean;
  className?: string;
}

const VARIANT: Record<Variant, string> = {
  dark: s.btnDark,
  light: s.btnLight,
  outline: s.btnOutline,
  outlineDark: s.btnGhostDark,
};

function RollingLabel({ label }: { label: string }) {
  return (
    <span className={s.roll} aria-hidden="true">
      {Array.from(label).map((ch, i) => (
        <span key={i} className={s.rollChar} style={{ '--i': i } as CSSProperties}>
          <span className={s.rollInner}>{ch === ' ' ? ' ' : ch}</span>
        </span>
      ))}
    </span>
  );
}

function content(label: string, arrow?: boolean): ReactNode {
  return (
    <>
      <RollingLabel label={label} />
      {arrow && <span className={s.rollArrow} aria-hidden="true">→</span>}
    </>
  );
}

export function RollingLink({ href, label, variant = 'dark', arrow = true, fullWidth, small, className }: BaseProps & { href: string }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={`${s.btn} ${s.rollBtn} ${VARIANT[variant]} ${fullWidth ? s.btnFull : ''} ${small ? s.btnSmall : ''} ${className ?? ''}`}
    >
      {content(label, arrow)}
    </Link>
  );
}

export function RollingButton({ onClick, label, variant = 'dark', arrow = true, fullWidth, className }: BaseProps & { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`${s.btn} ${s.rollBtn} ${VARIANT[variant]} ${fullWidth ? s.btnFull : ''} ${className ?? ''}`}
    >
      {content(label, arrow)}
    </button>
  );
}
