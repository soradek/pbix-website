'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import s from '@/components/home/home.module.css';
import { RollingButton, RollingLink } from '@/components/home/RollingButton';

const COPY = {
  pl: {
    code: 'Błąd strony',
    title: 'Coś poszło nie tak.',
    lead: 'Ta część strony nie załadowała się poprawnie. Spróbuj ponownie. Jeśli problem wraca, napisz na kontakt@pbix.pl.',
    retry: 'Spróbuj ponownie',
    home: 'Strona główna',
    homeHref: '/',
  },
  en: {
    code: 'Page error',
    title: 'Something went wrong.',
    lead: 'This part of the page did not load correctly. Please try again. If the problem persists, write to kontakt@pbix.pl.',
    retry: 'Try again',
    home: 'Home page',
    homeHref: '/en',
  },
};

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = COPY[usePathname()?.startsWith('/en') ? 'en' : 'pl'];

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={s.page}>
      <section className={s.statusPage}>
        <div className={s.container}>
          <p className={`${s.mono} ${s.statusCode}`}>{t.code}</p>
          <h1 className={s.statusTitle}>{t.title}</h1>
          <p className={s.statusLead}>{t.lead}</p>
          <div className={s.actions}>
            <RollingButton onClick={reset} label={t.retry} variant="dark" />
            <RollingLink href={t.homeHref} label={t.home} variant="outline" arrow={false} />
          </div>
          {error.digest && <p className={`${s.mono} ${s.statusDigest}`}>ID: {error.digest}</p>}
        </div>
      </section>
    </main>
  );
}
