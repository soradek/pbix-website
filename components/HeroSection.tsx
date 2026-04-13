'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

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
      {/* Background photo */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/tlo.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        willChange: 'transform',
      }} />
      {/* Dark overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(0,0,0,0.72) 0%, rgba(0,20,10,0.65) 50%, rgba(0,0,0,0.60) 100%)',
      }} />
      {/* Green glow accent */}
      <div style={{
        position: 'absolute',
        bottom: '10%', right: '15%',
        width: '500px', height: '500px',
        background: 'rgba(30,153,83,0.12)',
        borderRadius: '50%',
        filter: 'blur(90px)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '860px', margin: '0 auto', width: '100%' }}>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontSize: 'clamp(44px, 7vw, 92px)',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-3px',
            lineHeight: 1.02,
            margin: '0 0 28px',
          }}
        >
          Zamień dane<br />
          <span style={{ color: '#1e9953' }}>w wartość.</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontSize: 'clamp(16px, 2vw, 19px)',
            color: '#ffffff',
            lineHeight: 1.75,
            margin: '0 0 44px',
            maxWidth: '540px',
          }}
        >
          Szkolenia z Power BI, Excel, SQL i VBA prowadzone przez certyfikowanego trenera Microsoft — praktycznie, bez zbędnej teorii.
        </motion.p>

        {/* CTAs */}
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
              padding: '15px 32px',
              borderRadius: '980px',
              fontSize: '15px',
              fontWeight: 600,
              letterSpacing: '-0.2px',
              boxShadow: '0 4px 24px rgba(30,153,83,0.4)',
            }}
          >
            Poznaj szkolenia
          </Link>
          <Link
            href="/kontakt"
            style={{
              border: '1.5px solid rgba(255,255,255,0.35)',
              color: '#ffffff',
              textDecoration: 'none',
              padding: '15px 32px',
              borderRadius: '980px',
              fontSize: '15px',
              fontWeight: 500,
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(8px)',
            }}
          >
            Napisz do mnie
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)' }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{ color: 'rgba(255,255,255,0.35)', fontSize: '20px', textAlign: 'center' }}
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
}
