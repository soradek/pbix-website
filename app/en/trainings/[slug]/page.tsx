import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { trainings, getTrainingBySlug } from '@/data/trainings';
import TrainingPageClient from '@/app/szkolenia/[slug]/TrainingPageClient';

export async function generateStaticParams() {
  return trainings.map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const training = getTrainingBySlug(slug);
  if (!training) return {};
  const desc = training.description.substring(0, 160);
  return {
    title: `${training.title} | pbix.pl`,
    description: desc,
    openGraph: {
      title: training.title,
      description: desc,
      url: `https://www.pbix.pl/en/trainings/${slug}`,
      siteName: 'pbix.pl',
      locale: 'en_US',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: training.title, description: desc },
    alternates: { canonical: `https://www.pbix.pl/en/trainings/${slug}` },
  };
}

export default async function TrainingEnPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const training = getTrainingBySlug(slug);
  if (!training) notFound();

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: training.title,
    description: training.description.substring(0, 500),
    url: `https://www.pbix.pl/en/trainings/${slug}`,
    inLanguage: 'en',
    courseMode: ['onsite', 'online'],
    timeRequired: 'P2D',
    provider: {
      '@type': 'Person',
      name: 'Radosław Sobczak',
      url: 'https://www.pbix.pl',
      jobTitle: 'Microsoft Certified Trainer (MCT)',
    },
    offers: {
      '@type': 'Offer',
      price: training.price,
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
