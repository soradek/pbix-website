import type { Metadata } from 'next';
import ProjectsView from '@/components/home/ProjectsView';

export const metadata: Metadata = {
  title: 'Power BI Projects – Dashboards & Reporting | pbix.pl',
  description:
    'Power BI implementations for manufacturing, FMCG, retail and logistics companies. Sales dashboards, financial reporting automation, HR analytics and supply chain monitoring.',
  keywords: [
    'Power BI projects', 'Power BI dashboard', 'Power BI implementation',
    'reporting automation', 'Power BI case study', 'data analytics Poland',
  ],
  openGraph: {
    title: 'Power BI Projects – Dashboards & Reporting | pbix.pl',
    description: 'How Power BI transforms data into business value — selected implementations.',
    url: 'https://www.pbix.pl/en/projects',
    siteName: 'pbix.pl',
    locale: 'en_US',
    type: 'website',
  },
  alternates: { canonical: 'https://www.pbix.pl/en/projects' },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Power BI Projects – Dashboards & Reporting',
  description: 'Power BI implementations for FMCG, manufacturing, retail and logistics companies.',
  url: 'https://www.pbix.pl/en/projects',
  inLanguage: 'en',
  author: { '@type': 'Person', name: 'Radosław Sobczak', jobTitle: 'Microsoft Certified Trainer (MCT)', url: 'https://www.pbix.pl' },
};

export default function ProjectsEnPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <ProjectsView lang="en" />
    </>
  );
}
