declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
    fbq: (...args: unknown[]) => void;
    lintrk: (event: string, data?: Record<string, unknown>) => void;
  }
}

export function gaEvent(action: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', action, params);
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
  gaEvent(name, params);
}

export function trackLead(source: string) {
  trackEvent('generate_lead', { lead_source: source });
  if (typeof window === 'undefined') return;
  if (typeof window.fbq === 'function') window.fbq('track', 'Lead');
  if (typeof window.lintrk === 'function') window.lintrk('track', { conversion_id: 'lead' });
}

export function trackContact() {
  trackEvent('contact');
}
