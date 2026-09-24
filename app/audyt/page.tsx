import type { Metadata } from 'next';
import QuizClient from './components/QuizClient';
import { OG_IMAGES } from '@/lib/og';

export const metadata: Metadata = {
  title: 'Audyt dojrzałości raportowej | PBIX.pl',
  description:
    'Sprawdź poziom automatyzacji raportowania w Twojej firmie. 10 pytań, 2 minuty. Bezpłatny quiz diagnostyczny od PBIX.pl.',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  openGraph: {
    title: 'Audyt dojrzałości raportowej | PBIX.pl',
    description: 'Sprawdź poziom automatyzacji raportowania w Twojej firmie. 10 pytań, 2 minuty.',
    type: 'website',
    images: OG_IMAGES,
  },
};

export default function AudytPage() {
  return <QuizClient />;
}
