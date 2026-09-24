import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { trainings } from '@/data/trainings';
import { toneFor } from '@/data/categoryColors';
import HomeFinalCta from '@/components/home/HomeFinalCta';
import { SectionHead, SplitHeading } from '@/components/home/motion';
import s from '@/components/home/home.module.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const url = `https://www.pbix.pl/blog/${post.slug}`;
  // OG / Twitter images are produced dynamically by the colocated
  // `opengraph-image.tsx` and `twitter-image.tsx` route conventions —
  // do NOT set `images` here or the convention output will be overridden.
  return {
    title: `${post.title} | pbix.pl`,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: ['Radosław Sobczak'],
      section: post.category,
      tags: post.keywords,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const Post = post.Component;

  const related = trainings.filter((t) => {
    if (post.relatedTrainingSlug && t.slug === post.relatedTrainingSlug) return true;
    if (post.category === 'Power BI' && t.category === 'Power BI') return true;
    if (post.category === 'Excel' && t.category === 'Excel') return true;
    if (post.category === 'SQL' && t.category === 'SQL') return true;
    if (post.category === 'Wizualizacja' && t.category === 'Wizualizacja danych') return true;
    return false;
  }).slice(0, 3);

  const postUrl = `https://www.pbix.pl/blog/${post.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: [
      `https://www.pbix.pl/blog/${post.slug}/opengraph-image`,
      ...(post.coverImage ? [`https://www.pbix.pl${post.coverImage}`] : []),
      'https://www.pbix.pl/og.jpg',
    ],
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'Radosław Sobczak',
      url: 'https://www.pbix.pl/',
      jobTitle: 'Microsoft Certified Trainer (MCT)',
    },
    publisher: {
      '@type': 'Organization',
      name: 'pbix.pl',
      logo: { '@type': 'ImageObject', url: 'https://www.pbix.pl/og.jpg' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
    url: postUrl,
    articleSection: post.category,
    keywords: post.keywords?.join(', '),
    inLanguage: 'pl-PL',
  };

  const tone = toneFor(post.category);

  return (
    <main className={s.page} style={{ '--tone-bg': tone.bg, '--tone-ink': tone.ink } as CSSProperties}>
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className={s.post}>
        <header className={s.postHeader}>
          <div className={s.postNarrow}>
            <Link href="/blog" className={`${s.mono} ${s.postBack}`}>
              ← Wszystkie artykuły
            </Link>
            <p className={`${s.mono} ${s.blogCat}`}>{post.category}</p>
            <SplitHeading as="h1" text={post.title} className={s.postTitle} onMount />
            <p className={`${s.mono} ${s.blogMeta}`}>
              {formatDate(post.date)} · {post.readingTime} czytania
            </p>
          </div>
        </header>

        <div className={s.postNarrow}>
          {post.coverImage && (
            <div className={`${s.blogCover} ${s.postCover}`}>
              <Image
                src={post.coverImage}
                alt={`Ilustracja artykułu: ${post.title}`}
                fill
                priority
                sizes="(max-width: 800px) 100vw, 720px"
              />
            </div>
          )}
          <div className={s.postBody}>
            <Post />
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className={`${s.onPaper} ${s.sectionTight}`}>
          <div className={s.container}>
            <SectionHead title="Powiązane szkolenia" />
            <ul className={s.relatedGrid}>
              {related.map((t) => {
                const tt = toneFor(t.category);
                return (
                  <li key={t.slug}>
                    <Link
                      href={`/szkolenia/${t.slug}`}
                      className={s.relatedCard}
                      style={{ '--tone-bg': tt.bg, '--tone-ink': tt.ink } as CSSProperties}
                    >
                      <p className={`${s.mono} ${s.blogCat}`}>{t.category}</p>
                      <h3 className={s.relatedTitle}>{t.title}</h3>
                      <p className={s.blogExcerpt}>{t.description.substring(0, 110).trim()}…</p>
                      <p className={`${s.mono} ${s.relatedFoot}`}>
                        <span>{t.priceLabel}</span>
                        <span className={s.relatedMore}>Szczegóły →</span>
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      <HomeFinalCta />
      <Footer />
    </main>
  );
}
