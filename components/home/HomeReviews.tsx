import { testimonials, type Testimonial } from '@/data/testimonials';
import s from './home.module.css';
import ScoreCounter from './ScoreCounter';
import ReviewsCarousel from './ReviewsCarousel';
import { FadeIn, SectionHead } from './motion';
import type { Lang } from './lang';

const COPY = {
  pl: {
    title: 'Co mówią uczestnicy',
    score: 'Średnia ocen z anonimowych ankiet, którymi kończę każde szkolenie.',
    people: '4 500+ uczestników',
  },
  en: {
    title: 'What participants say',
    score: 'Average rating from the anonymous surveys I run at the end of every training.',
    people: '4,500+ participants',
  },
};

export default function HomeReviews({ lang = 'pl', items = testimonials }: { lang?: Lang; items?: Testimonial[] }) {
  const t = COPY[lang];
  return (
    <section className={`${s.section} ${s.onWhite}`}>
      <div className={s.container}>
        <SectionHead title={t.title} />

        <FadeIn className={s.reviewsLayout}>
          <div className={s.scoreCard}>
            <div>
              <ScoreCounter lang={lang} />
              <p className={s.scoreText}>{t.score}</p>
            </div>
            <span className={s.mono} style={{ color: 'var(--muted-dark)' }}>{t.people}</span>
          </div>

          <ReviewsCarousel items={items} lang={lang} />
        </FadeIn>
      </div>
    </section>
  );
}
