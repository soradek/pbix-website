import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NotFoundView from '@/components/home/StatusPage';
import s from '@/components/home/home.module.css';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFoundEn() {
  return (
    <main className={s.page}>
      <Navbar />
      <NotFoundView lang="en" />
      <Footer lang="en" />
    </main>
  );
}
