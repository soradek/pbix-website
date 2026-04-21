import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { trainings, getTrainingBySlug } from '@/data/trainings';
import TrainingPageClient from './TrainingPageClient';

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
    keywords: [training.category, 'szkolenie', 'Power BI', 'Excel', 'SQL', 'Radosław Sobczak', 'MCT'],
    openGraph: {
      title: training.title,
      description: desc,
      url: `https://www.pbix.pl/szkolenia/${slug}`,
      siteName: 'pbix.pl',
      locale: 'pl_PL',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: training.title,
      description: desc,
    },
    alternates: {
      canonical: `https://www.pbix.pl/szkolenia/${slug}`,
    },
  };
}

export default async function TrainingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const training = getTrainingBySlug(slug);
  if (!training) notFound();

  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <Navbar />
      <TrainingPageClient training={training} />
      <Footer />
    </main>
  );
}
