import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SzkoleniasClient from './SzkoleniasClient';
import { trainings } from '@/data/trainings';

export const metadata: Metadata = {
  title: 'Szkolenia Power BI, Excel, SQL | pbix.pl',
  description: 'Specjalistyczne szkolenia z Power BI, Excel, SQL i wizualizacji danych. 2 dni praktycznych warsztatów z certyfikowanym trenerem Microsoft (MCT).',
  openGraph: {
    title: 'Szkolenia Power BI, Excel, SQL | pbix.pl',
    description: 'Specjalistyczne szkolenia z Power BI, Excel, SQL i wizualizacji danych.',
    url: 'https://www.pbix.pl/szkolenia',
    siteName: 'pbix.pl',
    locale: 'pl_PL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Szkolenia Power BI, Excel, SQL | pbix.pl',
    description: 'Specjalistyczne szkolenia z Power BI, Excel, SQL i wizualizacji danych.',
  },
  alternates: { canonical: 'https://www.pbix.pl/szkolenia' },
};

const VALID_CATEGORIES = ['Power BI', 'Excel', 'SQL', 'Wizualizacja danych'] as const;

export default async function SzkoleniasPage({
  searchParams,
}: {
  searchParams: Promise<{ kategoria?: string }>;
}) {
  const { kategoria } = await searchParams;
  const initialCategory = VALID_CATEGORIES.includes(kategoria as (typeof VALID_CATEGORIES)[number])
    ? (kategoria as string)
    : 'Wszystkie';
  const initialTrainings =
    initialCategory === 'Wszystkie'
      ? trainings
      : trainings.filter((t) => t.category === initialCategory);

  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <Navbar />
      <SzkoleniasClient initialCategory={initialCategory} initialTrainings={initialTrainings} />
      <Footer />
    </main>
  );
}
