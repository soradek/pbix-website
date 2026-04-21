import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { trainings, getTrainingBySlug } from '@/data/trainings';
import { getTrainingEnContent } from '@/data/trainings-en';
import TrainingPageClient from '@/app/szkolenia/[slug]/TrainingPageClient';

export async function generateStaticParams() {
  return trainings.map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const training = getTrainingBySlug(slug);
  if (!training) return {};
  const en = getTrainingEnContent(slug);
  const titleDisplay = en?.title ?? training.title;
  const descFull = en?.description ?? training.description;
  const desc = descFull.substring(0, 160);
  return {
    title: `${titleDisplay} | pbix.pl`,
    description: desc,
    keywords: [training.category, 'training', 'Power BI', 'Excel', 'SQL', 'corporate training Poland', 'Microsoft Certified Trainer', 'Radosław Sobczak'],
    openGraph: {
      title: titleDisplay,
      description: desc,
      url: `https://www.pbix.pl/en/trainings/${slug}`,
      siteName: 'pbix.pl',
      locale: 'en_US',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: titleDisplay, description: desc },
    alternates: { canonical: `https://www.pbix.pl/en/trainings/${slug}` },
  };
}

export default async function TrainingEnPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const training = getTrainingBySlug(slug);
  if (!training) notFound();

  const enContent = getTrainingEnContent(slug);
  const enTitle = enContent?.title ?? training.title;
  const enDesc = enContent?.description ?? training.description;
  const enPrice = Math.round((training.price * 1.2) / 100) * 100;

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: enTitle,
    description: enDesc.substring(0, 500),
    url: `https://www.pbix.pl/en/trainings/${slug}`,
    inLanguage: 'en',
    courseMode: ['onsite', 'online'],
    timeRequired: 'P2D',
    educationalLevel: training.category,
    teaches: enContent?.benefits ?? training.benefits,
    provider: {
      '@type': 'Person',
      name: 'Radosław Sobczak',
      url: 'https://www.pbix.pl',
      jobTitle: 'Microsoft Certified Trainer (MCT)',
      hasCredential: { '@type': 'EducationalOccupationalCredential', name: 'Microsoft Certified Trainer (MCT)' },
    },
    offers: {
      '@type': 'Offer',
      price: enPrice,
      priceCurrency: 'PLN',
      availability: 'https://schema.org/InStock',
      url: 'https://www.pbix.pl/en/contact',
    },
  };

  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <Navbar />
      <TrainingPageClient training={training} lang="en" />
      <Footer lang="en" />
    </main>
  );
}
