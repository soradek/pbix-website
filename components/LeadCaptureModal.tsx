'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconX, IconCheck, IconAlertCircle } from '@/components/Icons';
import { trackLead } from '@/lib/tracking';

interface Props {
  open: boolean;
  onClose: () => void;
  fileName: string;
  source: string;
  title?: string;
  description?: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function LeadCaptureModal({
  open,
  onClose,
  fileName,
  source,
  title = 'Pobierz materiał',
  description = 'Wypełnij formularz, a wyślę Ci materiał na podany adres email.',
}: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; consent?: string }>({});
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  function reset() {
    setName('');
    setEmail('');
    setCompany('');
    setConsent(false);
    setErrors({});
    setStatus('idle');
    setErrorMsg('');
  }

  function handleClose() {
    reset();
    onClose();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!name.trim()) errs.name = 'Podaj imię';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errs.email = 'Podaj poprawny email';
    if (!consent) errs.consent = 'Zgoda jest wymagana';
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, source, fileName }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus('error');
        setErrorMsg(data.error || 'Wystąpił błąd. Spróbuj ponownie.');
        return;
      }
      setStatus('success');
      trackLead(source);
      // Auto-trigger download
      if (data.downloadUrl) {
        const a = document.createElement('a');
        a.href = data.downloadUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch {
      setStatus('error');
      setErrorMsg('Brak połączenia z serwerem. Spróbuj ponownie.');
    }
  }

  const inputStyle = (err?: string): React.CSSProperties => ({
    width: '100%',
    background: '#ffffff',
    border: `1px solid ${err ? '#ef4444' : 'rgba(0,0,0,0.12)'}`,
    borderRadius: '12px',
    padding: '12px 14px',
    color: '#1d1d1f',
    fontSize: '14px',
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-modal-title"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            zIndex: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              maxWidth: '480px',
              width: '100%',
              maxHeight: '92vh',
              overflowY: 'auto',
              padding: '36px 32px',
              position: 'relative',
              boxShadow: '0 24px 64px rgba(0,0,0,0.20)',
            }}
          >
            <button
              onClick={handleClose}
              aria-label="Zamknij"
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '36px',
                height: '36px',
                border: 'none',
                background: 'rgba(0,0,0,0.04)',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.08)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.04)')}
            >
              <IconX size={16} color="#1d1d1f" />
            </button>

            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ width: '64px', height: '64px', background: 'rgba(30,153,83,0.12)', borderRadius: '50%', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconCheck size={32} color="#1e9953" strokeWidth={2.5} />
                </div>
                <h3 id="lead-modal-title" style={{ fontSize: '22px', fontWeight: 700, color: '#1d1d1f', margin: '0 0 12px', letterSpacing: '-0.5px' }}>
                  Dziękujemy!
                </h3>
                <p style={{ color: '#6e6e73', fontSize: '14px', lineHeight: 1.7, margin: '0 0 24px' }}>
                  Pobieranie pliku zostanie rozpoczęte automatycznie. Jeśli nic się nie dzieje, kliknij poniższy link.
                </p>
                <a
                  href={`/downloads/${fileName}`}
                  download
                  style={{ background: '#1e9953', color: 'white', textDecoration: 'none', padding: '12px 24px', borderRadius: '980px', fontSize: '14px', fontWeight: 600, display: 'inline-block' }}
                >
                  Pobierz materiał
                </a>
              </div>
            ) : (
              <>
                <h3 id="lead-modal-title" style={{ fontSize: '22px', fontWeight: 700, color: '#1d1d1f', margin: '0 0 8px', letterSpacing: '-0.5px', paddingRight: '32px' }}>
                  {title}
                </h3>
                <p style={{ color: '#6e6e73', fontSize: '14px', lineHeight: 1.6, margin: '0 0 24px' }}>
                  {description}
                </p>
                <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label htmlFor="lead-name" style={{ display: 'block', fontSize: '12px', color: '#6e6e73', marginBottom: '6px' }}>Imię *</label>
                    <input
                      id="lead-name"
                      type="text"
                      value={name}
                      onChange={(e) => { setName(e.target.value); setErrors(p => ({ ...p, name: undefined })); }}
                      maxLength={120}
                      style={inputStyle(errors.name)}
                      onFocus={(e) => (e.target.style.borderColor = '#1e9953')}
                      onBlur={(e) => (e.target.style.borderColor = errors.name ? '#ef4444' : 'rgba(0,0,0,0.12)')}
                    />
                    {errors.name && <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.name}</div>}
                  </div>
                  <div>
                    <label htmlFor="lead-email" style={{ display: 'block', fontSize: '12px', color: '#6e6e73', marginBottom: '6px' }}>Email *</label>
                    <input
                      id="lead-email"
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined })); }}
                      maxLength={254}
                      style={inputStyle(errors.email)}
                      onFocus={(e) => (e.target.style.borderColor = '#1e9953')}
                      onBlur={(e) => (e.target.style.borderColor = errors.email ? '#ef4444' : 'rgba(0,0,0,0.12)')}
                    />
                    {errors.email && <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.email}</div>}
                  </div>
                  <div>
                    <label htmlFor="lead-company" style={{ display: 'block', fontSize: '12px', color: '#6e6e73', marginBottom: '6px' }}>Firma (opcjonalnie)</label>
                    <input
                      id="lead-company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      maxLength={160}
                      style={inputStyle()}
                      onFocus={(e) => (e.target.style.borderColor = '#1e9953')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(0,0,0,0.12)')}
                    />
                  </div>
                  <label style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '12px', color: '#6e6e73', lineHeight: 1.55, cursor: 'pointer', marginTop: '4px' }}>
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => { setConsent(e.target.checked); setErrors(p => ({ ...p, consent: undefined })); }}
                      style={{ marginTop: '2px', accentColor: '#1e9953', flexShrink: 0 }}
                    />
                    <span>
                      Wyrażam zgodę na przetwarzanie moich danych osobowych przez Radosława Sobczaka (pbix.pl) w celu przesłania materiału edukacyjnego oraz informacji o szkoleniach. Mogę wycofać zgodę w dowolnym momencie.
                    </span>
                  </label>
                  {errors.consent && <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '-6px' }}>{errors.consent}</div>}

                  {status === 'error' && (
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '10px 12px', color: '#ef4444', fontSize: '12px', lineHeight: 1.5 }}>
                      <IconAlertCircle size={16} color="#ef4444" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    style={{
                      background: status === 'loading' ? '#6e6e73' : '#1e9953',
                      color: 'white',
                      border: 'none',
                      padding: '14px',
                      borderRadius: '12px',
                      fontSize: '15px',
                      fontWeight: 600,
                      cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                      fontFamily: 'inherit',
                      transition: 'background 0.2s',
                      marginTop: '4px',
                    }}
                    onMouseEnter={(e) => { if (status !== 'loading') e.currentTarget.style.background = '#17803f'; }}
                    onMouseLeave={(e) => { if (status !== 'loading') e.currentTarget.style.background = '#1e9953'; }}
                  >
                    {status === 'loading' ? 'Wysyłanie…' : 'Pobierz materiał'}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
