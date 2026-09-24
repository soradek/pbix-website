import { Metadata } from 'next';
import RegisterEnClient from './RegisterEnClient';
import { OG_IMAGES, TWITTER_IMAGES } from '@/lib/og';

export const metadata: Metadata = {
  title: 'Book a Training | pbix.pl',
  description: 'Book a Power BI, Excel or SQL training for your team. I will get back to you within 24 hours to tailor the programme to your needs.',
  openGraph: {
    title: 'Book a Training | pbix.pl',
    description: 'Book a Power BI, Excel or SQL training for your team.',
    url: 'https://www.pbix.pl/en/register',
    siteName: 'pbix.pl',
    locale: 'en_US',
    type: 'website',
    images: OG_IMAGES,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book a Training | pbix.pl',
    description: 'Book a Power BI, Excel or SQL training for your team.',
    images: TWITTER_IMAGES,
  },
  alternates: { canonical: 'https://www.pbix.pl/en/register' },
};

export default function RegisterEnPage() {
  return <RegisterEnClient />;
}
