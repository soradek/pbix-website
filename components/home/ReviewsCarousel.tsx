'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { Testimonial } from '@/data/testimonials';
import s from './home.module.css';
import type { Lang } from './lang';

const AUTOPLAY_MS = 10_000;

export default function ReviewsCarousel({ items, lang = 'pl' }: { items: Testimonial[]; lang?: Lang }) {
  const en = lang === 'en';
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [pages, setPages] = useState(items.length);
  const [paused, setPaused] = useState(false);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[0] as HTMLElement | undefined;
    if (!card) return;
    const step = card.offsetWidth + parseFloat(getComputedStyle(track).columnGap || '0');
    const visible = Math.max(1, Math.round((track.clientWidth + 1) / step));
    setPages(Math.max(1, items.length - visible + 1));
  }, [items.length]);

  const goTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[i] as HTMLElement | undefined;
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const card = track.children[0] as HTMLElement | undefined;
      if (!card) return;
      const step = card.offsetWidth + parseFloat(getComputedStyle(track).columnGap || '0');
      setIndex(Math.round(track.scrollLeft / step));
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setTimeout(() => goTo(index + 1 >= pages ? 0 : index + 1), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [index, pages, paused, goTo]);

  return (
    <div
      className={s.reviewsCarousel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div ref={trackRef} className={s.reviewsTrack} aria-label={en ? 'Participant reviews' : 'Opinie uczestników'} role="region">
        {items.map(t => (
          <figure key={t.name} className={s.reviewCard}>
            <span className={`${s.mono} ${s.reviewCompany}`}>{t.company}</span>
            <blockquote className={s.reviewQuote}>{en ? <>“{t.textEn}”</> : <>„{t.text}”</>}</blockquote>
            <figcaption className={s.reviewPerson}>
              <span className={s.reviewAvatar}>
                {t.avatar && <Image src={t.avatar} alt="" fill sizes="40px" style={{ objectFit: 'cover' }} />}
              </span>
              <span>
                <span className={s.reviewName}>{t.name}</span>
                <span className={s.reviewRole}>{en ? t.roleEn : t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className={s.dots} role="tablist" aria-label={en ? 'Choose a review' : 'Wybierz opinię'}>
        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={en ? `Review ${i + 1} of ${pages}` : `Opinia ${i + 1} z ${pages}`}
            className={`${s.dot} ${i === index ? s.dotActive : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
