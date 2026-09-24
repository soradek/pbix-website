import s from './home.module.css';
import { RollingLink } from './RollingButton';
import { SplitHeading } from './motion';
import { ROUTES, type Lang } from './lang';

const COPY = {
  pl: {
    title: 'Zróbmy to raz, a porządnie.',
    accentFrom: 3,
    text: 'Napisz przez formularz, z jakimi narzędziami pracuje Twój zespół i co chcecie usprawnić. Dobiorę szkolenie i poziom.',
    primary: 'Napisz do mnie',
    secondary: 'Zobacz szkolenia',
  },
  en: {
    title: 'Let’s do it once, and do it right.',
    accentFrom: 4,
    text: 'Use the form to tell me which tools your team works with and what you want to improve. I will match the training and the level.',
    primary: 'Get in touch',
    secondary: 'Explore trainings',
  },
};

export default function HomeFinalCta({ lang = 'pl' }: { lang?: Lang }) {
  const t = COPY[lang];
  const routes = ROUTES[lang];
  return (
    <section className={`${s.section} ${s.onInk}`}>
      <div className={s.container}>
        <SplitHeading
          text={t.title}
          className={s.finalTitle}
          accentFrom={t.accentFrom}
          accentClassName={s.finalAccent}
        />
        <div className={s.finalRow}>
          <p className={s.finalText}>{t.text}</p>
          <div className={s.actions}>
            <RollingLink href={routes.contact} label={t.primary} variant="light" />
            <RollingLink href={routes.trainings} label={t.secondary} variant="outlineDark" arrow={false} />
          </div>
        </div>
      </div>
    </section>
  );
}
