'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { IconPhone } from '@/components/Icons';
import { RollingLink } from '@/components/home/RollingButton';

const APP_VERSION = '1.14.0';

interface NavLink {
  href: string;
  label: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

function getAltUrl(pathname: string): string {
  if (pathname.startsWith('/en')) {
    const stripped = pathname.replace(/^\/en/, '');
    if (!stripped || stripped === '/') return '/';
    return stripped
      .replace(/^\/trainings(\/|$)/, '/szkolenia$1')
      .replace(/^\/contact$/, '/kontakt')
      .replace(/^\/register$/, '/zapisy')
      .replace(/^\/projects(\/|$)/, '/projekty$1')
      .replace(/^\/privacy-policy$/, '/polityka-prywatnosci');
  }
  if (pathname === '/') return '/en';
  return '/en' + pathname
    .replace(/^\/szkolenia(\/|$)/, '/trainings$1')
    .replace(/^\/kontakt$/, '/contact')
    .replace(/^\/zapisy$/, '/register')
    .replace(/^\/projekty(\/|$)/, '/projects$1')
    .replace(/^\/polityka-prywatnosci$/, '/privacy-policy');
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isEn = pathname.startsWith('/en');
  const altUrl = getAltUrl(pathname);

  useEffect(() => {
    let last = 0;
    const handleScroll = () => {
      const now = Date.now();
      if (now - last < 100) return;
      last = now;
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const homeHref = isEn ? '/en' : '/';
  const faqHref = isEn ? '/en#faq' : '/#faq';

  const handleHomeClick = (e: React.MouseEvent) => {
    if (pathname === '/' || pathname === '/en') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFaqClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/' || pathname === '/en') {
      e.preventDefault();
      const faqEl = document.getElementById('faq');
      faqEl?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks: NavLink[] = isEn
    ? [
        { href: '/en', label: 'Home', onClick: handleHomeClick },
        { href: '/en/trainings', label: 'Trainings' },
        { href: '/en/projects', label: 'Projects' },
        { href: '/en#faq', label: 'FAQ', onClick: handleFaqClick },
      ]
    : [
        { href: '/', label: 'Home', onClick: handleHomeClick },
        { href: '/szkolenia', label: 'Szkolenia' },
        { href: '/projekty', label: 'Projekty' },
        { href: '/blog', label: 'Blog' },
        { href: '/#faq', label: 'FAQ', onClick: handleFaqClick },
      ];

  const ctaHref = isEn ? '/en/contact' : '/kontakt';
  const ctaLabel = isEn ? 'Contact' : 'Kontakt';

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
        <Link href={isEn ? '/en' : '/'} onClick={() => setIsOpen(false)} title={`v${APP_VERSION}`} style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 'var(--fs-lead)', fontWeight: 600, color: 'var(--text)', letterSpacing: 'var(--ls-h3)', lineHeight: 1.15 }}>pbix.pl</span>
            <span className="navbar-subtitle" style={{ fontFamily: 'var(--font-geist-mono), ui-monospace, monospace', fontSize: 'var(--fs-label)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', lineHeight: 1.2 }}>Radosław Sobczak</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="desktop-nav">
          {/* Language switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px', background: 'rgba(0,0,0,0.04)', borderRadius: '980px', padding: '3px' }}>
            <Link
              href={isEn ? altUrl : pathname}
              style={{
                fontSize: 'var(--fs-label)', fontWeight: 600, textDecoration: 'none', padding: '4px 10px', borderRadius: '980px',
                background: !isEn ? 'var(--text)' : 'transparent',
                color: !isEn ? 'var(--white)' : 'var(--muted)',
                transition: 'all 0.2s',
              }}
            >
              PL
            </Link>
            <Link
              href={isEn ? pathname : altUrl}
              style={{
                fontSize: 'var(--fs-label)', fontWeight: 600, textDecoration: 'none', padding: '4px 10px', borderRadius: '980px',
                background: isEn ? 'var(--text)' : 'transparent',
                color: isEn ? 'var(--white)' : 'var(--muted)',
                transition: 'all 0.2s',
              }}
            >
              EN
            </Link>
          </div>
          </div>

          {/* Phone – desktop only */}
          <a
            href="tel:+48573195404"
            aria-label="Zadzwoń"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text)', textDecoration: 'none', opacity: 0.7, transition: 'opacity 0.2s', fontSize: 'var(--fs-small)' }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '1'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '0.7'; }}
          >
            <IconPhone size={15} color="currentColor" />
            <span className="phone-label">+48 573 195 404</span>
          </a>

          {navLinks.map(link => (
            <Link
              key={link.label}
              href={link.href}
              onClick={link.onClick}
              style={{ color: 'var(--text)', textDecoration: 'none', fontSize: 'var(--fs-small)', opacity: 0.7, transition: 'opacity 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '1'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '0.7'; }}
            >
              {link.label}
            </Link>
          ))}
          <RollingLink href={ctaHref} label={ctaLabel} variant="dark" arrow={false} small />
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isEn ? 'Open menu' : 'Otwórz menu'}
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
            <motion.span animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }} style={{ display: 'block', height: '2px', background: 'var(--text)', borderRadius: '1px', transformOrigin: 'center' }} />
            <motion.span animate={{ opacity: isOpen ? 0 : 1 }} style={{ display: 'block', height: '2px', background: 'var(--text)', borderRadius: '1px' }} />
            <motion.span animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }} style={{ display: 'block', height: '2px', background: 'var(--text)', borderRadius: '1px', transformOrigin: 'center' }} />
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
              {/* Mobile language switcher */}
              <div style={{ display: 'flex', gap: '8px', paddingBottom: '8px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <Link href={isEn ? altUrl : pathname} onClick={() => setIsOpen(false)}
                  style={{ flex: 1, textAlign: 'center', padding: '10px', borderRadius: '10px', background: !isEn ? 'var(--text)' : 'rgba(0,0,0,0.05)', color: !isEn ? 'var(--white)' : 'var(--muted)', textDecoration: 'none', fontSize: 'var(--fs-small)', fontWeight: 600 }}>
                  PL
                </Link>
                <Link href={isEn ? pathname : altUrl} onClick={() => setIsOpen(false)}
                  style={{ flex: 1, textAlign: 'center', padding: '10px', borderRadius: '10px', background: isEn ? 'var(--text)' : 'rgba(0,0,0,0.05)', color: isEn ? 'var(--white)' : 'var(--muted)', textDecoration: 'none', fontSize: 'var(--fs-small)', fontWeight: 600 }}>
                  EN
                </Link>
              </div>
              {navLinks.map(link => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  style={{ color: 'var(--text)', textDecoration: 'none', fontSize: 'var(--fs-body)', padding: '12px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={ctaHref}
                onClick={() => setIsOpen(false)}
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  textDecoration: 'none',
                  textAlign: 'center',
                  padding: '12px',
                  borderRadius: '980px',
                  marginTop: '8px',
                  fontSize: 'var(--fs-ui)',
                }}
              >
                {ctaLabel}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
