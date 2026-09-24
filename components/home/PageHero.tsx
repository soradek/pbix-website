import type { ReactNode } from 'react';
import s from './home.module.css';
import { FadeIn, SplitHeading } from './motion';

interface Props {
  title: string;
  lead?: string;
  children?: ReactNode;
}

export default function PageHero({ title, lead, children }: Props) {
  return (
    <section className={s.pageHero}>
      <div className={s.container}>
        <div className={s.pageHeroGrid}>
          <SplitHeading as="h1" text={title} className={s.pageHeroTitle} onMount />
          {(lead || children) && (
            <FadeIn className={s.pageHeroSide} delay={0.25} y={16} onMount>
              {lead && <p className={s.pageHeroLead}>{lead}</p>}
              {children}
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  );
}
