import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import { IconAlertCircle, IconWrench, IconResult, IconArrowRight } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Power BI Projects – Dashboards & Reporting | pbix.pl',
  description:
    'Power BI implementations for manufacturing, FMCG, retail and logistics companies. Sales dashboards, financial reporting automation, HR analytics and supply chain monitoring.',
  keywords: [
    'Power BI projects', 'Power BI dashboard', 'Power BI implementation',
    'reporting automation', 'Power BI case study', 'data analytics Poland',
  ],
  openGraph: {
    title: 'Power BI Projects – Dashboards & Reporting | pbix.pl',
    description: 'How Power BI transforms data into business value — selected implementations.',
    url: 'https://www.pbix.pl/en/projects',
    siteName: 'pbix.pl',
    locale: 'en_US',
    type: 'website',
  },
  alternates: { canonical: 'https://www.pbix.pl/en/projects' },
};

const projects = [
  {
    industry: 'FMCG / Retail',
    title: 'Real-time Sales Performance Dashboard',
    problem:
      'Management received 30+ Excel reports every week — each department sent its own file with its own KPI definitions. No one knew which numbers were current.',
    solution:
      'A single Power BI dashboard fed directly from the ERP and SQL Server. A central data model with unified KPI definitions, automatic nightly refresh, accessible from any device via Power BI Service.',
    result: '80% less time spent on reporting. One view for the entire board — updated every morning.',
    tags: ['Power BI', 'SQL Server', 'DAX', 'Power BI Service'],
    accent: '#1e9953',
    bars: [40, 58, 48, 72, 62, 85, 70, 80, 66, 92, 78, 100],
    kpis: [{ label: 'Revenue', val: '+18%' }, { label: 'Margin', val: '22.4%' }],
  },
  {
    industry: 'Manufacturing',
    title: 'Month-End Close Automation',
    problem:
      'Closing the month took two weeks of manually gathering data from SAP, spreadsheets and databases. Copy-paste errors and delayed decisions were the norm.',
    solution:
      'A Power Query pipeline connecting SAP, SQL Server and Excel files into a single data model. Automatic nightly refresh eliminates manual consolidation — analysts work with ready-made reports.',
    result: 'Monthly report preparation cut from 14 days to 2. Zero errors from manual copy-pasting.',
    tags: ['Power BI', 'Power Query', 'SAP Connector', 'SQL Server'],
    accent: '#2563eb',
    bars: [55, 42, 68, 50, 75, 60, 82, 70, 88, 76, 94, 85],
    kpis: [{ label: 'Close time', val: '−86%' }, { label: 'Errors', val: '0' }],
  },
  {
    industry: 'Retail — 200+ stores',
    title: 'HR Analytics Platform',
    problem:
      'No single source of truth for headcount, turnover and absence data across a network of 200+ stores. Each regional manager kept their own Excel. Workforce decisions were made without data.',
    solution:
      'An automated HR data model in Power BI with weekly refresh. Row Level Security limits each manager\'s view to their own region. One report replaced dozens of spreadsheets.',
    result: 'Workforce decisions backed by data. Identified turnover patterns reduced annual recruitment costs.',
    tags: ['Power BI', 'Power Query', 'Row Level Security', 'DAX'],
    accent: '#7c3aed',
    bars: [62, 55, 70, 65, 78, 72, 84, 80, 88, 85, 92, 90],
    kpis: [{ label: 'Turnover', val: '−15%' }, { label: 'Regions', val: '12' }],
  },
  {
    industry: 'Logistics',
    title: 'Supply Chain KPI Monitoring',
    problem:
      'Delivery data scattered across three systems: WMS, TMS and ERP. No real-time SLA visibility — breaches were discovered only after the fact.',
    solution:
      'Power BI Gateway connecting all three operational systems without migrating data. A unified delivery dashboard with SLA-at-risk alerts and on-time performance analysis by carrier.',
    result: 'On-time delivery improved by 12 percentage points in 6 months. Issues escalated before SLA breaches occur.',
    tags: ['Power BI', 'Power BI Gateway', 'DAX', 'Power Query'],
    accent: '#ea6c00',
    bars: [38, 52, 44, 62, 55, 70, 64, 78, 72, 86, 80, 94],
    kpis: [{ label: 'On-time SLA', val: '+12pp' }, { label: 'Systems', val: '3' }],
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
  name: 'Power BI Projects – Dashboards & Reporting',
  description: 'Power BI implementations for FMCG, manufacturing, retail and logistics companies.',
  url: 'https://www.pbix.pl/en/projects',
  inLanguage: 'en',
  author: { '@type': 'Person', name: 'Radosław Sobczak', jobTitle: 'Microsoft Certified Trainer (MCT)', url: 'https://www.pbix.pl' },
};

export default function ProjectsEnPage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ padding: '140px 24px 72px', textAlign: 'center', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: '#6e6e73', marginBottom: '16px' }}>Case studies</div>
          <h1 style={{ fontSize: 'clamp(44px, 8vw, 76px)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-2.5px', lineHeight: 1.05, margin: '0 0 20px' }}>
            Power BI Projects
          </h1>
          <p style={{ fontSize: '18px', color: '#6e6e73', lineHeight: 1.65, margin: '0 0 36px', maxWidth: '560px', marginLeft: 'auto', marginRight: 'auto' }}>
            Data on its own doesn&apos;t create value — reports and dashboards do, by helping people make better decisions.
          </p>
          <Link href="/en/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#1e9953', color: '#fff', textDecoration: 'none', padding: '13px 28px', borderRadius: '980px', fontSize: '14px', fontWeight: 600 }}>
            Discuss your project <IconArrowRight size={14} color="#fff" />
          </Link>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section style={{ padding: '0 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {projects.map((p, i) => {
            const textOnLeft = i % 2 === 0;

            const textBlock = (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                <div>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase' as const, letterSpacing: '1.8px', color: p.accent, fontWeight: 700, marginBottom: '10px' }}>
                    {p.industry}
                  </div>
                  <h2 style={{ fontSize: 'clamp(22px, 2.8vw, 30px)', fontWeight: 700, color: '#1d1d1f', margin: 0, letterSpacing: '-0.6px', lineHeight: 1.25 }}>
                    {p.title}
                  </h2>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '8px', flexDirection: 'row' }}>
                    <IconAlertCircle size={14} color="#6e6e73" strokeWidth={2} />
                    <span style={{ fontSize: '10px', textTransform: 'uppercase' as const, letterSpacing: '1.4px', color: '#6e6e73', fontWeight: 700 }}>Problem</span>
                  </div>
                  <p style={{ margin: 0, color: '#3d3d3f', fontSize: '15px', lineHeight: 1.8 }}>{p.problem}</p>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '8px', flexDirection: 'row' }}>
                    <IconWrench size={14} color="#6e6e73" strokeWidth={2} />
                    <span style={{ fontSize: '10px', textTransform: 'uppercase' as const, letterSpacing: '1.4px', color: '#6e6e73', fontWeight: 700 }}>Solution</span>
                  </div>
                  <p style={{ margin: 0, color: '#3d3d3f', fontSize: '15px', lineHeight: 1.8 }}>{p.solution}</p>
                </div>

                <div style={{ borderLeft: `3px solid ${p.accent}`, paddingLeft: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '8px' }}>
                    <IconResult size={14} color={p.accent} strokeWidth={2} />
                    <span style={{ fontSize: '10px', textTransform: 'uppercase' as const, letterSpacing: '1.4px', color: p.accent, fontWeight: 700 }}>Result</span>
                  </div>
                  <p style={{ margin: 0, color: '#1d1d1f', fontSize: '15px', lineHeight: 1.7, fontWeight: 500 }}>{p.result}</p>
                </div>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' as const }}>
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
                Let&apos;s build something together.
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '15px', lineHeight: 1.75, margin: '0 0 32px' }}>
                Tell me about your data and goals — I&apos;ll suggest how Power BI can solve a specific problem in your organisation.
              </p>
              <div className="cta-group" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/en/contact" style={{ background: '#fff', color: '#1e9953', textDecoration: 'none', padding: '14px 28px', borderRadius: '980px', fontSize: '14px', fontWeight: 700 }}>
                  Get in touch
                </Link>
                <Link href="/en/trainings" style={{ border: '1.5px solid rgba(255,255,255,0.35)', color: '#fff', textDecoration: 'none', padding: '14px 28px', borderRadius: '980px', fontSize: '14px', fontWeight: 500 }}>
                  View trainings
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer lang="en" />

      <style>{`
        @media (max-width: 768px) {
          .project-row { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </main>
  );
}
