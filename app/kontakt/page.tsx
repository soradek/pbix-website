import { Metadata } from 'next';
import KontaktClient from './KontaktClient';

export const metadata: Metadata = {
  title: 'Kontakt | pbix.pl',
  description: 'Skontaktuj się z Radosławem Sobczakiem – certyfikowanym trenerem Microsoft. Zamów szkolenie z Power BI, Excel lub SQL dla swojego zespołu.',
  openGraph: {
    title: 'Kontakt | pbix.pl',
    description: 'Zamów szkolenie z Power BI, Excel lub SQL dopasowane do potrzeb Twojego zespołu.',
    url: 'https://www.pbix.pl/kontakt',
    siteName: 'pbix.pl',
    locale: 'pl_PL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kontakt | pbix.pl',
    description: 'Zamów szkolenie z Power BI, Excel lub SQL.',
  },
  alternates: { canonical: 'https://www.pbix.pl/kontakt' },
};

export default function KontaktPage() {
  return <KontaktClient />;
}
