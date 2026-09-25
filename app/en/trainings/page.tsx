import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TrainingsEnClient from './TrainingsEnClient';
import { OG_IMAGES } from '@/lib/og';

export const metadata: Metadata = {
  title: 'Power BI, Excel & SQL Trainings',
  description: 'Corporate trainings in Power BI, Excel, SQL and data visualisation. 2-day intensive workshops with a Microsoft Certified Trainer.',
  openGraph: {
    title: 'Power BI, Excel & SQL Trainings',
    description: 'Corporate trainings in Power BI, Excel, SQL and data visualisation.',
    url: 'https://www.pbix.pl/en/trainings',
    siteName: 'pbix.pl',
    locale: 'en_US',
    type: 'website',
    images: OG_IMAGES,
  },
  alternates: { canonical: 'https://www.pbix.pl/en/trainings' },
};

export default async function TrainingsEnPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; kategoria?: string }>;
}) {
  const { category, kategoria } = await searchParams;
  return (
    <main style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <Navbar />
      <TrainingsEnClient initialCategory={category ?? kategoria} />
      <Footer lang="en" />
    </main>
  );
}
