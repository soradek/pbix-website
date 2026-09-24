import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/home/PageHero';
import HomeFinalCta from '@/components/home/HomeFinalCta';
import { FadeIn } from '@/components/home/motion';
import s from '@/components/home/home.module.css';
import { getAllPosts } from '@/lib/blog';
import { toneFor } from '@/data/categoryColors';

export const metadata: Metadata = {
  title: 'Blog – Power BI, Excel, SQL | pbix.pl',
  description: 'Praktyczne artykuły o Power BI, Excel, SQL i wizualizacji danych. Realne wskazówki, przemyślenia i checklisty od trenera Microsoft.',
  alternates: {
    canonical: 'https://www.pbix.pl/blog',
  },
  openGraph: {
    title: 'Blog – Power BI, Excel, SQL | pbix.pl',
    description: 'Praktyczne artykuły o Power BI, Excel, SQL i wizualizacji danych.',
    url: 'https://www.pbix.pl/blog',
    type: 'website',
  },
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className={s.page}>
      <Navbar />
      <PageHero
        title="Co warto wiedzieć, a nie ma kogo spytać"
        lead="Praktyczne artykuły o Power BI, Excelu, SQL i wizualizacji danych. Z doświadczenia, nie z teorii."
      />

      <section className={`${s.onWhite} ${s.blogSection}`}>
        <div className={s.container}>
          <ul className={s.blogGrid}>
            {posts.map((post, i) => {
              const tone = toneFor(post.category);
              return (
                <FadeIn as="li" key={post.slug} delay={(i % 3) * 0.06}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className={s.blogCard}
                    style={{ '--tone-bg': tone.bg, '--tone-ink': tone.ink } as CSSProperties}
                  >
                    {post.coverImage && (
                      <div className={s.blogCover}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={post.coverImage} alt="" loading="lazy" />
                      </div>
                    )}
                    <div className={s.blogBody}>
                      <p className={`${s.mono} ${s.blogCat}`}>{post.category}</p>
                      <h2 className={s.blogTitle}>{post.title}</h2>
                      <p className={s.blogExcerpt}>{post.excerpt}</p>
                      <p className={`${s.mono} ${s.blogMeta}`}>
                        {formatDate(post.date)} · {post.readingTime}
                      </p>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </ul>
        </div>
      </section>

      <HomeFinalCta />
      <Footer />
    </main>
  );
}
