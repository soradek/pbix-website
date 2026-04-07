import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: '#f5f5f7', borderTop: '1px solid rgba(0,0,0,0.08)', padding: '60px 24px 40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '48px' }}>
          <div>
            <div style={{ fontSize: '20px', fontWeight: 600, color: '#1d1d1f', marginBottom: '8px' }}>pbix.pl</div>
            <div style={{ fontSize: '13px', color: '#6e6e73', lineHeight: 1.6, maxWidth: '260px' }}>
              Maksimum możliwości Excela, Power BI i SQL w jednym miejscu.
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: '#6e6e73', marginBottom: '16px' }}>Szkolenia</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Power BI', 'Excel', 'SQL', 'Wizualizacja danych'].map(cat => (
                <Link key={cat} href={`/szkolenia?kategoria=${cat.toLowerCase().replace(' ', '-')}`} style={{ color: '#1d1d1f', textDecoration: 'none', fontSize: '14px', opacity: 0.7 }}>{cat}</Link>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: '#6e6e73', marginBottom: '16px' }}>Nawigacja</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { href: '/', label: 'Strona główna' },
                { href: '/szkolenia', label: 'Szkolenia' },
                { href: '/kontakt', label: 'Kontakt' },
                { href: '/zapisy', label: 'Zapisz się' },
              ].map(link => (
                <Link key={link.href} href={link.href} style={{ color: '#1d1d1f', textDecoration: 'none', fontSize: '14px', opacity: 0.7 }}>{link.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: '#6e6e73', marginBottom: '16px' }}>Kontakt</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="mailto:kontakt@pbix.pl" style={{ color: '#1e9953', textDecoration: 'none', fontSize: '14px' }}>kontakt@pbix.pl</a>
              <div style={{ color: '#6e6e73', fontSize: '13px' }}>Certyfikowany Trener Microsoft (MCT)</div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ color: '#6e6e73', fontSize: '13px' }}>© 2025 Radosław Sobczak | pbix.pl</div>
          <div style={{ color: '#6e6e73', fontSize: '13px' }}>Szkolenia z Power BI, Excel, SQL w całej Polsce</div>
        </div>
      </div>
    </footer>
  );
}
