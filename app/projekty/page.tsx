import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Projekty Power BI – dashboardy i raporty | pbix.pl',
  description:
    'Przykładowe realizacje Power BI dla firm produkcyjnych, FMCG, logistyki i retail. Dashboardy sprzedażowe, raportowanie finansowe, HR analytics, monitoring łańcucha dostaw — dane zamienione w realne decyzje biznesowe.',
  keywords: [
    'projekty Power BI', 'dashboard Power BI', 'raportowanie Power BI',
    'wdrożenie Power BI', 'Power BI dla firm', 'case study Power BI',
    'automatyzacja raportowania', 'analityka danych',
  ],
  openGraph: {
    title: 'Projekty Power BI – realizacje i case studies | pbix.pl',
    description: 'Jak Power BI transformuje dane w wartość biznesową — przykładowe wdrożenia.',
    url: 'https://www.pbix.pl/projekty',
    siteName: 'pbix.pl',
    locale: 'pl_PL',
    type: 'website',
  },
  alternates: { canonical: 'https://www.pbix.pl/projekty' },
};

const projects = [
  {
    id: 1,
    industry: 'FMCG / Handel detaliczny',
    title: 'Dashboard sprzedażowy w czasie rzeczywistym',
    challenge:
      'Ponad 30 raportów Excelowych wysyłanych mailem co tydzień. Zarząd nie miał jednego widoku KPI — każdy dział pracował na własnych danych.',
    solution:
      'Dashboard Power BI z danymi na żywo z systemu ERP i SQL Server. Jeden raport zastąpił całe pakiety plików. Automatyczny refresh co noc, dostęp przez Power BI Service z każdego urządzenia.',
    result:
      '80% mniej czasu poświęcanego na raportowanie. Codzienna widoczność KPI dla całego zarządu. Analitycy skupiają się na wnioskach, nie na zbieraniu danych.',
    tags: ['Power BI', 'SQL Server', 'DAX', 'Power BI Service'],
    accent: '#1e9953',
    bars: [45, 62, 55, 78, 65, 88, 72, 84, 68, 94, 80, 100],
  },
  {
    id: 2,
    industry: 'Produkcja',
    title: 'Automatyzacja zamknięcia miesiąca',
    challenge:
      'Zamknięcie miesiąca zajmowało 2 tygodnie ręcznego zbierania danych z SAP, Excela i baz danych. Błędy ludzkie, opóźnione decyzje.',
    solution:
      'Pipeline Power Query + Power BI łączący SAP, SQL Server i arkusze kalkulacyjne. Automatyczny refresh każdej nocy. Model danych zamiast ręcznych konsolidacji.',
    result:
      'Czas przygotowania raportu miesięcznego skrócony z 14 do 2 dni. Zero błędów wynikających z ręcznego kopiowania danych.',
    tags: ['Power BI', 'Power Query', 'SAP connector', 'SQL Server'],
    accent: '#0066cc',
    bars: [30, 45, 38, 60, 52, 75, 68, 80, 72, 88, 76, 92],
  },
  {
    id: 3,
    industry: 'Handel detaliczny — 200+ sklepów',
    title: 'Platforma analityki HR',
    challenge:
      'Brak jednego źródła danych o zatrudnieniu, rotacji i absencji. Managerowie regionalni podejmowali decyzje kadrowe w ciemno.',
    solution:
      'Automatyczny model danych HR w Power BI z cotygodniowym odświeżaniem. Row Level Security — każdy manager widzi tylko swój region. Raporty absencji, rotacji i kosztów nadgodzin.',
    result:
      'Decyzje kadrowe oparte na danych. Identyfikacja wzorców rotacji pozwoliła zredukować koszty rekrutacji o kilkanaście procent w skali roku.',
    tags: ['Power BI', 'Power Query', 'RLS', 'DAX'],
    accent: '#9333ea',
    bars: [55, 48, 62, 58, 70, 65, 78, 74, 82, 78, 88, 85],
  },
  {
    id: 4,
    industry: 'Logistyka',
    title: 'Monitoring łańcucha dostaw',
    challenge:
      'Dane o dostawach rozrzucone w WMS, TMS i ERP. Brak widoczności na realizację SLA w czasie rzeczywistym — problemy wykrywane dopiero po fakcie.',
    solution:
      'Power BI Gateway łączący 3 systemy. Zunifikowany dashboard dostaw z alertami o zagrożonych SLA. Interaktywna mapa tras i analiza punktualności według przewoźnika.',
    result:
      'Terminowość dostaw poprawiona o 12 pp w ciągu 6 miesięcy. Problemy operacyjne wykrywane i eskalowane zanim naruszą SLA.',
    tags: ['Power BI', 'Power BI Gateway', 'DAX', 'Power Query'],
    accent: '#ea6c00',
    bars: [40, 55, 48, 65, 58, 72, 66, 79, 73, 86, 80, 94],
  },
];

const techSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Projekty Power BI – realizacje i case studies',
  description:
    'Przykładowe wdrożenia Power BI dla firm z sektorów FMCG, produkcji, handlu detalicznego i logistyki. Dashboardy, raportowanie finansowe, HR analytics, monitoring dostaw.',
  url: 'https://www.pbix.pl/projekty',
  author: {
    '@type': 'Person',
    name: 'Radosław Sobczak',
    jobTitle: 'Microsoft Certified Trainer (MCT)',
    url: 'https://www.pbix.pl',
  },
};

export default function ProjektyPage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techSchema) }}
      />
      <Navbar />

      {/* ── HERO ──────────────────────────────────── */}
      <section style={{ padding: '140px 24px 80px', textAlign: 'center' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: '#6e6e73', marginBottom: '16px' }}>
            Realizacje
          </div>
          <h1 style={{ fontSize: 'clamp(44px, 8vw, 72px)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-2.5px', lineHeight: 1.05, margin: '0 0 20px' }}>
            Projekty Power BI
          </h1>
          <p style={{ fontSize: '18px', color: '#6e6e73', lineHeight: 1.65, margin: '0 0 36px', fontWeight: 400 }}>
            Dane same w sobie nic nie znaczą — wartość tworzą raporty i dashboardy, na podstawie których ludzie podejmują lepsze decyzje. Poniżej kilka przykładów tego, co można zbudować z Power BI.
          </p>
          <Link
            href="/kontakt"
            style={{
              background: '#1e9953', color: 'white', textDecoration: 'none',
              padding: '14px 28px', borderRadius: '980px', fontSize: '14px', fontWeight: 600,
              boxShadow: '0 4px 20px rgba(30,153,83,0.3)',
            }}
          >
            Porozmawiaj o swoim projekcie
          </Link>
        </div>
      </section>

      {/* ── PROJECTS ──────────────────────────────── */}
      <section style={{ padding: '0 24px 120px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {projects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.06}>
              <div style={{
                background: '#ffffff',
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              }}>
                {/* Accent bar */}
                <div style={{ height: '4px', background: project.accent }} />
                <div className="project-card-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 0 }}>
                  {/* Left: text */}
                  <div style={{ padding: '44px 48px' }}>
                    <div style={{
                      display: 'inline-block',
                      fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px',
                      color: project.accent, fontWeight: 600,
                      background: `${project.accent}12`,
                      border: `1px solid ${project.accent}28`,
                      borderRadius: '980px', padding: '4px 12px', marginBottom: '18px',
                    }}>
                      {project.industry}
                    </div>
                    <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 700, color: '#1d1d1f', margin: '0 0 32px', letterSpacing: '-0.5px', lineHeight: 1.25 }}>
                      {project.title}
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                      {[
                        { label: 'Wyzwanie', text: project.challenge, icon: '⚡' },
                        { label: 'Rozwiązanie', text: project.solution, icon: '🔧' },
                        { label: 'Rezultat', text: project.result, icon: '📈' },
                      ].map(({ label, text, icon }) => (
                        <div key={label} style={{ display: 'flex', gap: '16px' }}>
                          <div style={{
                            width: '36px', height: '36px', flexShrink: 0,
                            background: 'rgba(0,0,0,0.04)', borderRadius: '10px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '16px',
                          }}>{icon}</div>
                          <div>
                            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.2px', color: '#6e6e73', fontWeight: 600, marginBottom: '5px' }}>{label}</div>
                            <p style={{ color: '#1d1d1f', fontSize: '14px', lineHeight: 1.75, margin: 0 }}>{text}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '28px' }}>
                      {project.tags.map(tag => (
                        <span key={tag} style={{
                          fontSize: '11px', fontWeight: 600, color: '#6e6e73',
                          background: 'rgba(0,0,0,0.05)', borderRadius: '980px',
                          padding: '4px 10px', letterSpacing: '0.2px',
                        }}>{tag}</span>
                      ))}
                    </div>
                  </div>

                  {/* Right: abstract dashboard mockup */}
                  <div style={{
                    background: `linear-gradient(145deg, ${project.accent}18 0%, ${project.accent}08 100%)`,
                    borderLeft: '1px solid rgba(0,0,0,0.06)',
                    padding: '44px 32px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <div style={{
                      background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255,255,255,0.9)',
                      borderRadius: '16px', padding: '20px', width: '100%',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                    }}>
                      {/* Fake window chrome */}
                      <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
                        {['#ef4444', '#f59e0b', '#22c55e'].map(c => (
                          <div key={c} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }} />
                        ))}
                      </div>
                      {/* KPI tiles */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                        {(['KPI 1', '+24%', 'KPI 2', '98.2%'] as const).reduce<[string, string][]>((acc, _, j, arr) => {
                          if (j % 2 === 0) acc.push([arr[j], arr[j + 1]]);
                          return acc;
                        }, []).map(([label, val]) => (
                          <div key={label} style={{ background: `${project.accent}10`, borderRadius: '8px', padding: '10px' }}>
                            <div style={{ fontSize: '9px', color: '#6e6e73', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
                            <div style={{ fontSize: '16px', fontWeight: 700, color: project.accent }}>{val}</div>
                          </div>
                        ))}
                      </div>
                      {/* Bar chart */}
                      <div style={{ background: `${project.accent}08`, borderRadius: '8px', padding: '12px', height: '64px', display: 'flex', alignItems: 'flex-end', gap: '3px' }}>
                        {project.bars.map((h, idx) => (
                          <div key={idx} style={{
                            flex: 1, height: `${h}%`,
                            background: `${project.accent}${Math.round(40 + h * 0.55).toString(16)}`,
                            borderRadius: '2px 2px 0 0',
                          }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────── */}
      <section style={{ padding: '0 24px 120px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{
              background: 'linear-gradient(135deg, #003d20 0%, #1e9953 55%, #006633 100%)',
              borderRadius: '28px', padding: '56px 48px', textAlign: 'center',
            }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,0.55)', marginBottom: '14px' }}>
                Własny projekt?
              </div>
              <h2 style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.8px', margin: '0 0 14px', lineHeight: 1.2 }}>
                Zbudujmy coś razem.
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '15px', lineHeight: 1.75, margin: '0 0 32px' }}>
                Opowiedz mi o swoich danych i celach — zaproponuję, jak Power BI może rozwiązać konkretny problem w Twojej firmie.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/kontakt" style={{ background: '#fff', color: '#1e9953', textDecoration: 'none', padding: '14px 28px', borderRadius: '980px', fontSize: '14px', fontWeight: 700 }}>
                  Napisz do mnie
                </Link>
                <Link href="/szkolenia" style={{ border: '1.5px solid rgba(255,255,255,0.35)', color: '#fff', textDecoration: 'none', padding: '14px 28px', borderRadius: '980px', fontSize: '14px', fontWeight: 500 }}>
                  Zobacz szkolenia
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .project-card-grid {
            grid-template-columns: 1fr !important;
          }
          .project-card-grid > div:last-child {
            border-left: none !important;
            border-top: 1px solid rgba(0,0,0,0.06);
            padding: 32px 28px !important;
          }
          .project-card-grid > div:first-child {
            padding: 32px 28px !important;
          }
        }
      `}</style>
    </main>
  );
}
