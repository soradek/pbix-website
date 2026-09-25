import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { faqItems } from '@/data/faq';
import s from '@/components/home/home.module.css';
import HomeHero from '@/components/home/HomeHero';
import HomeLogos from '@/components/home/HomeLogos';
import HomeManifest from '@/components/home/HomeManifest';
import HomeOrbit from '@/components/home/HomeOrbit';
import HomeAbout from '@/components/home/HomeAbout';
import HomeTrainings from '@/components/home/HomeTrainings';
import HomeProcess from '@/components/home/HomeProcess';
import HomeReviews from '@/components/home/HomeReviews';
import HomeFormats from '@/components/home/HomeFormats';
import HomeQuiz from '@/components/home/HomeQuiz';
import HomeFaq from '@/components/home/HomeFaq';
import HomeFinalCta from '@/components/home/HomeFinalCta';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.pbix.pl',
    languages: {
      pl: 'https://www.pbix.pl',
      en: 'https://www.pbix.pl/en',
      'x-default': 'https://www.pbix.pl',
    },
  },
};

const HOME_FAQ_INDEXES = [0, 1, 2, 4, 5, 9, 10, 13];

export default function Home() {
  const homeFaq = HOME_FAQ_INDEXES.map(i => faqItems[i]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homeFaq.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <main className={s.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <HomeHero />
      <HomeLogos />
      <HomeManifest />
      <HomeOrbit />
      <HomeAbout />
      <HomeTrainings />
      <HomeProcess />
      <HomeReviews />
      <HomeFormats />
      <HomeQuiz />
      <HomeFaq items={homeFaq} />
      <HomeFinalCta />
      <Footer />
    </main>
  );
}
