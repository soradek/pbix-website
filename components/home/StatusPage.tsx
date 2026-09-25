import Link from 'next/link';
import s from './home.module.css';
import { RollingLink } from './RollingButton';
import { ROUTES, type Lang } from './lang';

const COPY = {
  pl: {
    code: 'Błąd 404',
    title: 'Tej strony tu nie ma.',
    lead: 'Adres mógł się zmienić albo zawiera literówkę. Poniżej najczęściej odwiedzane miejsca.',
    primary: 'Zobacz szkolenia',
    secondary: 'Strona główna',
    links: [
      { label: 'Szkolenia', href: '/szkolenia' },
      { label: 'Projekty', href: '/projekty' },
      { label: 'Blog', href: '/blog' },
      { label: 'Kontakt', href: '/kontakt' },
    ],
  },
  en: {
    code: 'Error 404',
    title: 'This page is not here.',
    lead: 'The address may have changed or contain a typo. Here are the most visited places.',
    primary: 'See trainings',
    secondary: 'Home page',
    links: [
      { label: 'Trainings', href: '/en/trainings' },
      { label: 'Projects', href: '/en/projects' },
      { label: 'Contact', href: '/en/contact' },
    ],
  },
};

export default function NotFoundView({ lang = 'pl' }: { lang?: Lang }) {
  const t = COPY[lang];
  return (
    <section className={s.statusPage}>
      <div className={`${s.container} ${s.statusGrid}`}>
        <div>
          <p className={`${s.mono} ${s.statusCode}`}>{t.code}</p>
          <h1 className={s.statusTitle}>{t.title}</h1>
          <p className={s.statusLead}>{t.lead}</p>
          <div className={s.actions}>
            <RollingLink href={ROUTES[lang].trainings} label={t.primary} variant="dark" />
            <RollingLink href={lang === 'en' ? '/en' : '/'} label={t.secondary} variant="outline" arrow={false} />
          </div>
        </div>
        <ul className={s.statusLinks}>
          {t.links.map(l => (
            <li key={l.href}>
              <Link href={l.href}>
                {l.label}
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
