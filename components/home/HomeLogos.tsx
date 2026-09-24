import { clients } from '@/data/clients';
import s from './home.module.css';
import type { Lang } from './lang';

const COPY = {
  pl: { label: 'Firmy, których zespoły szkoliłem' },
  en: { label: 'Companies whose teams I have trained' },
};

export default function HomeLogos({ lang = 'pl' }: { lang?: Lang }) {
  const t = COPY[lang];
  const doubled = [...clients, ...clients];

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
