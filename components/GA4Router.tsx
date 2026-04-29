'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useConsent } from '@/lib/consent';

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function GA4Router() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const consent = useConsent();
  const didMount = useRef(false);

  useEffect(() => {
    if (!GA_ID || typeof window === 'undefined' || typeof window.gtag !== 'function') return;
    if (consent?.analytics !== true) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    if (!didMount.current) {
      didMount.current = true;
      window.gtag('event', 'page_view', { page_path: url });
      return;
    }

    window.gtag('event', 'page_view', { page_path: url });
  }, [pathname, searchParams, consent]);

  return null;
}
