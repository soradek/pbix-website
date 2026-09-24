import type { Metadata } from 'next';
import ProjectsView from '@/components/home/ProjectsView';

export const metadata: Metadata = {
  title: 'Projekty Power BI – realizacje i wdrożenia | pbix.pl',
  description:
    'Przykładowe wdrożenia Power BI dla firm produkcyjnych, FMCG, logistyki i retail. Dashboardy sprzedażowe, automatyzacja raportowania finansowego, HR analytics, monitoring łańcucha dostaw.',
  keywords: [
    'projekty Power BI', 'wdrożenie Power BI', 'dashboard Power BI',
    'automatyzacja raportowania', 'Power BI case study',
  ],
  openGraph: {
    title: 'Projekty Power BI – realizacje i wdrożenia | pbix.pl',
    description: 'Jak Power BI transformuje dane w wartość biznesową — przykładowe realizacje.',
    url: 'https://www.pbix.pl/projekty',
    siteName: 'pbix.pl',
    locale: 'pl_PL',
    type: 'website',
  },
  alternates: { canonical: 'https://www.pbix.pl/projekty' },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Projekty Power BI – realizacje i wdrożenia',
  description: 'Wdrożenia Power BI dla firm z sektorów FMCG, produkcji, handlu i logistyki.',
  url: 'https://www.pbix.pl/projekty',
  author: { '@type': 'Person', name: 'Radosław Sobczak', jobTitle: 'Microsoft Certified Trainer (MCT)', url: 'https://www.pbix.pl' },
};

export default function ProjektyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <ProjectsView lang="pl" />
    </>
  );
}
