'use client';

import { Fragment, useRef, type CSSProperties, type ReactNode } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import s from './home.module.css';

export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

type HeadingTag = 'h1' | 'h2' | 'h3' | 'p';

interface SplitHeadingProps {
  as?: HeadingTag;
  text: string;
  className?: string;
  accentFrom?: number;
  accentClassName?: string;
  delay?: number;
  onMount?: boolean;
}

export function SplitHeading({
  as = 'h2',
  text,
  className,
  accentFrom,
  accentClassName,
  delay = 0,
  onMount = false,
}: SplitHeadingProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as];
  const words = text.split(' ');

  // Above-the-fold headings animate in CSS so they paint without waiting for hydration (LCP)
  if (onMount) {
    const Plain = as;
    return (
      <Plain className={className} aria-label={text}>
        {words.map((word, i) => (
          <Fragment key={i}>
            <span className={s.splitMask} aria-hidden="true">
              <span
                className={`${s.splitWord} ${s.splitWordIn} ${accentFrom !== undefined && i >= accentFrom ? accentClassName ?? '' : ''}`}
                style={{ '--d': `${delay + i * 0.045}s` } as CSSProperties}
              >
                {word}
              </span>
            </span>
            {i < words.length - 1 ? ' ' : null}
          </Fragment>
        ))}
      </Plain>
    );
  }

  const trigger = onMount
    ? { initial: 'hidden', animate: 'shown' }
    : { initial: 'hidden', whileInView: 'shown', viewport: { once: true, amount: 0.6 } };

  return (
    <Tag className={className} aria-label={text} {...(reduced ? {} : trigger)}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className={s.splitMask} aria-hidden="true">
            <motion.span
              className={`${s.splitWord} ${accentFrom !== undefined && i >= accentFrom ? accentClassName ?? '' : ''}`}
              variants={{
                hidden: { y: '105%' },
                shown: { y: '0%', transition: { duration: 0.9, ease: EASE_EXPO, delay: delay + i * 0.045 } },
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  );
}

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: 'div' | 'p' | 'li' | 'article';
  /** Animate from first paint in CSS (for above-the-fold content) instead of on scroll */
  onMount?: boolean;
}

export function FadeIn({ children, className, delay = 0, y = 28, as = 'div', onMount = false }: FadeInProps) {
  const reduced = useReducedMotion();
  if (onMount) {
    const Plain = as;
    return (
      <Plain
        className={`${className ?? ''} ${s.enter}`}
        style={{ '--d': `${delay}s`, '--enter-y': `${y}px` } as CSSProperties}
      >
        {children}
      </Plain>
    );
  }
  const Tag = motion[as];
  if (reduced) return <Tag className={className}>{children}</Tag>;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: EASE_EXPO, delay }}
    >
      {children}
    </Tag>
  );
}

export function RevealImage({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <div ref={ref} className={className}>
      <motion.div
        className={s.revealInner}
        initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
        animate={inView ? { clipPath: 'inset(0% 0% 0% 0%)' } : undefined}
        transition={{ duration: 1.2, ease: EASE_EXPO }}
      >
        <motion.div
          className={s.revealInner}
          style={{ y }}
          initial={{ scale: 1.18 }}
          animate={inView ? { scale: 1.08 } : undefined}
          transition={{ duration: 1.6, ease: EASE_EXPO }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

export function SectionHead({ title, sub, center = false }: { title: string; sub?: string; center?: boolean }) {
  return (
    <div className={center ? s.headCenter : s.head}>
      <SplitHeading text={title} className={s.h2} />
      {sub && (
        <FadeIn as="p" className={s.sub} delay={0.15} y={16}>
          {sub}
        </FadeIn>
      )}
    </div>
  );
}
