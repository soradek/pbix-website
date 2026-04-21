import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TrainingsEnClient from './TrainingsEnClient';

export const metadata: Metadata = {
  title: 'Power BI, Excel & SQL Trainings | pbix.pl',
  description: 'Corporate trainings in Power BI, Excel, SQL and data visualisation. 2-day intensive workshops with a Microsoft Certified Trainer.',
  openGraph: {
    title: 'Power BI, Excel & SQL Trainings | pbix.pl',
    description: 'Corporate trainings in Power BI, Excel, SQL and data visualisation.',
    url: 'https://www.pbix.pl/en/trainings',
    siteName: 'pbix.pl',
    locale: 'en_US',
    type: 'website',
  },
  alternates: { canonical: 'https://www.pbix.pl/en/trainings' },
};

export default function TrainingsEnPage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <Navbar />
      <TrainingsEnClient />
      <Footer lang="en" />
    </main>
  );
}
