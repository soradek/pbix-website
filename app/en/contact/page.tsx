import { Metadata } from 'next';
import ContactEnClient from './ContactEnClient';
import { OG_IMAGES_EN } from '@/lib/og';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Radosław Sobczak – Microsoft Certified Trainer. Book a Power BI, Excel or SQL training for your team.',
  openGraph: {
    title: 'Contact',
    description: 'Book a Power BI, Excel or SQL corporate training.',
    url: 'https://www.pbix.pl/en/contact',
    siteName: 'pbix.pl',
    locale: 'en_US',
    type: 'website',
    images: OG_IMAGES_EN,
  },
  alternates: { canonical: 'https://www.pbix.pl/en/contact' },
};

export default function ContactEnPage() {
  return <ContactEnClient />;
}
