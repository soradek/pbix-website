'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { IconTrendingUp } from './Icons';

function AnalyticsCard() {
  const bars = [42, 58, 35, 74, 51, 88, 63, 92, 70, 85, 78, 96];
  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '24px',
      padding: '28px',
      boxShadow: '0 24px 64px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)',
      border: '1px solid rgba(0,0,0,0.06)',
      width: '100%',
      maxWidth: '380px',
    }}>
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#6e6e73', marginBottom: '4px' }}>Przychód kwartalny</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-1px' }}>2 840 000 zł</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(30,153,83,0.1)', borderRadius: '20px', padding: '4px 10px' }}>
          <IconTrendingUp size={12} color="#1e9953" strokeWidth={2.5}/>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#1e9953' }}>+18.4%</span>
        </div>
      </div>

      {/* Bar chart */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px', height: '72px', marginBottom: '20px' }}>
        {bars.map((h, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${h}%`,
              background: i === bars.length - 1
                ? '#1e9953'
                : `rgba(30,153,83,${0.15 + (i / bars.length) * 0.4})`,
              borderRadius: '3px 3px 0 0',
              transition: 'height 0.5s ease',
            }}
          />
        ))}
      </div>

      {/* Trend line */}
      <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)', marginBottom: '16px' }} />

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
        {[
          { label: 'Klienci', value: '1 247', up: true },
          { label: 'Konwersja', value: '23.8%', up: true },
          { label: 'Avg deal', value: '64k zł', up: false },
        ].map((kpi) => (
          <div key={kpi.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#1d1d1f' }}>{kpi.value}</div>
            <div style={{ fontSize: '10px', color: '#6e6e73', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{kpi.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FloatingBadge({ text, delay, x, y }: { text: string; delay: number; x: string; y: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        background: '#ffffff',
        borderRadius: '12px',
        padding: '8px 14px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
        border: '1px solid rgba(0,0,0,0.06)',
        fontSize: '12px',
        fontWeight: 600,
        color: '#1d1d1f',
        whiteSpace: 'nowrap',
        zIndex: 2,
      }}
    >
      {text}
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section className="hero-section" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '100px 24px 80px',
    }}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, background: '#ffffff' }} />
      <div style={{ position: 'absolute', top: '5%', left: '50%', width: '700px', height: '700px', background: 'rgba(30,153,83,0.06)', borderRadius: '50%', filter: 'blur(100px)', transform: 'translateX(-50%)' }} />
      {/* Subtle dot grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)',
      }} />

      <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

          {/* Left – copy */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'rgba(30,153,83,0.08)',
                border: '1px solid rgba(30,153,83,0.2)',
                borderRadius: '980px',
                padding: '6px 14px',
                fontSize: '11px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase' as const,
                color: '#1e9953',
                marginBottom: '32px',
              }}>
                <span style={{ width: '6px', height: '6px', background: '#1e9953', borderRadius: '50%', display: 'inline-block' }} />
                Certyfikowany Trener Microsoft (MCT)
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                fontSize: 'clamp(42px, 5.5vw, 80px)',
                fontWeight: 700,
                color: '#1d1d1f',
                letterSpacing: '-2.5px',
                lineHeight: 1.05,
                margin: '0 0 24px',
              }}
            >
              Zamień dane<br />
              <span style={{ color: '#1e9953' }}>w wartość.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                fontSize: 'clamp(16px, 2vw, 19px)',
                color: '#6e6e73',
                lineHeight: 1.7,
                margin: '0 0 40px',
                maxWidth: '480px',
              }}
            >
              Szkolenia z Power BI, Excel, SQL i VBA prowadzone przez certyfikowanego trenera Microsoft — praktycznie, bez zbędnej teorii.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
            >
              <Link
                href="/szkolenia"
                style={{
                  background: '#1e9953',
                  color: 'white',
                  textDecoration: 'none',
                  padding: '15px 30px',
                  borderRadius: '980px',
                  fontSize: '15px',
                  fontWeight: 600,
                  letterSpacing: '-0.2px',
                }}
              >
                Poznaj szkolenia
              </Link>
              <Link
                href="/kontakt"
                style={{
                  border: '1.5px solid rgba(0,0,0,0.15)',
                  color: '#1d1d1f',
                  textDecoration: 'none',
                  padding: '15px 30px',
                  borderRadius: '980px',
                  fontSize: '15px',
                  fontWeight: 500,
                  background: 'rgba(255,255,255,0.8)',
                }}
              >
                Napisz do mnie
              </Link>
            </motion.div>

            {/* Social proof strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{ display: 'flex', gap: '32px', marginTop: '48px', flexWrap: 'wrap' }}
            >
              {[
                { value: '3 500+', label: 'uczestników' },
                { value: '5 lat', label: 'doświadczenia' },
                { value: '3 000+', label: 'godzin szkoleń' },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ fontSize: '22px', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.5px' }}>{s.value}</div>
                  <div style={{ fontSize: '12px', color: '#6e6e73', marginTop: '2px' }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right – analytics visual */}
          <div className="hero-visual" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <AnalyticsCard />
            </motion.div>

            {/* Floating badges */}
            <FloatingBadge text="Power BI" delay={0.9} x="-10%" y="10%" />
            <FloatingBadge text="DAX · SQL · VBA" delay={1.1} x="60%" y="78%" />

            {/* Decorative ring */}
            <div style={{
              position: 'absolute',
              width: '340px', height: '340px',
              border: '1px dashed rgba(30,153,83,0.2)',
              borderRadius: '50%',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 0,
              pointerEvents: 'none',
            }} />
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)' }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{ color: 'rgba(0,0,0,0.2)', fontSize: '20px', textAlign: 'center' }}
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
}
