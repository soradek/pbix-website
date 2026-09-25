import s from './home.module.css';
import { RollingLink } from './RollingButton';
import { FadeIn, SectionHead } from './motion';
import { ROUTES, type Lang } from './lang';

const COPY = {
  pl: {
    title: 'Gotowy program albo szyty na miarę',
    columns: [
      { title: 'Program z oferty', note: 'Standard' },
      { title: 'Szkolenie dedykowane', note: 'Opcja dodatkowa' },
    ],
    rows: [
      { label: 'Program', values: ['Sprawdzony program z oferty, dobrany do poziomu zespołu', 'Budowany pod konkretne potrzeby i cele zespołu'] },
      { label: 'Ćwiczenia', values: ['Rozwiązujemy najczęstsze problemy w pracy z danymi', 'Na Waszych plikach, raportach i zapytaniach'] },
      { label: 'Przygotowanie', values: ['Wybór szkolenia i poziomu, w razie potrzeby test poziomujący', 'Rozmowa o potrzebach i przegląd Waszych materiałów'] },
      { label: 'Czas i zakres', values: ['Zgodnie z programem szkolenia', 'Do ustalenia'] },
      { label: 'Kiedy wybrać', values: ['Zespół potrzebuje solidnych podstaw albo wejścia na wyższy poziom', 'Macie konkretne raporty lub procesy do usprawnienia'] },
    ],
    sharedLabel: 'W obu przypadkach',
    shared: ['Tylko Wasz zespół', 'Stacjonarnie u Was albo online', 'Po polsku lub po angielsku', 'Certyfikowany Trener Microsoft (MCT)', 'Certyfikat PL i EN'],
    programmes: 'Zobacz programy',
    contact: 'Napisz do mnie',
  },
  en: {
    title: 'A ready programme or a tailored one',
    columns: [
      { title: 'Standard programme', note: 'Standard' },
      { title: 'Bespoke training', note: 'Add-on option' },
    ],
    rows: [
      { label: 'Programme', values: ['A proven programme from the offer, matched to your team’s level', 'Built around your team’s specific needs and goals'] },
      { label: 'Exercises', values: ['We solve the most common problems in working with data', 'On your own files, reports and queries'] },
      { label: 'Preparation', values: ['Choosing the training and level, with a skills test if needed', 'A needs conversation and a review of your materials'] },
      { label: 'Length and scope', values: ['As set out in the training programme', 'To be agreed'] },
      { label: 'When to choose', values: ['Your team needs solid foundations or a step up to the next level', 'You have specific reports or processes to improve'] },
    ],
    sharedLabel: 'In both cases',
    shared: ['Your team only', 'On-site or online', 'In English or Polish', 'Microsoft Certified Trainer (MCT)', 'Certificate in EN and PL'],
    programmes: 'See programmes',
    contact: 'Get in touch',
  },
};

function Tick() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1e9953" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function HomeCompare({ lang = 'pl' }: { lang?: Lang }) {
  const t = COPY[lang];
  const routes = ROUTES[lang];

  return (
    <section className={`${s.section} ${s.onPaper}`}>
      <div className={s.container}>
        <SectionHead title={t.title} />

        <FadeIn className={s.compareCard}>
          <table className={s.compareTable}>
            <colgroup>
              <col className={s.compareColLabel} />
              <col />
              <col className={s.compareColPlus} />
            </colgroup>
            <thead>
              <tr>
                <td className={s.compareCorner} />
                {t.columns.map((col, i) => (
                  <th key={col.title} scope="col">
                    <span className={s.compareColTitle}>{col.title}</span>
                    <span className={`${s.compareColNote} ${i === 1 ? s.compareColNoteAccent : ''}`}>{col.note}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.rows.map((row, r) => (
                <tr key={row.label}>
                  <th scope="row">
                    <span className={s.compareRowNum} aria-hidden="true">{String(r + 1).padStart(2, '0')}</span>
                    {row.label}
                  </th>
                  {row.values.map((value, i) => (
                    <td key={i} data-label={t.columns[i].title}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className={s.compareShared}>
            <p className={s.compareSharedLabel}>{t.sharedLabel}</p>
            <ul>
              {t.shared.map(item => (
                <li key={item}><Tick />{item}</li>
              ))}
            </ul>
          </div>
        </FadeIn>

        <div className={s.compareCta}>
          <RollingLink href={routes.trainings} label={t.programmes} variant="dark" />
          <RollingLink href={routes.contact} label={t.contact} variant="outline" arrow={false} />
        </div>
      </div>
    </section>
  );
}
