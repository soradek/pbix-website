import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import { Metadata } from 'next';
import { trainings, getTrainingBySlug } from '@/data/trainings';
import { getTrainingEnContent } from '@/data/trainings-en';
import { faqItemsEn } from '@/data/faq';
import ClientsMarquee from '@/components/ClientsMarquee';
import HomeFAQ from '@/components/HomeFAQ';
import {
  IconBarChart, IconExcel, IconDatabase, IconPieChart,
  IconTarget, IconBriefcase, IconZap, IconUser, IconArrowRight,
} from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Power BI, Excel & SQL Corporate Trainings | Radosław Sobczak MCT',
  description:
    'Radosław Sobczak — Microsoft Certified Trainer (MCT) delivering Power BI, Excel, SQL and VBA corporate trainings across Poland and online. 7 years of experience, 4,500+ professionals trained, rated 4.8/5. On-site and remote sessions in English and Polish.',
  keywords: [
    'Power BI training Poland', 'Excel training corporate', 'SQL training English',
    'Microsoft Certified Trainer Poland', 'corporate data training', 'Power BI course English',
    'DAX training', 'VBA training', 'online Power BI training',
  ],
  openGraph: {
    title: 'Power BI, Excel & SQL Corporate Trainings | Radosław Sobczak MCT',
    description: 'Microsoft Certified Trainer — practical Power BI, Excel and SQL trainings for corporate teams across Poland. English sessions available.',
    url: 'https://www.pbix.pl/en',
    siteName: 'pbix.pl',
    locale: 'en_US',
    type: 'website',
    images: [{ url: 'https://www.pbix.pl/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Power BI, Excel & SQL Corporate Trainings | pbix.pl',
    description: 'MCT-delivered Power BI, Excel and SQL trainings for corporate teams in Poland and online.',
  },
  alternates: { canonical: 'https://www.pbix.pl/en' },
};

const featuredTraining = getTrainingBySlug('excel-ai') ?? trainings[0];
const featuredTrainingEn = getTrainingEnContent(featuredTraining.slug);

const specializations = [
  { icon: <IconBarChart size={32} color="#1e9953" />, title: 'Power BI', desc: 'Turn raw data into interactive dashboards — from data modelling and DAX to publishing in the cloud.', category: 'Power BI' },
  { icon: <IconExcel size={32} color="#1e9953" />, title: 'Excel', desc: 'From basics to VBA and Power Query. Excel as an analytics platform, not just a spreadsheet.', category: 'Excel' },
  { icon: <IconDatabase size={32} color="#1e9953" />, title: 'SQL', desc: 'Write queries that extract exactly what you need from relational databases.', category: 'SQL' },
  { icon: <IconPieChart size={32} color="#1e9953" />, title: 'Data Visualisation', desc: 'Charts, dashboards, presentations — data that speaks for itself and convinces decision-makers.', category: 'Wizualizacja danych' },
];

const whyItems = [
  { icon: <IconTarget size={32} color="#1e9953" />, title: 'No pressure', desc: 'Open atmosphere — ask anything, as many times as you need. This is a training, not an exam.' },
  { icon: <IconBriefcase size={32} color="#1e9953" />, title: 'Business examples', desc: 'No artificially crafted exercises. Every task is based on real analytical scenarios from actual projects.' },
  { icon: <IconZap size={32} color="#1e9953" />, title: 'Immediate application', desc: 'Methods you can apply the very next day. Knowledge ready to use immediately after the training.' },
  { icon: <IconUser size={32} color="#1e9953" />, title: 'Individual approach', desc: 'I adjust the pace and scope to the group\'s level. No one is left behind.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItemsEn.map(item => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'pbix.pl – Radosław Sobczak',
  url: 'https://www.pbix.pl/en',
  description:
    'Corporate Power BI, Excel, SQL and VBA training delivered by Microsoft Certified Trainer Radosław Sobczak. On-site and online sessions available in English and Polish across Poland.',
  founder: { '@type': 'Person', name: 'Radosław Sobczak', jobTitle: 'Microsoft Certified Trainer (MCT)' },
  areaServed: [{ '@type': 'Country', name: 'Poland' }],
  knowsLanguage: ['pl', 'en'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Corporate Data Trainings',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Course', name: 'Microsoft Power BI Training', courseMode: ['onsite', 'online'] } },
      { '@type': 'Offer', itemOffered: { '@type': 'Course', name: 'MS Excel Training', courseMode: ['onsite', 'online'] } },
      { '@type': 'Offer', itemOffered: { '@type': 'Course', name: 'Microsoft SQL Server Training', courseMode: ['onsite', 'online'] } },
    ],
  },
};

export default function EnHomePage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Navbar />

      {/* ── HERO ──────────────────────────────────── */}
      <section className="hero-section" style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden', padding: '100px 24px 80px',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/tlo.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.72) 0%, rgba(0,20,10,0.65) 50%, rgba(0,0,0,0.60) 100%)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '15%', width: '500px', height: '500px', background: 'rgba(30,153,83,0.12)', borderRadius: '50%', filter: 'blur(90px)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '860px', margin: '0 auto', width: '100%' }}>
          <h1 style={{ fontSize: 'clamp(44px, 7vw, 92px)', fontWeight: 700, color: '#ffffff', letterSpacing: '-3px', lineHeight: 1.02, margin: '0 0 28px' }}>
            Turn data<br /><span style={{ color: '#1e9953' }}>into value.</span>
          </h1>
          <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: '#ffffff', lineHeight: 1.75, margin: '0 0 44px', maxWidth: '540px' }}>
            Corporate trainings in Power BI, Excel, SQL and VBA delivered by a Microsoft Certified Trainer — practical, with no unnecessary theory.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/en/trainings" style={{ background: '#1e9953', color: 'white', textDecoration: 'none', padding: '15px 32px', borderRadius: '980px', fontSize: '15px', fontWeight: 600, boxShadow: '0 4px 24px rgba(30,153,83,0.4)' }}>
              Explore trainings
            </Link>
            <Link href="/en/contact" style={{ border: '1.5px solid rgba(255,255,255,0.35)', color: '#ffffff', textDecoration: 'none', padding: '15px 32px', borderRadius: '980px', fontSize: '15px', fontWeight: 500, background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}>
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────── */}
      <section style={{ borderTop: '1px solid rgba(0,0,0,0.08)', borderBottom: '1px solid rgba(0,0,0,0.08)', padding: '56px 24px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div className="stats-grid">
            {[
              { number: '4,000+', label: 'hours in training rooms' },
              { number: '4,500+', label: 'professionals trained' },
              { number: '7 years', label: 'of experience as a trainer' },
            ].map((stat, i) => (
              <ScrollReveal key={stat.number} delay={i * 0.1}>
                <div className="stat-divider" style={{ textAlign: 'center', padding: '8px 40px', borderRight: i < 2 ? '1px solid rgba(0,0,0,0.08)' : 'none' }}>
                  <div style={{ fontSize: 'clamp(36px, 8vw, 52px)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-2px', lineHeight: 1.1 }}>{stat.number}</div>
                  <div style={{ color: '#6e6e73', fontSize: '14px', marginTop: '6px' }}>{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPECIALIZATIONS ───────────────────────── */}
      <section className="section-xl" style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '72px' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: '#6e6e73', marginBottom: '16px' }}>Specialisations</div>
              <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-1.5px', margin: 0 }}>
                Tools that will change<br />the way you work
              </h2>
            </div>
          </ScrollReveal>
          <div className="spec-grid">
            {specializations.map((spec, i) => (
              <ScrollReveal key={spec.title} delay={i * 0.08}>
                <Link href={`/en/trainings?category=${encodeURIComponent(spec.category)}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <div className="spec-card-hover" style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '20px', padding: '36px 32px', height: '100%', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
                    <div style={{ marginBottom: '20px', width: '52px', height: '52px', background: 'rgba(30,153,83,0.08)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {spec.icon}
                    </div>
                    <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1d1d1f', margin: '0 0 10px' }}>{spec.title}</h3>
                    <p style={{ color: '#6e6e73', fontSize: '14px', lineHeight: 1.7, margin: '0 0 24px', flex: 1 }}>{spec.desc}</p>
                    <div style={{ color: '#1e9953', fontSize: '14px', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      Learn more <IconArrowRight size={14} color="#1e9953" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED TRAINING ─────────────────────── */}
      <section style={{ padding: '0 24px 120px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <ScrollReveal>
            <div className="featured-grid" style={{ background: 'linear-gradient(135deg, #003d20 0%, #1e9953 55%, #006633 100%)', borderRadius: '32px', overflow: 'hidden', position: 'relative', border: '1px solid rgba(0,0,0,0.06)', padding: '80px' }}>
              <div style={{ position: 'absolute', top: '-120px', right: '-80px', width: '480px', height: '480px', background: 'rgba(255,255,255,0.04)', borderRadius: '50%', filter: 'blur(40px)' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,0.55)', marginBottom: '14px' }}>Featured training</div>
                <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 700, color: '#fff', letterSpacing: '-1px', margin: '0 0 18px', lineHeight: 1.2 }}>{featuredTrainingEn?.title ?? featuredTraining.title}</h2>
                <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '15px', lineHeight: 1.75, margin: '0 0 32px', maxWidth: '440px' }}>{(featuredTrainingEn?.description ?? featuredTraining.description).substring(0, 180)}...</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '36px', flexWrap: 'nowrap' }}>
                  <div style={{ flexShrink: 0 }}>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '1px' }}>Duration</div>
                    <div style={{ fontSize: '16px', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap' }}>{featuredTraining.duration.replace('2 dni / 16 godzin', '2 days / 16 hours')}</div>
                  </div>
                  <div style={{ width: '1px', height: '36px', background: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
                  <div style={{ flexShrink: 0 }}>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '1px' }}>Price</div>
                    <div style={{ fontSize: '22px', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap' }}>{featuredTraining.priceLabel.replace('od ', 'from ')}</div>
                  </div>
                </div>
                <div className="featured-cta-wrap">
                  <Link href={`/en/trainings/${featuredTraining.slug}`} style={{ display: 'inline-block', background: '#fff', color: '#1e9953', textDecoration: 'none', padding: '14px 28px', borderRadius: '980px', fontSize: '14px', fontWeight: 700 }}>
                    View training programme
                  </Link>
                </div>
              </div>
              <div className="featured-mockup" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.16)', borderRadius: '20px', padding: '24px' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                    {['#ef4444', '#f59e0b', '#22c55e'].map(c => <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />)}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                    {(['Revenue', '2.4M PLN', 'Margin', '18.3%', 'Clients', '1,247', 'Growth', '+12%'] as string[]).reduce<[string, string][]>((acc, _, i, arr) => { if (i % 2 === 0) acc.push([arr[i], arr[i + 1]]); return acc; }, []).map(([label, val]) => (
                      <div key={label} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '10px', padding: '12px 14px' }}>
                        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.45)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>{val}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '10px', padding: '16px', height: '80px', display: 'flex', alignItems: 'flex-end', gap: '5px' }}>
                    {[40, 62, 45, 78, 52, 88, 67, 84, 58, 94, 72, 100].map((h, idx) => (
                      <div key={idx} style={{ flex: 1, height: `${h}%`, background: `rgba(255,255,255,${0.2 + h / 400})`, borderRadius: '3px 3px 0 0' }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────── */}
      <section id="about" style={{ padding: '0 24px 120px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="about-grid">
            <ScrollReveal>
              <div className="about-photo-sticky" style={{ position: 'sticky', top: '88px' }}>
                <div style={{ width: '100%', aspectRatio: '3/4', maxWidth: '320px', borderRadius: '28px', overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.12)' }}>
                  <Image src="/radek.jpg" alt="Radosław Sobczak – Microsoft Certified Trainer" width={320} height={400} quality={82} sizes="(max-width: 768px) 90vw, 320px" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: '#6e6e73', marginBottom: '16px' }}>About</div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-1px', margin: '0 0 28px', lineHeight: 1.15 }}>Radosław Sobczak</h2>
              <p style={{ color: '#6e6e73', fontSize: '16px', lineHeight: 1.85, marginBottom: '20px' }}>
                I am a Microsoft Certified Trainer (MCT) specialising in Power BI, Excel, SQL and VBA. Over 7 years of corporate training I have trained more than 4,500 employees at companies including Volkswagen, Lufthansa, Coca-Cola and Boston Scientific.
              </p>
              <p style={{ color: '#6e6e73', fontSize: '16px', lineHeight: 1.85, marginBottom: '40px' }}>
                My goal is not to teach your team how to operate a tool — it is to show them how to solve real business problems. Every training is grounded in examples from real projects and tailored to your company's specific context.
              </p>
              <div style={{ borderLeft: '3px solid #1e9953', paddingLeft: '24px' }}>
                <div style={{ color: '#6e6e73', fontSize: '14px', marginBottom: '10px' }}>My training principle:</div>
                <div style={{ fontSize: '21px', fontWeight: 600, color: '#1d1d1f', lineHeight: 1.4, fontStyle: 'italic' }}>&ldquo;Learn it once — use it forever.&rdquo;</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── CLIENTS ───────────────────────────────── */}
      <ClientsMarquee lang="en" />

      {/* ── WHY ───────────────────────────────────── */}
      <section className="section-xl" style={{ padding: '120px 24px', background: '#f9f9f9' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '72px' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: '#6e6e73', marginBottom: '16px' }}>Why choose us</div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-1px', margin: 0 }}>Training that actually works</h2>
            </div>
          </ScrollReveal>
          <div className="benefits-grid">
            {whyItems.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <div style={{ width: '64px', height: '64px', background: 'rgba(30,153,83,0.08)', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    {item.icon}
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1d1d1f', margin: '0 0 10px' }}>{item.title}</h3>
                  <p style={{ color: '#6e6e73', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────── */}
      <section className="section-xl" style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="steps-two-col">
            <div>
              <ScrollReveal>
                <div style={{ marginBottom: '64px' }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: '#6e6e73', marginBottom: '16px' }}>How it works</div>
                  <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-1px', margin: 0 }}>Three simple steps</h2>
                </div>
              </ScrollReveal>
              {[
                { num: '01', title: 'Send an enquiry', desc: 'Write to me or fill in the contact form. I will advise which training best suits your needs.' },
                { num: '02', title: 'We agree on scope and dates', desc: 'I tailor the programme to your company\'s needs. We decide on format, schedule and location.' },
                { num: '03', title: 'We run the training', desc: 'Two days of intensive, hands-on workshops. You leave with knowledge ready to apply immediately.' },
              ].map((step, i) => (
                <ScrollReveal key={step.num} delay={i * 0.12}>
                  <div className="steps-item" style={{ padding: '40px 0', borderBottom: i < 2 ? '1px solid rgba(0,0,0,0.07)' : 'none' }}>
                    <div className="steps-num" style={{ fontSize: '56px', fontWeight: 800, color: 'rgba(0,0,0,0.07)', letterSpacing: '-2px', lineHeight: 1, userSelect: 'none' }}>{step.num}</div>
                    <div>
                      <h3 style={{ fontSize: '22px', fontWeight: 600, color: '#1d1d1f', margin: '0 0 10px' }}>{step.title}</h3>
                      <p style={{ color: '#6e6e73', fontSize: '15px', lineHeight: 1.75, margin: 0 }}>{step.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <div className="steps-photo-wrapper">
              <div style={{ borderRadius: '28px', overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.14)', height: '100%' }}>
                <Image src="/radek3.jpg" alt="Power BI training – Radosław Sobczak" width={560} height={640} quality={80} loading="lazy" sizes="(max-width: 768px) 90vw, 560px" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', display: 'block' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────── */}
      <HomeFAQ lang="en" />

      {/* ── CTA ───────────────────────────────────── */}
      <section style={{ padding: '120px 24px', background: '#f9f9f9' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ background: 'linear-gradient(135deg, #003d20 0%, #1e9953 55%, #006633 100%)', borderRadius: '28px', padding: '56px 48px', textAlign: 'center' }}>
              <h2 style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.8px', margin: '0 0 14px', lineHeight: 1.2 }}>
                Let&apos;s talk about your training.
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: 1.75, margin: '0 0 36px' }}>
                Write to me — let&apos;s define the scope and schedule a session tailored to your needs.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
                <Link href="/en/contact" style={{ background: '#ffffff', color: '#1e9953', textDecoration: 'none', padding: '15px 32px', borderRadius: '980px', fontSize: '15px', fontWeight: 700 }}>
                  Contact me
                </Link>
                <Link href="/en/trainings" style={{ border: '1.5px solid rgba(255,255,255,0.35)', color: '#ffffff', textDecoration: 'none', padding: '15px 32px', borderRadius: '980px', fontSize: '15px', fontWeight: 500 }}>
                  View trainings
                </Link>
              </div>
              <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.55)', fontSize: '13px' }}>
                4,500+ trained professionals · Microsoft Certified Trainer (MCT)
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer lang="en" />
    </main>
  );
}
