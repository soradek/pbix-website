'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { trainings } from '@/data/trainings';
import SuccessModal from '@/components/SuccessModal';

export default function KontaktClient() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', training: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [loading, setLoading] = useState(false);
  const [sendError, setSendError] = useState(false);

  function validate() {
    const e: Partial<typeof formData> = {};
    if (!formData.name.trim()) e.name = 'Podaj imię i nazwisko';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email)) e.email = 'Podaj poprawny adres email';
    if (!formData.message.trim()) e.message = 'Napisz wiadomość';
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    setSendError(false);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'kontakt', ...formData, honeypot }),
      });
      if (res.ok) setSubmitted(true);
      else setSendError(true);
    } catch {
      setSendError(true);
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = (field: keyof typeof formData): React.CSSProperties => ({
    width: '100%',
    background: 'var(--white)',
    border: `1px solid ${errors[field] ? '#ef4444' : 'rgba(0,0,0,0.12)'}`,
    borderRadius: '12px',
    padding: '14px 16px',
    color: 'var(--text)',
    fontSize: 'var(--fs-ui)',
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  });

  return (
    <main style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <Navbar />

      {submitted && <SuccessModal onClose={() => setSubmitted(false)} />}

      <section style={{ padding: '140px 24px 120px' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <h1 style={{ fontSize: 'var(--fs-display)', fontWeight: 500, color: 'var(--text)', letterSpacing: 'var(--ls-display)', margin: '0 0 20px', lineHeight: 'var(--lh-display)' }}>
                Napisz do mnie
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: 'var(--fs-lead)', lineHeight: 1.6, margin: 0 }}>
                Opisz potrzeby swojego zespołu, a dobiorę szkolenie dopasowane do<br />poziomu i celów Twojej firmy.
              </p>
            </div>
          </ScrollReveal>

          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Honeypot — hidden from real users; bots fill this in */}
            <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', width: 0, height: 0, overflow: 'hidden', opacity: 0 }} aria-hidden="true">
              <label htmlFor="hp-website">Website</label>
              <input
                id="hp-website"
                type="text"
                name="website"
                value={honeypot}
                onChange={e => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

              <div>
                <label style={{ display: 'block', fontSize: 'var(--fs-small)', color: 'var(--muted)', marginBottom: '8px' }}>Imię i nazwisko *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => { setFormData(p => ({ ...p, name: e.target.value })); setErrors(p => ({ ...p, name: '' })); }}
                  placeholder="Jan Kowalski"
                  maxLength={120}
                  style={inputStyle('name')}
                  onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={e => (e.target.style.borderColor = errors.name ? '#ef4444' : 'rgba(0,0,0,0.12)')}
                />
                {errors.name && <div style={{ color: '#ef4444', fontSize: 'var(--fs-label)', marginTop: '6px' }}>{errors.name}</div>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 'var(--fs-small)', color: 'var(--muted)', marginBottom: '8px' }}>Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => { setFormData(p => ({ ...p, email: e.target.value })); setErrors(p => ({ ...p, email: '' })); }}
                  placeholder="jan@firma.pl"
                  maxLength={254}
                  style={inputStyle('email')}
                  onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={e => (e.target.style.borderColor = errors.email ? '#ef4444' : 'rgba(0,0,0,0.12)')}
                />
                {errors.email && <div style={{ color: '#ef4444', fontSize: 'var(--fs-label)', marginTop: '6px' }}>{errors.email}</div>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 'var(--fs-small)', color: 'var(--muted)', marginBottom: '8px' }}>Telefon (opcjonalnie)</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                  placeholder="+48 573 195 404"
                  maxLength={30}
                  style={inputStyle('phone')}
                  onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(0,0,0,0.12)')}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 'var(--fs-small)', color: 'var(--muted)', marginBottom: '8px' }}>Szkolenie (opcjonalnie)</label>
                <select
                  value={formData.training}
                  onChange={e => setFormData(p => ({ ...p, training: e.target.value }))}
                  style={{ ...inputStyle('training'), cursor: 'pointer' }}
                >
                  <option value="">– Wybierz szkolenie –</option>
                  {trainings.map(t => (
                    <option key={t.slug} value={t.slug}>{t.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 'var(--fs-small)', color: 'var(--muted)', marginBottom: '8px' }}>Wiadomość *</label>
                <textarea
                  value={formData.message}
                  onChange={e => { setFormData(p => ({ ...p, message: e.target.value })); setErrors(p => ({ ...p, message: '' })); }}
                  placeholder="Opisz potrzeby zespołu, liczbę pracowników, preferowany termin..."
                  rows={5}
                  maxLength={4000}
                  style={{ ...inputStyle('message'), resize: 'vertical', lineHeight: 1.6 }}
                  onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={e => (e.target.style.borderColor = errors.message ? '#ef4444' : 'rgba(0,0,0,0.12)')}
                />
                {errors.message && <div style={{ color: '#ef4444', fontSize: 'var(--fs-label)', marginTop: '6px' }}>{errors.message}</div>}
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  background: loading ? 'var(--muted)' : 'var(--accent)',
                  color: 'white', border: 'none', padding: '16px',
                  borderRadius: '12px', fontSize: 'var(--fs-body)', fontWeight: 500,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontFamily: 'inherit', transition: 'background 0.2s', marginTop: '8px',
                }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.background = 'var(--accent-deep)'; }}
                onMouseLeave={e => { if (!loading) e.currentTarget.style.background = 'var(--accent)'; }}
              >
                {loading ? 'Wysyłanie...' : 'Wyślij wiadomość'}
              </button>
              {sendError && (
                <div style={{ color: '#ef4444', fontSize: 'var(--fs-small)', textAlign: 'center', marginTop: '8px' }}>
                  Wystąpił błąd podczas wysyłania. Spróbuj ponownie lub napisz bezpośrednio na kontakt@pbix.pl
                </div>
              )}
            </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
