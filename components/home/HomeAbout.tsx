import Image from 'next/image';
import Link from 'next/link';
import s from './home.module.css';
import { RollingLink } from './RollingButton';
import { FadeIn, RevealImage, SplitHeading } from './motion';
import { ROUTES, type Lang } from './lang';

const COPY = {
  pl: {
    alt: 'Radosław Sobczak podczas szkolenia z Excela',
    title: 'Uczę pracy z danymi, nie klikania w menu.',
    lead: 'Jestem certyfikowanym trenerem Microsoft (MCT). Od ponad 7 lat szkolę zespoły z Power BI, Excela, SQL i VBA, między innymi w Volkswagenie, Lufthansie, Coca-Coli i Boston Scientific.',
    text: 'Nie pokazuję, gdzie jest który przycisk. Pokazuję, jak rozwiązać konkretny problem biznesowy. Każde szkolenie opieram na przykładach z prawdziwych projektów i dopasowuję do specyfiki firmy.',
    facts: [
      { number: '4 500+', label: 'przeszkolonych pracowników' },
      { number: '4 000+', label: 'godzin na salach szkoleniowych' },
      { number: '7 lat', label: 'prowadzenia szkoleń dla firm' },
    ],
    cta: 'Napisz do mnie',
    project: 'A może zrobimy wspólnie projekt?',
  },
  en: {
    alt: 'Radosław Sobczak running an Excel training',
    title: 'I teach working with data, not clicking through menus.',
    lead: 'I am a Microsoft Certified Trainer (MCT). For over 7 years I have trained teams in Power BI, Excel, SQL and VBA, including at Volkswagen, Lufthansa, Coca-Cola and Boston Scientific.',
    text: 'I do not show where each button is. I show how to solve a specific business problem. Every training is based on examples from real projects and tailored to your company.',
    facts: [
      { number: '4,500+', label: 'employees trained' },
      { number: '4,000+', label: 'hours in training rooms' },
      { number: '7 years', label: 'of corporate training' },
    ],
    cta: 'Get in touch',
    project: 'Shall we build a project together?',
  },
};

export default function HomeAbout({ lang = 'pl' }: { lang?: Lang }) {
  const t = COPY[lang];
  const routes = ROUTES[lang];

  return (
    <section id={lang === 'en' ? 'about' : 'o-mnie'} className={`${s.section} ${s.onPaper}`}>
      <div className={`${s.container} ${s.aboutGrid}`}>
        <RevealImage className={s.aboutPhoto}>
          <Image
            src="/radek3.jpg"
            alt={t.alt}
            fill
            quality={80}
            sizes="(max-width: 768px) 100vw, 480px"
            style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
          />
        </RevealImage>

        <div>
          <SplitHeading text={t.title} className={s.h2} />
          <FadeIn as="p" className={s.aboutLead} delay={0.15} y={16}>
            {t.lead}
          </FadeIn>
          <FadeIn as="p" className={s.aboutText} delay={0.25} y={16}>
            {t.text}
          </FadeIn>

          <ul className={s.facts}>
            {t.facts.map((f, i) => (
              <FadeIn as="li" key={f.label} delay={0.3 + i * 0.08} y={16}>
                <div className={s.factNumber}>
                  {f.number.endsWith('+') ? (
                    <>
                      {f.number.slice(0, -1)}
                      <span className={s.factPlus}>+</span>
                    </>
                  ) : (
                    f.number
                  )}
                </div>
                <div className={s.factLabel}>{f.label}</div>
              </FadeIn>
            ))}
          </ul>

          <div className={s.actions}>
            <RollingLink href={routes.contact} label={t.cta} variant="dark" />
            <Link href={routes.projects} className={s.link}>
              {t.project}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
