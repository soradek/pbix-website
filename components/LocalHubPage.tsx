import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getTrainingBySlug } from '@/data/trainings';
import { clients } from '@/data/clients';
import { testimonials } from '@/data/testimonials';
import { REGIONAL_CLIENT_SLUGS, type LocalHub } from '@/data/localHubs';
import { toneFor } from '@/data/categoryColors';
import { OG_IMAGES, TWITTER_IMAGES } from '@/lib/og';
import s from '@/components/home/home.module.css';
import PageHero from '@/components/home/PageHero';
import HomeLogos from '@/components/home/HomeLogos';
import HomeReviews from '@/components/home/HomeReviews';
import HomeFormats from '@/components/home/HomeFormats';
import HomeQuiz from '@/components/home/HomeQuiz';
import HomeFaq from '@/components/home/HomeFaq';
import HomeFinalCta from '@/components/home/HomeFinalCta';
import AgentButton from '@/components/home/AgentButton';
import { FadeIn, SectionHead, SplitHeading } from '@/components/home/motion';
import { ROUTES } from '@/components/home/lang';

const SITE = 'https://www.pbix.pl';

export function localHubMetadata(hub: LocalHub): Metadata {
  const url = `${SITE}/${hub.slug}`;
  return {
    title: hub.metaTitle,
    description: hub.metaDescription,
    openGraph: {
      title: hub.metaTitle,
      description: hub.metaDescription,
      url,
      siteName: 'pbix.pl',
      locale: 'pl_PL',
      type: 'website',
      images: OG_IMAGES,
    },
    twitter: {
      card: 'summary_large_image',
      title: hub.metaTitle,
      description: hub.metaDescription,
      images: TWITTER_IMAGES,
    },
    alternates: { canonical: url },
  };
}

export default function LocalHubPage({ hub }: { hub: LocalHub }) {
  const url = `${SITE}/${hub.slug}`;
  const tone = toneFor(hub.category);
  const programs = hub.programs.map(p => {
    const training = getTrainingBySlug(p.slug);
    if (!training) throw new Error(`Unknown training slug in local hub: ${p.slug}`);
    return { ...p, training };
  });
  const regionalClients = REGIONAL_CLIENT_SLUGS
    .map(slug => clients.find(c => c.slug === slug))
    .filter(c => c !== undefined);
  const reviews = [
    ...testimonials.filter(t => hub.reviewsFirst.includes(t.company)),
    ...testimonials.filter(t => !hub.reviewsFirst.includes(t.company)),
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Strona główna', item: SITE },
          { '@type': 'ListItem', position: 2, name: 'Szkolenia', item: `${SITE}/szkolenia` },
          { '@type': 'ListItem', position: 3, name: hub.h1, item: url },
        ],
      },
      {
        '@type': 'ItemList',
        name: hub.programsTitle,
        itemListElement: programs.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE}/szkolenia/${p.slug}`,
          name: p.training.title,
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: hub.faq.map(item => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };

  return (
    <main className={s.page} style={{ '--tone-bg': tone.bg, '--tone-ink': tone.ink } as CSSProperties}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />
      <PageHero title={hub.h1} lead={hub.lead} />

      {/* Local block */}
      <section className={`${s.section} ${s.onWhite}`}>
        <div className={`${s.container} ${s.trainingAbout}`}>
          <div>
            <SplitHeading text={hub.local.title} className={s.h2} />
            {hub.local.paragraphs.map((p, i) => (
              <FadeIn as="p" key={i} className={s.trainingLead} delay={0.1} y={16}>{p}</FadeIn>
            ))}
          </div>
          <FadeIn className={s.trainingAside} delay={0.2} y={16}>
            <p className={`${s.mono} ${s.metaLabelLight}`}>Forma</p>
            <p className={s.trainingAsideText}>{hub.local.format}</p>
          </FadeIn>
        </div>
        <div className={`${s.container} ${s.trainingLists}`}>
          <FadeIn>
            <h2 className={s.trainingListTitle}>{hub.local.problemsTitle}</h2>
            <ul className={s.plusList}>
              {hub.local.problems.map(item => <li key={item}>{item}</li>)}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* Programs */}
      <section className={`${s.section} ${s.onInk}`}>
        <div className={s.container}>
          <SectionHead title={hub.programsTitle} />
          <div className={s.trainGrid}>
            {programs.map((p, i) => (
              <FadeIn as="article" key={p.slug} className={s.trainCard} delay={(i % 2) * 0.1}>
                <span className={`${s.mono} ${s.trainIndex}`}>
                  <b>{String(i + 1).padStart(2, '0')}</b> · {hub.name}
                </span>
                <h3 className={s.trainTitle}>
                  <Link href={ROUTES.pl.training(p.slug)} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {p.training.title}
                  </Link>
                </h3>
                <p className={s.trainDesc}>{p.summary}</p>
                <div className={s.trainMeta}>
                  <AgentButton href={ROUTES.pl.training(p.slug)} label="Zobacz program" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <HomeLogos items={regionalClients} label="Firmy z Wielkopolski, których zespoły szkoliłem" />
      <HomeReviews items={reviews} />
      <HomeFormats />
      {hub.showQuiz && <HomeQuiz />}
      <HomeFaq items={hub.faq} title={hub.faqTitle} />
      <HomeFinalCta />
      <Footer />
    </main>
  );
}
