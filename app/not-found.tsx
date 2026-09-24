import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <main style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <Navbar />
      <section style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <h1 style={{ fontSize: 'var(--fs-display)', fontWeight: 500, color: 'var(--text)', letterSpacing: 'var(--ls-display)', lineHeight: 'var(--lh-display)', margin: '0 0 24px' }}>
            404
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 'var(--fs-lead)', lineHeight: 1.65, margin: '0 0 40px' }}>
            Ta strona nie istnieje. Mogła zostać przeniesiona lub adres URL jest nieprawidłowy.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/"
              style={{
                background: 'var(--accent)', color: 'var(--white)', textDecoration: 'none',
                padding: '13px 28px', borderRadius: '980px', fontSize: 'var(--fs-small)', fontWeight: 600,
              }}
            >
              Strona główna
            </Link>
            <Link
              href="/szkolenia"
              style={{
                background: 'transparent', color: 'var(--text)', textDecoration: 'none',
                padding: '13px 28px', borderRadius: '980px', fontSize: 'var(--fs-small)', fontWeight: 500,
                border: '1px solid rgba(0,0,0,0.12)',
              }}
            >
              Zobacz szkolenia
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
