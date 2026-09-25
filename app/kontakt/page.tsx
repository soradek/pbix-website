import { Metadata } from 'next';
import KontaktClient from './KontaktClient';
import { OG_IMAGES, TWITTER_IMAGES } from '@/lib/og';

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Skontaktuj się z Radosławem Sobczakiem – certyfikowanym trenerem Microsoft. Zamów szkolenie z Power BI, Excel lub SQL dla swojego zespołu.',
  openGraph: {
    title: 'Kontakt',
    description: 'Zamów szkolenie z Power BI, Excel lub SQL dopasowane do potrzeb Twojego zespołu.',
    url: 'https://www.pbix.pl/kontakt',
    siteName: 'pbix.pl',
    locale: 'pl_PL',
    type: 'website',
    images: OG_IMAGES,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kontakt',
    description: 'Zamów szkolenie z Power BI, Excel lub SQL.',
    images: TWITTER_IMAGES,
  },
  alternates: { canonical: 'https://www.pbix.pl/kontakt' },
};

export default function KontaktPage() {
  return <KontaktClient />;
}
