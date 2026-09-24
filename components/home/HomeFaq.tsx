import type { FAQItem } from '@/data/faq';
import s from './home.module.css';
import { RollingLink } from './RollingButton';
import { FadeIn, SplitHeading } from './motion';
import { ROUTES, type Lang } from './lang';

const COPY = {
  pl: { title: 'Najczęstsze pytania', sub: 'Nie ma tu Twojego pytania? Napisz, odpowiem konkretnie.', cta: 'Napisz do mnie' },
  en: { title: 'Frequently asked questions', sub: 'Your question is not here? Write to me and I will give you a straight answer.', cta: 'Get in touch' },
};

export default function HomeFaq({ items, lang = 'pl', title }: { items: FAQItem[]; lang?: Lang; title?: string }) {
  const t = { ...COPY[lang], ...(title ? { title } : {}) };
  return (
    <section id="faq" className={`${s.section} ${s.onWhite}`}>
      <div className={`${s.container} ${s.faqGrid}`}>
        <div className={s.faqAside}>
          <SplitHeading text={t.title} className={s.h2} />
          <FadeIn as="p" className={s.sub} delay={0.15} y={16}>
            {t.sub}
          </FadeIn>
          <div className={s.actions} style={{ marginTop: 32 }}>
            <RollingLink href={ROUTES[lang].contact} label={t.cta} variant="dark" />
          </div>
        </div>

        <FadeIn className={s.faqList} delay={0.1}>
          {items.map(item => (
            <details key={item.q} className={s.faqItem}>
              <summary>
                {item.q}
                <span className={s.faqPlus} aria-hidden="true" />
              </summary>
              <p className={s.faqAnswer}>{item.a}</p>
            </details>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
