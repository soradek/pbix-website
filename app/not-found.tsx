import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NotFoundView from '@/components/home/StatusPage';
import s from '@/components/home/home.module.css';

export const metadata: Metadata = {
  title: '404',
  robots: { index: false },
};

// Unknown URLs under /en land here too, so pick the language from the request path
export default async function NotFound() {
  const pathname = (await headers()).get('x-pathname') ?? '/';
  const lang = pathname.startsWith('/en') ? 'en' : 'pl';
  return (
    <main className={s.page}>
      <Navbar />
      <NotFoundView lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}
