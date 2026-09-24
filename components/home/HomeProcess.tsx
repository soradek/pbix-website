import s from './home.module.css';
import { VisualBrief, VisualProgram, VisualReport } from './ProcessVisuals';
import { FadeIn, SectionHead } from './motion';
import type { Lang } from './lang';

const COPY = {
  pl: {
    title: 'Od zapytania do szkolenia',
    sub: 'Trzy kroki, zawsze w tej kolejności.',
    step: 'Krok',
    steps: [
      {
        title: 'Wysyłasz zapytanie',
        text: 'Napisz do mnie lub wypełnij formularz. Opiszę, które szkolenie najlepiej odpowiada potrzebom zespołu, a w razie wątpliwości sprawdzimy poziom testem.',
      },
      {
        title: 'Ustalamy program i zakres',
        text: 'Dopasowuję program do Waszej firmy i grupy. Decydujemy o formie, terminie i miejscu. Jeśli chcecie, ćwiczymy na Waszych plikach.',
      },
      {
        title: 'Realizujemy szkolenie',
        text: 'Intensywne warsztaty pełne ćwiczeń. Zespół wychodzi z rozwiązaniami, które działają od następnego dnia.',
      },
    ],
  },
  en: {
    title: 'From enquiry to training',
    sub: 'Three steps, always in this order.',
    step: 'Step',
    steps: [
      {
        title: 'You send an enquiry',
        text: 'Write to me or fill in the form. I will suggest the training that best fits your team, and if in doubt we check the level with a test.',
      },
      {
        title: 'We agree on programme and scope',
        text: 'I tailor the programme to your company and group. We decide on format, dates and location. If you like, we practise on your own files.',
      },
      {
        title: 'We run the training',
        text: 'Intensive, hands-on workshops. Your team leaves with solutions that work from the very next day.',
      },
    ],
  },
};

export default function HomeProcess({ lang = 'pl' }: { lang?: Lang }) {
  const t = COPY[lang];
  const visuals = [<VisualBrief key="b" lang={lang} />, <VisualProgram key="p" lang={lang} />, <VisualReport key="r" lang={lang} />];

  return (
    <section className={`${s.section} ${s.onWhite}`}>
      <div className={s.container}>
        <SectionHead title={t.title} sub={t.sub} />

        <ol className={s.processGrid} style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {t.steps.map((step, i) => (
            <FadeIn as="li" key={step.title} delay={i * 0.12}>
              <div className={s.processVisual} aria-hidden="true">{visuals[i]}</div>
              <span className={`${s.mono} ${s.processStep}`}>{t.step} {String(i + 1).padStart(2, '0')}</span>
              <h3 className={s.processTitle}>{step.title}</h3>
              <p className={s.processText}>{step.text}</p>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  );
}
