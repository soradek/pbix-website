'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { trainings } from '@/data/trainings';
import SuccessModal from '@/components/SuccessModal';

export default function ZapisyClient() {
  const [formData, setFormData] = useState({ name: '', email: '', training: '', form: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [loading, setLoading] = useState(false);
  const [sendError, setSendError] = useState(false);

  function validate() {
    const e: Partial<typeof formData> = {};
    if (!formData.name.trim()) e.name = 'Podaj imię i nazwisko';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email)) e.email = 'Podaj poprawny adres email';
    if (!formData.training) e.training = 'Wybierz szkolenie';
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
        body: JSON.stringify({ type: 'zapisy', ...formData, honeypot }),
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
    background: '#ffffff',
    border: `1px solid ${errors[field] ? '#ef4444' : 'rgba(0,0,0,0.12)'}`,
    borderRadius: '12px',
    padding: '14px 16px',
    color: '#1d1d1f',
    fontSize: '15px',
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  });

  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <Navbar />

      {submitted && <SuccessModal onClose={() => setSubmitted(false)} />}

      <section style={{ padding: '140px 24px 120px' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#6e6e73', marginBottom: '16px' }}>Zapisy</div>
              <h1 style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 600, color: '#1d1d1f', letterSpacing: '-2px', margin: '0 0 20px', lineHeight: 1.05 }}>
                Zamów szkolenie dla zespołu
              </h1>
              <p style={{ color: '#6e6e73', fontSize: '17px', lineHeight: 1.6, margin: 0 }}>
                Wypełnij formularz – skontaktuję się w ciągu 24 godzin, aby omówić szczegóły i dopasować program do potrzeb Twojego zespołu.
              </p>
            </div>
          </ScrollReveal>

          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Honeypot — hidden from real users; bots fill this in */}
            <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', width: 0, height: 0, overflow: 'hidden', opacity: 0 }} aria-hidden="true">
              <label htmlFor="hp-website-z">Website</label>
              <input
                id="hp-website-z"
                type="text"
                name="website"
                value={honeypot}
                onChange={e => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#6e6e73', marginBottom: '8px' }}>Imię i nazwisko *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => { setFormData(p => ({ ...p, name: e.target.value })); setErrors(p => ({ ...p, name: '' })); }}
                  placeholder="Jan Kowalski"
                  maxLength={120}
                  style={inputStyle('name')}
                  onFocus={e => (e.target.style.borderColor = '#1e9953')}
                  onBlur={e => (e.target.style.borderColor = errors.name ? '#ef4444' : 'rgba(0,0,0,0.12)')}
                />
                {errors.name && <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px' }}>{errors.name}</div>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#6e6e73', marginBottom: '8px' }}>Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => { setFormData(p => ({ ...p, email: e.target.value })); setErrors(p => ({ ...p, email: '' })); }}
                  placeholder="jan@firma.pl"
                  maxLength={254}
                  style={inputStyle('email')}
                  onFocus={e => (e.target.style.borderColor = '#1e9953')}
                  onBlur={e => (e.target.style.borderColor = errors.email ? '#ef4444' : 'rgba(0,0,0,0.12)')}
                />
                {errors.email && <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px' }}>{errors.email}</div>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#6e6e73', marginBottom: '8px' }}>Szkolenie *</label>
                <select
                  value={formData.training}
                  onChange={e => { setFormData(p => ({ ...p, training: e.target.value })); setErrors(p => ({ ...p, training: '' })); }}
                  style={{ ...inputStyle('training'), cursor: 'pointer' }}
                >
                  <option value="">– Wybierz szkolenie –</option>
                  {trainings.map(t => (
                    <option key={t.slug} value={t.slug}>{t.title} – {t.priceLabel}</option>
                  ))}
                </select>
                {errors.training && <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px' }}>{errors.training}</div>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#6e6e73', marginBottom: '8px' }}>Preferowana forma</label>
                <select
                  value={formData.form}
                  onChange={e => setFormData(p => ({ ...p, form: e.target.value }))}
                  style={{ ...inputStyle('form'), cursor: 'pointer' }}
                >
                  <option value="">– Wybierz formę –</option>
                  <option value="stacjonarnie">Stacjonarnie (u Ciebie w firmie)</option>
                  <option value="online">Online (Teams / Zoom)</option>
                  <option value="bez-preferencji">Bez preferencji</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#6e6e73', marginBottom: '8px' }}>Dodatkowe informacje</label>
                <textarea
                  value={formData.message}
                  onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  placeholder="Liczba pracowników, preferowany termin, poziom zaawansowania zespołu..."
                  rows={4}
                  maxLength={4000}
                  style={{ ...inputStyle('message'), resize: 'vertical', lineHeight: 1.6 }}
                  onFocus={e => (e.target.style.borderColor = '#1e9953')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(0,0,0,0.12)')}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  background: loading ? '#6e6e73' : '#1e9953',
                  color: 'white', border: 'none', padding: '16px',
                  borderRadius: '12px', fontSize: '16px', fontWeight: 500,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontFamily: 'inherit', transition: 'background 0.2s', marginTop: '8px',
                }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#17803f'; }}
                onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#1e9953'; }}
              >
                {loading ? 'Wysyłanie...' : 'Wyślij zgłoszenie'}
              </button>
              {sendError && (
                <div style={{ color: '#ef4444', fontSize: '14px', textAlign: 'center', marginTop: '8px' }}>
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
