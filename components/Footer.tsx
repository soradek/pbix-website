import Link from 'next/link';

interface FooterProps {
  lang?: 'pl' | 'en';
}

export default function Footer({ lang = 'pl' }: FooterProps) {
  const isEn = lang === 'en';

  const trainingLinks = isEn
    ? [
        { label: 'Power BI', href: '/en/trainings?category=Power+BI' },
        { label: 'Excel', href: '/en/trainings?category=Excel' },
        { label: 'SQL', href: '/en/trainings?category=SQL' },
        { label: 'Data Visualization', href: '/en/trainings?category=Wizualizacja+danych' },
      ]
    : [
        { label: 'Power BI', href: '/szkolenia?kategoria=Power+BI' },
        { label: 'Excel', href: '/szkolenia?kategoria=Excel' },
        { label: 'SQL', href: '/szkolenia?kategoria=SQL' },
        { label: 'Wizualizacja danych', href: '/szkolenia?kategoria=Wizualizacja+danych' },
      ];

  const navLinks = isEn
    ? [
        { href: '/en', label: 'Home' },
        { href: '/en/trainings', label: 'Trainings' },
        { href: '/en/projects', label: 'Projects' },
        { href: '/en/contact', label: 'Contact' },
      ]
    : [
        { href: '/', label: 'Strona główna' },
        { href: '/szkolenia', label: 'Szkolenia' },
        { href: '/projekty', label: 'Projekty' },
        { href: '/kontakt', label: 'Kontakt' },
      ];

  return (
    <footer style={{ background: '#f5f5f7', borderTop: '1px solid rgba(0,0,0,0.08)', padding: '60px 24px 40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '48px' }}>
          <div>
            <div style={{ fontSize: '20px', fontWeight: 600, color: '#1d1d1f', marginBottom: '8px' }}>pbix.pl</div>
            <div style={{ fontSize: '13px', color: '#6e6e73', lineHeight: 1.6, maxWidth: '260px' }}>
              {isEn
                ? 'The best of Excel, Power BI and SQL in one place.'
                : 'Maksimum możliwości Excela, Power BI i SQL w jednym miejscu.'}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: '#6e6e73', marginBottom: '16px' }}>
              {isEn ? 'Trainings' : 'Szkolenia'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {trainingLinks.map(link => (
                <Link key={link.label} href={link.href} style={{ color: '#1d1d1f', textDecoration: 'none', fontSize: '14px', opacity: 0.7 }}>{link.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: '#6e6e73', marginBottom: '16px' }}>
              {isEn ? 'Navigation' : 'Nawigacja'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {navLinks.map(link => (
                <Link key={link.label} href={link.href} style={{ color: '#1d1d1f', textDecoration: 'none', fontSize: '14px', opacity: 0.7 }}>{link.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: '#6e6e73', marginBottom: '16px' }}>
              {isEn ? 'Contact' : 'Kontakt'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="mailto:kontakt@pbix.pl" style={{ color: '#1e9953', textDecoration: 'none', fontSize: '14px' }}>kontakt@pbix.pl</a>
              <div style={{ color: '#6e6e73', fontSize: '13px' }}>
                {isEn ? 'Microsoft Certified Trainer (MCT)' : 'Certyfikowany Trener Microsoft (MCT)'}
              </div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ color: '#6e6e73', fontSize: '13px' }}>© 2025 Radosław Sobczak | pbix.pl</div>
          <div style={{ color: '#6e6e73', fontSize: '13px' }}>
            {isEn
              ? 'Power BI, Excel, SQL trainings across Poland'
              : 'Szkolenia z Power BI, Excel, SQL w całej Polsce'}
          </div>
        </div>
      </div>
    </footer>
  );
}
