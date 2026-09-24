import Link from 'next/link';
import { trainings, type Training } from '@/data/trainings';
import { getTrainingEnContent } from '@/data/trainings-en';
import s from './home.module.css';
import AgentButton from './AgentButton';
import { FadeIn, SectionHead } from './motion';
import { ROUTES, type Lang } from './lang';

const CATEGORIES: { key: Training['category']; title: Record<Lang, string>; desc: Record<Lang, string> }[] = [
  {
    key: 'Power BI',
    title: { pl: 'Power BI', en: 'Power BI' },
    desc: {
      pl: 'Od modelu danych przez DAX po publikację w chmurze. Interaktywne raporty zamiast statycznych zestawień.',
      en: 'From the data model through DAX to publishing in the cloud. Interactive reports instead of static summaries.',
    },
  },
  {
    key: 'Excel',
    title: { pl: 'Excel', en: 'Excel' },
    desc: {
      pl: 'Od podstaw po VBA, Power Query i pracę z AI. Excel jako narzędzie analityczne, nie tylko arkusz.',
      en: 'From the basics to VBA, Power Query and working with AI. Excel as an analytical tool, not just a spreadsheet.',
    },
  },
  {
    key: 'SQL',
    title: { pl: 'SQL', en: 'SQL' },
    desc: {
      pl: 'Zapytania, które wyciągają z bazy dokładnie to, czego potrzebujesz. Bez doświadczenia programistycznego.',
      en: 'Queries that pull exactly what you need from the database. No programming experience required.',
    },
  },
  {
    key: 'Wizualizacja danych',
    title: { pl: 'Wizualizacja', en: 'Visualisation' },
    desc: {
      pl: 'Wykresy, dashboardy i prezentacje, które przekonują decydentów, a nie tylko ładnie wyglądają.',
      en: 'Charts, dashboards and presentations that convince decision-makers, not just look good.',
    },
  },
];

const COPY = {
  pl: {
    title: 'Czego uczę',
    sub: 'Czas trwania i zakres dopasowuję do zespołu. Wybierz najwygodniejszą formę: stacjonarnie u Was w firmie albo online.',
    all: 'Wszystkie z kategorii',
  },
  en: {
    title: 'What I teach',
    sub: 'I tailor the length and scope to your team. Choose the format that suits you best: on-site at your company or online.',
    all: 'All in this category',
  },
};

export default function HomeTrainings({ lang = 'pl' }: { lang?: Lang }) {
  const t = COPY[lang];
  const routes = ROUTES[lang];

  return (
    <section className={`${s.section} ${s.onInk}`}>
      <div className={s.container}>
        <SectionHead title={t.title} sub={t.sub} />

        <div className={s.trainGrid}>
          {CATEGORIES.map((cat, i) => {
            const items = trainings.filter(tr => tr.category === cat.key);
            return (
              <FadeIn as="article" key={cat.key} className={s.trainCard} delay={(i % 2) * 0.1}>
                <span className={`${s.mono} ${s.trainIndex}`}>
                  <b>{String(i + 1).padStart(2, '0')}</b> · {cat.title[lang]}
                </span>
                <h3 className={s.trainTitle}>{cat.title[lang]}</h3>
                <p className={s.trainDesc}>{cat.desc[lang]}</p>
                <ul className={s.trainList}>
                  {items.map(tr => (
                    <li key={tr.slug}>
                      <Link href={routes.training(tr.slug)}>
                        <span>{lang === 'en' ? getTrainingEnContent(tr.slug)?.title ?? tr.title : tr.title}</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className={s.trainMeta}>
                  <AgentButton href={routes.category(cat.key)} label={t.all} />
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
