import { Metadata } from 'next';
import ZapisyClient from './ZapisyClient';

export const metadata: Metadata = {
  title: 'Zapisy na szkolenie | pbix.pl',
  description: 'Zapisz się na szkolenie Power BI, Excel lub SQL. Skontaktuję się w ciągu 24 godzin i dostosuję program do potrzeb Twojego zespołu.',
  openGraph: {
    title: 'Zapisy na szkolenie | pbix.pl',
    description: 'Zapisz się na szkolenie Power BI, Excel lub SQL dla swojego zespołu.',
    url: 'https://www.pbix.pl/zapisy',
    siteName: 'pbix.pl',
    locale: 'pl_PL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zapisy na szkolenie | pbix.pl',
    description: 'Zapisz się na szkolenie Power BI, Excel lub SQL.',
  },
  alternates: { canonical: 'https://www.pbix.pl/zapisy' },
};

export default function ZapisyPage() {
  return <ZapisyClient />;
}
