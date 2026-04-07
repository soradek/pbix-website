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
  return {
    title: training.title,
    description: training.description.substring(0, 160),
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
