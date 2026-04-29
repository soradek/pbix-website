import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { getAllPosts, getCategories } from '@/lib/blog';
import { IconArrowRight } from '@/components/Icons';

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
  const categories = getCategories();

  return (
    <main style={{ background: '#ffffff' }}>
      <Navbar />

      <section style={{ padding: '140px 24px 56px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: '#6e6e73', marginBottom: '16px' }}>
            Blog
          </div>
          <h1 style={{ fontSize: 'clamp(44px, 8vw, 76px)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-2.5px', lineHeight: 1.05, margin: '0 0 20px' }}>
            Co warto wiedzieć, a nie ma kogo spytać
          </h1>
          <p style={{ fontSize: '18px', color: '#6e6e73', lineHeight: 1.65, margin: 0, fontWeight: 400 }}>
            Praktyczne artykuły o Power BI, Excel, SQL i wizualizacji danych.<br />
            Z doświadczenia, nie z teorii.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 24px 56px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '48px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', background: '#1d1d1f', color: 'white', padding: '8px 16px', borderRadius: '980px', fontSize: '13px', fontWeight: 500 }}>
              Wszystkie ({posts.length})
            </span>
            {categories.map((cat) => (
              <span
                key={cat}
                style={{ display: 'inline-flex', alignItems: 'center', background: '#ffffff', color: '#6e6e73', padding: '8px 16px', borderRadius: '980px', fontSize: '13px', fontWeight: 500, border: '1px solid rgba(0,0,0,0.1)' }}
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="training-grid">
            {posts.map((post) => (
              <ScrollReveal key={post.slug}>
                <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <article
                    style={{
                      background: '#ffffff',
                      border: '1px solid rgba(0,0,0,0.08)',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.25s',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                    }}
                  >
                    {post.coverImage && (
                      <div style={{ width: '100%', aspectRatio: '1200 / 630', background: '#0f3a22', display: 'block' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.coverImage}
                          alt={`Ilustracja artykułu: ${post.title}`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div style={{ padding: '24px 26px 26px', display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
                    <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#1e9953', fontWeight: 600 }}>
                      {post.category}
                    </div>
                    <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1d1d1f', margin: 0, lineHeight: 1.3, letterSpacing: '-0.3px' }}>
                      {post.title}
                    </h2>
                    <p style={{ color: '#6e6e73', fontSize: '14px', lineHeight: 1.65, margin: 0, flex: 1 }}>
                      {post.excerpt}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid rgba(0,0,0,0.06)', marginTop: 'auto' }}>
                      <div style={{ fontSize: '12px', color: '#6e6e73' }}>
                        {formatDate(post.date)} · {post.readingTime}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#1e9953', fontSize: '13px', fontWeight: 500 }}>
                        Czytaj <IconArrowRight size={14} color="#1e9953" />
                      </div>
                    </div>
                    </div>
                  </article>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
