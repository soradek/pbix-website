'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navLinks = [
    { href: '#', label: 'v1.3.2', style: { opacity: 0.35, fontSize: '11px', cursor: 'default', pointerEvents: 'none' as const } },
    { href: '/#o-mnie', label: 'O mnie' },
    { href: '/szkolenia', label: 'Szkolenia' },
    { href: '/kontakt', label: 'Kontakt' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        backgroundColor: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.75)',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        transition: 'background-color 0.3s',
      }}
    >
      <nav style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link href="/" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '20px', fontWeight: 600, color: '#1d1d1f', letterSpacing: '-0.5px' }}>pbix.pl</span>
            <span style={{ fontSize: '10px', color: '#6e6e73', textTransform: 'uppercase', letterSpacing: '1px', lineHeight: 1 }}>Radosław Sobczak</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="desktop-nav">
          {navLinks.map(link => (
            <Link
              key={link.label}
              href={link.href}
              style={{ color: '#1d1d1f', textDecoration: 'none', fontSize: '14px', opacity: 0.7, transition: 'opacity 0.2s', ...link.style }}
              onMouseEnter={e => { if (!link.style) e.currentTarget.style.opacity = '1'; }}
              onMouseLeave={e => { if (!link.style) e.currentTarget.style.opacity = '0.7'; }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/kontakt"
            style={{
              backgroundColor: '#1e9953',
              color: 'white',
              textDecoration: 'none',
              fontSize: '14px',
              padding: '8px 20px',
              borderRadius: '980px',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#17803f')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1e9953')}
          >
            Zapytaj o termin
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Otwórz menu"
          className="mobile-menu-btn"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'none',
          }}
        >
          <div style={{ width: '20px', height: '14px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <motion.span animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }} style={{ display: 'block', height: '2px', background: '#1d1d1f', borderRadius: '1px', transformOrigin: 'center' }} />
            <motion.span animate={{ opacity: isOpen ? 0 : 1 }} style={{ display: 'block', height: '2px', background: '#1d1d1f', borderRadius: '1px' }} />
            <motion.span animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }} style={{ display: 'block', height: '2px', background: '#1d1d1f', borderRadius: '1px', transformOrigin: 'center' }} />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: 'rgba(255,255,255,0.98)',
              borderTop: '1px solid rgba(0,0,0,0.08)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {navLinks.filter(link => !link.style).map(link => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  style={{ color: '#1d1d1f', textDecoration: 'none', fontSize: '16px', padding: '12px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/kontakt"
                onClick={() => setIsOpen(false)}
                style={{
                  backgroundColor: '#1e9953',
                  color: 'white',
                  textDecoration: 'none',
                  textAlign: 'center',
                  padding: '12px',
                  borderRadius: '980px',
                  marginTop: '8px',
                  fontSize: '15px',
                }}
              >
                Zapytaj o termin
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
