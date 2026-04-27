import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { trainings } from '@/data/trainings';
import { IconArrowRight } from '@/components/Icons';

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
  // SVG is supported by Twitter and Slack but unreliable on Facebook/LinkedIn —
  // we list it AFTER the default raster og.jpg so platforms that do not handle SVG
  // fall back to the site default.
  const ogImages = [
    { url: 'https://www.pbix.pl/og.jpg', width: 1200, height: 630, alt: post.title },
    ...(post.coverImage ? [{ url: `https://www.pbix.pl${post.coverImage}`, width: 1200, height: 630, alt: post.title }] : []),
  ];
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
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: ogImages.map((i) => i.url),
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
    image: post.coverImage
      ? [`https://www.pbix.pl${post.coverImage}`, 'https://www.pbix.pl/og.jpg']
      : ['https://www.pbix.pl/og.jpg'],
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

  return (
    <main style={{ background: '#ffffff' }}>
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article style={{ padding: '120px 24px 80px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <Link
            href="/blog"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#6e6e73', textDecoration: 'none', fontSize: '13px', marginBottom: '24px' }}
          >
            ← Wszystkie artykuły
          </Link>

          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: '#1e9953', fontWeight: 600, marginBottom: '16px' }}>
            {post.category}
          </div>

          <h1 style={{ fontSize: 'clamp(32px, 5vw, 46px)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-1.5px', lineHeight: 1.15, margin: '0 0 20px' }}>
            {post.title}
          </h1>

          <div style={{ fontSize: '14px', color: '#6e6e73', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.readingTime} czytania</span>
          </div>

          {post.coverImage && (
            <div style={{ borderRadius: '20px', overflow: 'hidden', marginBottom: '40px', background: '#0f3a22', aspectRatio: '1200 / 630' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.coverImage}
                alt={`Ilustracja artykułu: ${post.title}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          )}

          <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '32px' }}>
            <Post />
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section style={{ padding: '60px 24px 100px', background: '#f9f9f9' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.6px', margin: '0 0 32px', textAlign: 'center' }}>
              Powiązane szkolenia
            </h2>

            <div className="training-grid">
              {related.map((t) => (
                <Link
                  key={t.slug}
                  href={`/szkolenia/${t.slug}`}
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <div
                    style={{
                      background: '#ffffff',
                      border: '1px solid rgba(0,0,0,0.08)',
                      borderRadius: '20px',
                      padding: '24px',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}
                  >
                    <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#1e9953', fontWeight: 600 }}>
                      {t.category}
                    </div>
                    <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#1d1d1f', margin: 0, lineHeight: 1.35 }}>
                      {t.title}
                    </h3>
                    <p style={{ color: '#6e6e73', fontSize: '13px', lineHeight: 1.6, margin: 0, flex: 1 }}>
                      {t.description.substring(0, 90)}...
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: '#1d1d1f' }}>{t.priceLabel}</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#1e9953', fontSize: '13px', fontWeight: 500 }}>
                        Szczegóły <IconArrowRight size={14} color="#1e9953" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
