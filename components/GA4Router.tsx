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
    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
    if (!GA_ID || typeof gtag !== 'function') return;
    if (consent?.analytics !== true) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    if (!didMount.current) {
      didMount.current = true;
      gtag('event', 'page_view', { page_path: url });
      return;
    }

    gtag('event', 'page_view', { page_path: url });
  }, [pathname, searchParams, consent]);

  return null;
}
