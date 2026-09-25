import { clients as allClients, type Client } from '@/data/clients';
import s from './home.module.css';
import type { Lang } from './lang';

const COPY = {
  pl: { label: 'Firmy, których zespoły szkoliłem' },
  en: { label: 'Companies whose teams I have trained' },
};

// Short lists are repeated so one copy of the marquee is wider than the viewport
const MIN_PER_COPY = 16;

export default function HomeLogos({ lang = 'pl', items, label }: { lang?: Lang; items?: Client[]; label?: string }) {
  const t = { ...COPY[lang], ...(label ? { label } : {}) };
  const clients = items ?? allClients;
  const copy = Array.from({ length: Math.ceil(MIN_PER_COPY / clients.length) }, () => clients).flat();
  const doubled = [...copy, ...copy];

  return (
    <section className={s.logos} aria-label={t.label}>
      <p className={`${s.mono} ${s.logosLabel}`}>{t.label}</p>
      <div className={s.logosViewport}>
        <div className={s.logosTrack}>
          {doubled.map((client, i) => (
            <img
              key={`${client.slug}-${i}`}
              src={`/logos/${client.slug}.png`}
              alt={i < clients.length ? client.name : ''}
              aria-hidden={i >= clients.length}
              style={{ height: `${client.cssHeight}px` }}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
