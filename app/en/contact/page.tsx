import { Metadata } from 'next';
import ContactEnClient from './ContactEnClient';

export const metadata: Metadata = {
  title: 'Contact | pbix.pl',
  description: 'Contact Radosław Sobczak – Microsoft Certified Trainer. Book a Power BI, Excel or SQL training for your team.',
  openGraph: {
    title: 'Contact | pbix.pl',
    description: 'Book a Power BI, Excel or SQL corporate training.',
    url: 'https://www.pbix.pl/en/contact',
    siteName: 'pbix.pl',
    locale: 'en_US',
    type: 'website',
  },
  alternates: { canonical: 'https://www.pbix.pl/en/contact' },
};

export default function ContactEnPage() {
  return <ContactEnClient />;
}
