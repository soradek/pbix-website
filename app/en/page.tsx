import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { faqItemsEn } from '@/data/faq';
import s from '@/components/home/home.module.css';
import HomeHero from '@/components/home/HomeHero';
import HomeLogos from '@/components/home/HomeLogos';
import HomeManifest from '@/components/home/HomeManifest';
import HomeOrbit from '@/components/home/HomeOrbit';
import HomeAbout from '@/components/home/HomeAbout';
import HomeTrainings from '@/components/home/HomeTrainings';
import HomeProcess from '@/components/home/HomeProcess';
import HomeCompare from '@/components/home/HomeCompare';
import HomeReviews from '@/components/home/HomeReviews';
import HomeFormats from '@/components/home/HomeFormats';
import HomeFaq from '@/components/home/HomeFaq';
import HomeFinalCta from '@/components/home/HomeFinalCta';

export const metadata: Metadata = {
  title: 'Power BI, Excel & SQL Corporate Trainings | Radosław Sobczak MCT',
  description:
    'Radosław Sobczak — Microsoft Certified Trainer (MCT) delivering Power BI, Excel, SQL and VBA corporate trainings across Poland and online. 7 years of experience, 4,500+ professionals trained, rated 4.8/5. On-site and remote sessions in English and Polish.',
  keywords: [
    'Power BI training Poland', 'Excel training corporate', 'SQL training English',
    'Microsoft Certified Trainer Poland', 'corporate data training', 'Power BI course English',
    'DAX training', 'VBA training', 'online Power BI training',
  ],
  openGraph: {
    title: 'Power BI, Excel & SQL Corporate Trainings | Radosław Sobczak MCT',
    description: 'Microsoft Certified Trainer — practical Power BI, Excel and SQL trainings for corporate teams across Poland. English sessions available.',
    url: 'https://www.pbix.pl/en',
    siteName: 'pbix.pl',
    locale: 'en_US',
    type: 'website',
    images: [{ url: 'https://www.pbix.pl/og.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Power BI, Excel & SQL Corporate Trainings | pbix.pl',
    description: 'MCT-delivered Power BI, Excel and SQL trainings for corporate teams in Poland and online.',
  },
  alternates: {
    canonical: 'https://www.pbix.pl/en',
    languages: {
      pl: 'https://www.pbix.pl',
      en: 'https://www.pbix.pl/en',
      'x-default': 'https://www.pbix.pl',
    },
  },
};

const HOME_FAQ_INDEXES = [0, 1, 2, 4, 5, 9, 10, 13];
const homeFaq = HOME_FAQ_INDEXES.map(i => faqItemsEn[i]);

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: homeFaq.map(item => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'pbix.pl – Radosław Sobczak',
  url: 'https://www.pbix.pl/en',
  description:
    'Corporate Power BI, Excel, SQL and VBA training delivered by Microsoft Certified Trainer Radosław Sobczak. On-site and online sessions available in English and Polish across Poland.',
  founder: { '@type': 'Person', name: 'Radosław Sobczak', jobTitle: 'Microsoft Certified Trainer (MCT)' },
  areaServed: [{ '@type': 'Country', name: 'Poland' }],
  knowsLanguage: ['pl', 'en'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Corporate Data Trainings',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Course', name: 'Microsoft Power BI Training', courseMode: ['onsite', 'online'] } },
      { '@type': 'Offer', itemOffered: { '@type': 'Course', name: 'MS Excel Training', courseMode: ['onsite', 'online'] } },
      { '@type': 'Offer', itemOffered: { '@type': 'Course', name: 'Microsoft SQL Server Training', courseMode: ['onsite', 'online'] } },
    ],
  },
};

export default function EnHomePage() {
  return (
    <main className={s.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Navbar />
      <HomeHero lang="en" />
      <HomeLogos lang="en" />
      <HomeManifest lang="en" />
      <HomeOrbit lang="en" />
      <HomeAbout lang="en" />
      <HomeTrainings lang="en" />
      <HomeProcess lang="en" />
      <HomeCompare lang="en" />
      <HomeReviews lang="en" />
      <HomeFormats lang="en" />
      <HomeFaq items={homeFaq} lang="en" />
      <HomeFinalCta lang="en" />
      <Footer lang="en" />
    </main>
  );
}
