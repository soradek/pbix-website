'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Skip on touch devices
    if (!window.matchMedia('(pointer: fine)').matches) return;
    // Skip if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let posX = 0;
    let posY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let raf: number;
    let moving = false;
    let idleTimer: ReturnType<typeof setTimeout>;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!moving) {
        moving = true;
        raf = requestAnimationFrame(loop);
      }
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => { moving = false; }, 2000);

      const target = e.target as HTMLElement;
      const isMagnetic =
        target.matches('h1, h2, h3, h4, a, button') ||
        !!target.closest('h1, h2, h3, h4, a, button');

      if (isMagnetic) {
        cursor.classList.add('cursor-dot--active');
      } else {
        cursor.classList.remove('cursor-dot--active');
      }
    };

    const loop = () => {
      if (!moving) return;
      posX += (mouseX - posX) * 0.12;
      posY += (mouseY - posY) * 0.12;
      cursor.style.transform = `translate(${posX - cursor.offsetWidth / 2}px, ${posY - cursor.offsetHeight / 2}px)`;
      raf = requestAnimationFrame(loop);
    };

    const onMouseLeave = () => cursor.classList.add('cursor-dot--hidden');
    const onMouseEnter = () => cursor.classList.remove('cursor-dot--hidden');

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(raf);
      clearTimeout(idleTimer);
    };
  }, []);

  return <div ref={cursorRef} className="cursor-dot" />;
}
