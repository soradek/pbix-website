import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Power BI Projects – Dashboards & Reporting | pbix.pl',
  description:
    'Real-world Power BI implementations for manufacturing, FMCG, retail and logistics companies. Sales dashboards, financial reporting automation, HR analytics and supply chain monitoring — data turned into business decisions.',
  keywords: [
    'Power BI projects', 'Power BI dashboard', 'Power BI reporting',
    'Power BI implementation', 'Power BI for business', 'Power BI case study',
    'reporting automation', 'data analytics Poland',
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
    id: 1,
    industry: 'FMCG / Retail',
    title: 'Real-time Sales Performance Dashboard',
    challenge:
      '30+ Excel reports distributed by email every week. No single KPI view for management — every department worked off its own data.',
    solution:
      'Live Power BI dashboard drawing data directly from the ERP and SQL Server. One report replaced an entire collection of files. Nightly automatic refresh, accessible from any device via Power BI Service.',
    result:
      '80% less time spent on reporting. Daily KPI visibility for the entire board. Analysts focus on insights, not data gathering.',
    tags: ['Power BI', 'SQL Server', 'DAX', 'Power BI Service'],
    accent: '#1e9953',
    bars: [45, 62, 55, 78, 65, 88, 72, 84, 68, 94, 80, 100],
  },
  {
    id: 2,
    industry: 'Manufacturing',
    title: 'Financial Month-End Close Automation',
    challenge:
      'Month-end close took two weeks of manual data gathering from SAP, Excel and databases. Human errors, delayed decisions.',
    solution:
      'Power Query + Power BI pipeline connecting SAP, SQL Server and spreadsheets. Automated nightly refresh. A data model replaced manual consolidations.',
    result:
      'Monthly report preparation time cut from 14 to 2 days. Zero errors caused by manual copy-paste. Finance team focuses on analysis, not wrangling data.',
    tags: ['Power BI', 'Power Query', 'SAP connector', 'SQL Server'],
    accent: '#0066cc',
    bars: [30, 45, 38, 60, 52, 75, 68, 80, 72, 88, 76, 92],
  },
  {
    id: 3,
    industry: 'Retail — 200+ stores',
    title: 'HR Analytics Platform',
    challenge:
      'No single source of truth for headcount, turnover and absence data across a network of stores. Regional managers making workforce decisions without data.',
    solution:
      'Automated HR data model in Power BI with weekly refresh. Row Level Security — each manager sees only their region. Reports cover absence, turnover and overtime costs.',
    result:
      'Workforce decisions backed by data. Identifying turnover patterns reduced annual recruitment costs by double digits.',
    tags: ['Power BI', 'Power Query', 'RLS', 'DAX'],
    accent: '#9333ea',
    bars: [55, 48, 62, 58, 70, 65, 78, 74, 82, 78, 88, 85],
  },
  {
    id: 4,
    industry: 'Logistics',
    title: 'Supply Chain KPI Monitoring',
    challenge:
      'Delivery data scattered across WMS, TMS and ERP. No real-time SLA visibility — issues discovered only after the fact.',
    solution:
      'Power BI Gateway connecting 3 systems. Unified delivery dashboard with SLA-at-risk alerts. Interactive route map and on-time delivery analysis by carrier.',
    result:
      'On-time delivery improved by 12 percentage points in 6 months. Operational problems detected and escalated before SLA breaches occur.',
    tags: ['Power BI', 'Power BI Gateway', 'DAX', 'Power Query'],
    accent: '#ea6c00',
    bars: [40, 55, 48, 65, 58, 72, 66, 79, 73, 86, 80, 94],
  },
];

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Power BI Projects – Dashboards & Reporting',
  description:
    'Power BI implementations for FMCG, manufacturing, retail and logistics companies. Sales dashboards, financial reporting, HR analytics, supply chain monitoring.',
  url: 'https://www.pbix.pl/en/projects',
  inLanguage: 'en',
  author: {
    '@type': 'Person',
    name: 'Radosław Sobczak',
    jobTitle: 'Microsoft Certified Trainer (MCT)',
    url: 'https://www.pbix.pl',
  },
};

export default function ProjectsEnPage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <Navbar />

      {/* ── HERO ──────────────────────────────────── */}
      <section style={{ padding: '140px 24px 80px', textAlign: 'center' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: '#6e6e73', marginBottom: '16px' }}>
            Case studies
          </div>
          <h1 style={{ fontSize: 'clamp(44px, 8vw, 72px)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-2.5px', lineHeight: 1.05, margin: '0 0 20px' }}>
            Power BI Projects
          </h1>
          <p style={{ fontSize: '18px', color: '#6e6e73', lineHeight: 1.65, margin: '0 0 36px', fontWeight: 400 }}>
            Data on its own means nothing — value comes from the reports and dashboards that help people make better decisions. Here are a few examples of what Power BI can deliver.
          </p>
          <Link
            href="/en/contact"
            style={{
              background: '#1e9953', color: 'white', textDecoration: 'none',
              padding: '14px 28px', borderRadius: '980px', fontSize: '14px', fontWeight: 600,
              boxShadow: '0 4px 20px rgba(30,153,83,0.3)',
            }}
          >
            Discuss your project
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
                        { label: 'Challenge', text: project.challenge, icon: '⚡' },
                        { label: 'Solution', text: project.solution, icon: '🔧' },
                        { label: 'Result', text: project.result, icon: '📈' },
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
                      <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
                        {['#ef4444', '#f59e0b', '#22c55e'].map(c => (
                          <div key={c} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }} />
                        ))}
                      </div>
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
                Your own project?
              </div>
              <h2 style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.8px', margin: '0 0 14px', lineHeight: 1.2 }}>
                Let&apos;s build something together.
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '15px', lineHeight: 1.75, margin: '0 0 32px' }}>
                Tell me about your data and goals — I&apos;ll suggest how Power BI can solve a specific problem in your organisation.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
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
