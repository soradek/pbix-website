'use client';

import { useEffect, useRef, useState } from 'react';

// Power BI's embed is several MB of third-party JS plus cookies. Native lazy iframes
// start loading far outside the viewport, so we only mount it when the frame is close.
export default function ReportEmbed({ src, title, loadingLabel }: { src: string; title: string; loadingLabel: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: '300px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ position: 'absolute', inset: 0 }}>
      {show ? (
        <iframe title={title} src={src} allowFullScreen style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }} />
      ) : (
        <span
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            color: 'var(--muted-dark)',
            fontFamily: 'var(--font-geist-mono), ui-monospace, monospace',
            fontSize: 'var(--fs-label)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          {loadingLabel}
        </span>
      )}
    </div>
  );
}
