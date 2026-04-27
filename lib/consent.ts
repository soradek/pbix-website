'use client';

import { useEffect, useState } from 'react';

export interface ConsentState {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

const STORAGE_KEY = 'pbix_consent_v1';
const EVENT_NAME = 'pbix:consent-changed';

export function getStoredConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (typeof parsed?.timestamp !== 'number') return null;
    return parsed;
  } catch {
    return null;
  }
}

export function setConsent(partial: { analytics: boolean; marketing: boolean }) {
  if (typeof window === 'undefined') return;
  const next: ConsentState = {
    necessary: true,
    analytics: partial.analytics,
    marketing: partial.marketing,
    timestamp: Date.now(),
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: next }));
}

export function clearConsent() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: null }));
}

export function useConsent(): ConsentState | null {
  const [consent, setLocal] = useState<ConsentState | null>(null);

  useEffect(() => {
    setLocal(getStoredConsent());
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<ConsentState | null>).detail;
      setLocal(detail ?? null);
    };
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  }, []);

  return consent;
}
