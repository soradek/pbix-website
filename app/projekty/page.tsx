import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import { IconAlertCircle, IconWrench, IconResult, IconArrowRight } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Projekty Power BI – realizacje i wdrożenia | pbix.pl',
  description:
    'Przykładowe wdrożenia Power BI dla firm produkcyjnych, FMCG, logistyki i retail. Dashboardy sprzedażowe, automatyzacja raportowania finansowego, HR analytics, monitoring łańcucha dostaw.',
  keywords: [
    'projekty Power BI', 'wdrożenie Power BI', 'dashboard Power BI',
    'automatyzacja raportowania', 'Power BI case study',
  ],
  openGraph: {
    title: 'Projekty Power BI – realizacje i wdrożenia | pbix.pl',
    description: 'Jak Power BI transformuje dane w wartość biznesową — przykładowe realizacje.',
    url: 'https://www.pbix.pl/projekty',
    siteName: 'pbix.pl',
    locale: 'pl_PL',
    type: 'website',
  },
  alternates: { canonical: 'https://www.pbix.pl/projekty' },
};

const projects = [
  {
    industry: 'FMCG / Handel detaliczny',
    title: 'Dashboard sprzedażowy w czasie rzeczywistym',
    problem:
      'Zarząd otrzymywał ponad 30 raportów Excelowych tygodniowo — każdy dział wysyłał własny plik, bez wspólnej definicji KPI. Nikt nie wiedział, które liczby są aktualne.',
    solution:
      'Jeden dashboard Power BI zasilany bezpośrednio z systemu ERP i SQL Server. Model danych z centralną definicją KPI, automatyczny refresh każdej nocy, dostępny z każdego urządzenia przez Power BI Service.',
    result:
      '80% mniej czasu na raportowanie. Jeden widok dla całego zarządu — aktualizowany każdego ranka.',
    tags: ['Power BI', 'SQL Server', 'DAX', 'Power BI Service'],
    accent: '#1e9953',
    bars: [40, 58, 48, 72, 62, 85, 70, 80, 66, 92, 78, 100],
    kpis: [{ label: 'Sprzedaż', val: '+18%' }, { label: 'Marża', val: '22.4%' }],
  },
  {
    industry: 'Produkcja',
    title: 'Automatyzacja zamknięcia miesiąca',
    problem:
      'Zamknięcie miesiąca zajmowało dwa tygodnie ręcznego zbierania danych z SAP, arkuszy kalkulacyjnych i baz danych. Błędy kopiowania i opóźnione decyzje były normą.',
    solution:
      'Pipeline Power Query łączący SAP, SQL Server i pliki Excel w jeden model danych. Automatyczny refresh każdej nocy eliminuje ręczną konsolidację — analitycy pracują na gotowych raportach.',
    result:
      'Czas przygotowania raportu miesięcznego skrócony z 14 do 2 dni. Zero błędów wynikających z ręcznego kopiowania.',
    tags: ['Power BI', 'Power Query', 'SAP Connector', 'SQL Server'],
    accent: '#2563eb',
    bars: [55, 42, 68, 50, 75, 60, 82, 70, 88, 76, 94, 85],
    kpis: [{ label: 'Czas close', val: '−86%' }, { label: 'Błędy', val: '0' }],
  },
  {
    industry: 'Handel detaliczny — 200+ sklepów',
    title: 'Platforma analityki HR',
    problem:
      'Brak jednego źródła danych o zatrudnieniu, rotacji i absencji w sieci ponad 200 sklepów. Każdy manager regionalny prowadził własny Excela. Decyzje kadrowe były podejmowane bez danych.',
    solution:
      'Automatyczny model danych HR w Power BI z cotygodniowym odświeżaniem. Row Level Security ogranicza widok do własnego regionu. Jeden raport zastąpił dziesiątki arkuszy.',
    result:
      'Decyzje kadrowe oparte na danych. Wykryte wzorce rotacji pozwoliły obniżyć koszty rekrutacji w skali roku.',
    tags: ['Power BI', 'Power Query', 'Row Level Security', 'DAX'],
    accent: '#7c3aed',
    bars: [62, 55, 70, 65, 78, 72, 84, 80, 88, 85, 92, 90],
    kpis: [{ label: 'Rotacja', val: '−15%' }, { label: 'Regiony', val: '12' }],
  },
  {
    industry: 'Logistyka',
    title: 'Monitoring łańcucha dostaw',
    problem:
      'Dane o dostawach rozrzucone w trzech systemach: WMS, TMS i ERP. Brak widoczności na realizację SLA w czasie rzeczywistym — naruszenia wykrywano dopiero po fakcie.',
    solution:
      'Power BI Gateway łączący trzy systemy operacyjne bez migracji danych. Zunifikowany dashboard dostaw z alertami o zagrożonych SLA i analizą punktualności według przewoźnika.',
    result:
      'Terminowość dostaw poprawiona o 12 pp w ciągu 6 miesięcy. Problemy eskalowane zanim naruszą umowę.',
    tags: ['Power BI', 'Power BI Gateway', 'DAX', 'Power Query'],
    accent: '#ea6c00',
    bars: [38, 52, 44, 62, 55, 70, 64, 78, 72, 86, 80, 94],
    kpis: [{ label: 'SLA', val: '+12pp' }, { label: 'Systemy', val: '3' }],
  },
];

function Mockup({ accent, bars, kpis }: { accent: string; bars: number[]; kpis: { label: string; val: string }[] }) {
  return (
    <div style={{ background: '#f8f9fa', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
      <div style={{ display: 'flex', gap: '6px', marginBottom: '20px' }}>
        {['#ef4444', '#f59e0b', '#22c55e'].map(c => (
          <div key={c} style={{ width: '9px', height: '9px', borderRadius: '50%', background: c }} />
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
        {kpis.map(({ label, val }) => (
          <div key={label} style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '10px', padding: '14px 16px' }}>
            <div style={{ fontSize: '10px', color: '#6e6e73', textTransform: 'uppercase' as const, letterSpacing: '0.8px', marginBottom: '6px', fontWeight: 600 }}>{label}</div>
            <div style={{ fontSize: '22px', fontWeight: 700, color: accent, letterSpacing: '-0.5px' }}>{val}</div>
          </div>
        ))}
      </div>
      <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '10px', padding: '16px', height: '80px', display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
        {bars.map((h, i) => (
          <div key={i} style={{ flex: 1, height: `${h}%`, background: i === bars.length - 1 ? accent : `${accent}55`, borderRadius: '3px 3px 0 0' }} />
        ))}
      </div>
    </div>
  );
}

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Projekty Power BI – realizacje i wdrożenia',
  description: 'Wdrożenia Power BI dla firm z sektorów FMCG, produkcji, handlu i logistyki.',
  url: 'https://www.pbix.pl/projekty',
  author: { '@type': 'Person', name: 'Radosław Sobczak', jobTitle: 'Microsoft Certified Trainer (MCT)', url: 'https://www.pbix.pl' },
};

export default function ProjektyPage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ padding: '140px 24px 72px', textAlign: 'center', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: '#6e6e73', marginBottom: '16px' }}>Realizacje</div>
          <h1 style={{ fontSize: 'clamp(44px, 8vw, 76px)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-2.5px', lineHeight: 1.05, margin: '0 0 20px' }}>
            Projekty Power BI
          </h1>
          <p style={{ fontSize: '18px', color: '#6e6e73', lineHeight: 1.65, margin: '0 0 36px', maxWidth: '560px', marginLeft: 'auto', marginRight: 'auto' }}>
            Dane same w sobie nie tworzą wartości — robią to raporty i dashboardy, na podstawie których ludzie podejmują lepsze decyzje.
          </p>
          <Link href="/kontakt" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#1e9953', color: '#fff', textDecoration: 'none', padding: '13px 28px', borderRadius: '980px', fontSize: '14px', fontWeight: 600 }}>
            Porozmawiaj o swoim projekcie <IconArrowRight size={14} color="#fff" />
          </Link>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section style={{ padding: '0 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {projects.map((p, i) => {
            const textOnLeft = i % 2 === 0;
            const align = textOnLeft ? 'left' : 'right';
            const labelDir = textOnLeft ? 'row' : 'row-reverse';
            const tagsJustify = textOnLeft ? 'flex-start' : 'flex-end';
            const resultBorder = textOnLeft
              ? { borderLeft: `3px solid ${p.accent}`, paddingLeft: '16px' }
              : { borderRight: `3px solid ${p.accent}`, paddingRight: '16px' };

            const textBlock = (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', textAlign: align }}>
                {/* industry + title */}
                <div>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase' as const, letterSpacing: '1.8px', color: p.accent, fontWeight: 700, marginBottom: '10px' }}>
                    {p.industry}
                  </div>
                  <h2 style={{ fontSize: 'clamp(22px, 2.8vw, 30px)', fontWeight: 700, color: '#1d1d1f', margin: 0, letterSpacing: '-0.6px', lineHeight: 1.25 }}>
                    {p.title}
                  </h2>
                </div>

                {/* problem */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '8px', flexDirection: labelDir as 'row' | 'row-reverse' }}>
                    <IconAlertCircle size={14} color="#6e6e73" strokeWidth={2} />
                    <span style={{ fontSize: '10px', textTransform: 'uppercase' as const, letterSpacing: '1.4px', color: '#6e6e73', fontWeight: 700 }}>Problem</span>
                  </div>
                  <p style={{ margin: 0, color: '#3d3d3f', fontSize: '15px', lineHeight: 1.8 }}>{p.problem}</p>
                </div>

                {/* solution */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '8px', flexDirection: labelDir as 'row' | 'row-reverse' }}>
                    <IconWrench size={14} color="#6e6e73" strokeWidth={2} />
                    <span style={{ fontSize: '10px', textTransform: 'uppercase' as const, letterSpacing: '1.4px', color: '#6e6e73', fontWeight: 700 }}>Rozwiązanie</span>
                  </div>
                  <p style={{ margin: 0, color: '#3d3d3f', fontSize: '15px', lineHeight: 1.8 }}>{p.solution}</p>
                </div>

                {/* result */}
                <div style={resultBorder}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '8px', flexDirection: labelDir as 'row' | 'row-reverse' }}>
                    <IconResult size={14} color={p.accent} strokeWidth={2} />
                    <span style={{ fontSize: '10px', textTransform: 'uppercase' as const, letterSpacing: '1.4px', color: p.accent, fontWeight: 700 }}>Rezultat</span>
                  </div>
                  <p style={{ margin: 0, color: '#1d1d1f', fontSize: '15px', lineHeight: 1.7, fontWeight: 500 }}>{p.result}</p>
                </div>

                {/* tags */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' as const, justifyContent: tagsJustify }}>
                  {p.tags.map(tag => (
                    <span key={tag} style={{ fontSize: '11px', fontWeight: 600, color: '#6e6e73', background: 'rgba(0,0,0,0.05)', borderRadius: '6px', padding: '4px 10px' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );

            const visualBlock = <Mockup accent={p.accent} bars={p.bars} kpis={p.kpis} />;

            return (
              <ScrollReveal key={p.title} delay={0.05}>
                <div style={{ padding: '80px 0', borderBottom: i < projects.length - 1 ? '1px solid rgba(0,0,0,0.07)' : 'none' }}>
                  <div className="project-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
                    {textOnLeft ? <>{textBlock}{visualBlock}</> : <>{visualBlock}{textBlock}</>}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '80px 24px 120px', borderTop: '1px solid rgba(0,0,0,0.07)' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ background: 'linear-gradient(135deg, #003d20 0%, #1e9953 55%, #006633 100%)', borderRadius: '28px', padding: '56px 48px', textAlign: 'center' }}>
              <h2 style={{ fontSize: 'clamp(22px, 2.8vw, 30px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.8px', margin: '0 0 14px' }}>
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
          .project-row { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </main>
  );
}
