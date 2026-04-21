import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import { trainings } from '@/data/trainings';
import { testimonials } from '@/data/testimonials';
import { faqItems } from '@/data/faq';
import HeroSection from '@/components/HeroSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ClientsMarquee from '@/components/ClientsMarquee';
import HomeFAQ from '@/components/HomeFAQ';
import {
  IconBarChart, IconExcel, IconDatabase, IconPieChart,
  IconTarget, IconBriefcase, IconZap, IconUser,
  IconArrowRight,
} from '@/components/Icons';

const categoryIcon = (cat: string) => {
  const s = { size: 28, color: '#1e9953' };
  if (cat === 'Power BI') return <IconBarChart {...s} />;
  if (cat === 'Excel') return <IconExcel {...s} />;
  if (cat === 'SQL') return <IconDatabase {...s} />;
  return <IconPieChart {...s} />;
};

export default function Home() {
  const featuredTraining = trainings[0];

  const specializations = [
    { icon: <IconBarChart size={32} color="#1e9953" />, title: 'Power BI', desc: 'Transformuj surowe dane w interaktywne dashboardy. Od modelu danych przez DAX po publikację w chmurze.', category: 'Power BI' },
    { icon: <IconExcel size={32} color="#1e9953" />, title: 'Excel', desc: 'Od podstaw po VBA i Power Query. Excel jako platforma analityczna, nie tylko arkusz kalkulacyjny.', category: 'Excel' },
    { icon: <IconDatabase size={32} color="#1e9953" />, title: 'SQL', desc: 'Pisz zapytania, które wyciągają dokładnie to, czego potrzebujesz z relacyjnych baz danych.', category: 'SQL' },
    { icon: <IconPieChart size={32} color="#1e9953" />, title: 'Wizualizacja', desc: 'Wykresy, dashboardy, prezentacje – dane, które mówią same za siebie i przekonują decydentów.', category: 'Wizualizacja danych' },
  ];

  const whyItems = [
    { icon: <IconTarget size={32} color="#1e9953" />, title: 'Zero presji', desc: 'Atmosfera otwartości – pytaj o wszystko, tyle razy ile potrzebujesz. Szkolenie, nie egzamin.' },
    { icon: <IconBriefcase size={32} color="#1e9953" />, title: 'Przykłady biznesowe', desc: 'Żadnych sztucznie wymyślonych zadań. Każde ćwiczenie bazuje na realnych przypadkach analitycznych.' },
    { icon: <IconZap size={32} color="#1e9953" />, title: 'Natychmiastowe zastosowanie', desc: 'Metody, które możesz wdrożyć już następnego dnia. Wiedza gotowa do użycia od razu po szkoleniu.' },
    { icon: <IconUser size={32} color="#1e9953" />, title: 'Indywidualne podejście', desc: 'Dostosowuję tempo i zakres do poziomu grupy. Nikt nie jest pozostawiony samemu sobie.' },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <HeroSection />

      {/* ── STATS ─────────────────────────────────── */}
      <section style={{ borderTop: '1px solid rgba(0,0,0,0.08)', borderBottom: '1px solid rgba(0,0,0,0.08)', padding: '56px 24px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div className="stats-grid">
            {[
              { number: '4 000+', label: 'godzin na salach szkoleniowych' },
              { number: '4 500+', label: 'przeszkolonych pracowników' },
              { number: '7 lat',  label: 'doświadczenia jako trener' },
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

      {/* ── SPECJALIZACJE ─────────────────────────── */}
      <section className="section-xl" style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '72px' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: '#6e6e73', marginBottom: '16px' }}>Specjalizacje</div>
              <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-1.5px', margin: 0 }}>
                Narzędzia, które zmienią<br />sposób Twojej pracy
              </h2>
            </div>
          </ScrollReveal>
          <div className="spec-grid">
            {specializations.map((spec, i) => (
              <ScrollReveal key={spec.title} delay={i * 0.08}>
                <Link href={`/szkolenia?kategoria=${encodeURIComponent(spec.category)}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <div className="spec-card-hover" style={{
                    background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '20px',
                    padding: '36px 32px', height: '100%', transition: 'all 0.3s',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', boxSizing: 'border-box',
                  }}>
                    <div style={{ marginBottom: '20px', width: '52px', height: '52px', background: 'rgba(30,153,83,0.08)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {spec.icon}
                    </div>
                    <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1d1d1f', margin: '0 0 10px' }}>{spec.title}</h3>
                    <p style={{ color: '#6e6e73', fontSize: '14px', lineHeight: 1.7, margin: '0 0 24px', flex: 1 }}>{spec.desc}</p>
                    <div style={{ color: '#1e9953', fontSize: '14px', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      Dowiedz się więcej <IconArrowRight size={14} color="#1e9953" />
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
            <div className="featured-grid" style={{
              background: 'linear-gradient(135deg, #003d20 0%, #1e9953 55%, #006633 100%)',
              borderRadius: '32px', overflow: 'hidden', position: 'relative',
              border: '1px solid rgba(0,0,0,0.06)', padding: '80px',
            }}>
              <div style={{ position: 'absolute', top: '-120px', right: '-80px', width: '480px', height: '480px', background: 'rgba(255,255,255,0.04)', borderRadius: '50%', filter: 'blur(40px)' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,0.55)', marginBottom: '14px' }}>Polecane szkolenie</div>
                <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 700, color: '#fff', letterSpacing: '-1px', margin: '0 0 18px', lineHeight: 1.2 }}>{featuredTraining.title}</h2>
                <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '15px', lineHeight: 1.75, margin: '0 0 32px', maxWidth: '440px' }}>{featuredTraining.description.substring(0, 180)}...</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '36px', flexWrap: 'nowrap' }}>
                  <div style={{ flexShrink: 0 }}>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '1px' }}>Czas trwania</div>
                    <div style={{ fontSize: '16px', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap' }}>{featuredTraining.duration}</div>
                  </div>
                  <div style={{ width: '1px', height: '36px', background: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
                  <div style={{ flexShrink: 0 }}>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '1px' }}>Cena</div>
                    <div style={{ fontSize: '22px', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap' }}>{featuredTraining.priceLabel}</div>
                  </div>
                </div>
                <div className="featured-cta-wrap">
                  <Link href={`/szkolenia/${featuredTraining.slug}`} style={{ display: 'inline-block', background: '#fff', color: '#1e9953', textDecoration: 'none', padding: '14px 28px', borderRadius: '980px', fontSize: '14px', fontWeight: 700, letterSpacing: '-0.2px' }}>
                    Sprawdź program szkolenia
                  </Link>
                </div>
              </div>
              <div className="featured-mockup" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.16)', borderRadius: '20px', padding: '24px' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                    {['#ef4444', '#f59e0b', '#22c55e'].map(c => <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />)}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                    {(['Przychód', '2.4M zł', 'Marża', '18.3%', 'Klienci', '1 247', 'Wzrost', '+12%'] as string[]).reduce<[string, string][]>((acc, _, i, arr) => { if (i % 2 === 0) acc.push([arr[i], arr[i + 1]]); return acc; }, []).map(([label, val]) => (
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

      {/* ── O MNIE ────────────────────────────────── */}
      <section id="o-mnie" style={{ padding: '0 24px 120px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="about-grid">
            <ScrollReveal>
              <div className="about-photo-sticky" style={{ position: 'sticky', top: '88px' }}>
                <div style={{ width: '100%', aspectRatio: '3/4', maxWidth: '320px', borderRadius: '28px', overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.12)' }}>
                  <Image
                    src="/radek.jpg"
                    alt="Radosław Sobczak – Certyfikowany Trener Microsoft"
                    width={320} height={400} quality={82}
                    sizes="(max-width: 768px) 90vw, 320px"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: '#6e6e73', marginBottom: '16px' }}>O mnie</div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-1px', margin: '0 0 28px', lineHeight: 1.15 }}>Radosław Sobczak</h2>
              <p style={{ color: '#6e6e73', fontSize: '16px', lineHeight: 1.85, marginBottom: '20px' }}>
                Jestem certyfikowanym trenerem Microsoft (MCT) specjalizującym się w szkoleniach z Power BI, Excela, SQL i VBA. Przez ponad 7 lat pracy szkoleniowej przeszkoliłem ponad 4 500 pracowników firm takich jak Volkswagen, Lufthansa, Coca-Cola czy Boston Scientific.
              </p>
              <p style={{ color: '#6e6e73', fontSize: '16px', lineHeight: 1.85, marginBottom: '40px' }}>
                Moim celem nie jest nauczenie Twojego zespołu obsługi narzędzia, lecz pokazanie, jak rozwiązywać realne problemy biznesowe. Każde szkolenie opieram na przykładach z prawdziwych projektów i dopasowuję do specyfiki firmy.
              </p>
              <div style={{ borderLeft: '3px solid #1e9953', paddingLeft: '24px' }}>
                <div style={{ color: '#6e6e73', fontSize: '14px', marginBottom: '10px' }}>Podczas każdego szkolenia towarzyszy mi zasada:</div>
                <div style={{ fontSize: '21px', fontWeight: 600, color: '#1d1d1f', lineHeight: 1.4, fontStyle: 'italic' }}>&ldquo;Robisz raz – używasz cały czas.&rdquo;</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── KLIENCI ───────────────────────────────── */}
      <ClientsMarquee />

      {/* ── OPINIE ────────────────────────────────── */}
      <TestimonialsSection testimonials={testimonials} />

      {/* ── DLACZEGO WARTO ────────────────────────── */}
      <section className="section-xl" style={{ padding: '120px 24px', background: '#f9f9f9' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '72px' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: '#6e6e73', marginBottom: '16px' }}>Dlaczego warto</div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-1px', margin: 0 }}>Szkolenie, które naprawdę działa</h2>
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

      {/* ── JAK TO DZIAŁA ─────────────────────────── */}
      <section className="section-xl" style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="steps-two-col">
            <div>
              <ScrollReveal>
                <div style={{ marginBottom: '64px' }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: '#6e6e73', marginBottom: '16px' }}>Jak to działa</div>
                  <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-1px', margin: 0 }}>Trzy proste kroki</h2>
                </div>
              </ScrollReveal>
              {[
                { num: '01', title: 'Wysyłasz zapytanie', desc: 'Napisz do mnie lub wypełnij formularz. Opiszę, które szkolenie najlepiej odpowiada Twoim potrzebom.' },
                { num: '02', title: 'Ustalamy miejsce i zakres', desc: 'Dostosowuję program do potrzeb Twojej firmy lub grupy. Decydujemy o formie, terminie i lokalizacji.' },
                { num: '03', title: 'Realizujemy szkolenie', desc: 'Dwudniowe, intensywne warsztaty pełne praktycznych ćwiczeń. Odchodzisz z wiedzą gotową do wdrożenia.' },
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
                <Image
                  src="/radek3.jpg"
                  alt="Szkolenie Power BI – Radosław Sobczak"
                  width={560} height={640} quality={80} loading="lazy"
                  sizes="(max-width: 768px) 90vw, 560px"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ + CTA ─────────────────────────────── */}
      <HomeFAQ />

      <Footer />
    </main>
  );
}
