import { Metadata } from 'next';
import ZapisyClient from './ZapisyClient';
import { OG_IMAGES, TWITTER_IMAGES } from '@/lib/og';

export const metadata: Metadata = {
  title: 'Zapisy na szkolenie',
  description: 'Zapisz się na szkolenie Power BI, Excel lub SQL. Skontaktuję się w ciągu 24 godzin i dostosuję program do potrzeb Twojego zespołu.',
  openGraph: {
    title: 'Zapisy na szkolenie',
    description: 'Zapisz się na szkolenie Power BI, Excel lub SQL dla swojego zespołu.',
    url: 'https://www.pbix.pl/zapisy',
    siteName: 'pbix.pl',
    locale: 'pl_PL',
    type: 'website',
    images: OG_IMAGES,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zapisy na szkolenie',
    description: 'Zapisz się na szkolenie Power BI, Excel lub SQL.',
    images: TWITTER_IMAGES,
  },
  alternates: { canonical: 'https://www.pbix.pl/zapisy' },
};

export default function ZapisyPage() {
  return <ZapisyClient />;
}
