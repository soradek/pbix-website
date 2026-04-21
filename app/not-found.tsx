import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <Navbar />
      <section style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: '#6e6e73', marginBottom: '16px' }}>Błąd 404</div>
          <h1 style={{ fontSize: 'clamp(52px, 10vw, 96px)', fontWeight: 800, color: '#1d1d1f', letterSpacing: '-3px', lineHeight: 1, margin: '0 0 24px' }}>
            404
          </h1>
          <p style={{ color: '#6e6e73', fontSize: '17px', lineHeight: 1.65, margin: '0 0 40px' }}>
            Ta strona nie istnieje. Mogła zostać przeniesiona lub adres URL jest nieprawidłowy.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/"
              style={{
                background: '#1e9953', color: '#ffffff', textDecoration: 'none',
                padding: '13px 28px', borderRadius: '980px', fontSize: '14px', fontWeight: 600,
              }}
            >
              Strona główna
            </Link>
            <Link
              href="/szkolenia"
              style={{
                background: 'transparent', color: '#1d1d1f', textDecoration: 'none',
                padding: '13px 28px', borderRadius: '980px', fontSize: '14px', fontWeight: 500,
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
