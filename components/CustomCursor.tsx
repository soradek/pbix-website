'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    let posX = 0;
    let posY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let raf: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

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
      posX += (mouseX - posX) * 0.12;
      posY += (mouseY - posY) * 0.12;
      cursor.style.transform = `translate(${posX - cursor.offsetWidth / 2}px, ${posY - cursor.offsetHeight / 2}px)`;
      raf = requestAnimationFrame(loop);
    };

    const onMouseLeave = () => cursor.classList.add('cursor-dot--hidden');
    const onMouseEnter = () => cursor.classList.remove('cursor-dot--hidden');

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    loop();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={cursorRef} className="cursor-dot" />;
}
