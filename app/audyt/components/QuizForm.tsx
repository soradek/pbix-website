'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Lead, AnswerRecord } from '../types';

interface Props {
  score: number;
  answers: AnswerRecord[];
  onSubmit: (lead: Lead) => void;
  onSkip: () => void;
  onBack: () => void;
}

interface FormErrors {
  name?: string;
  company?: string;
  email?: string;
  consent?: string;
}

function InputField({
  label,
  required,
  type = 'text',
  placeholder,
  value,
  error,
  onChange,
}: {
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label
        style={{
          fontSize: '12px',
          fontWeight: 600,
          color: '#6e6e73',
          textTransform: 'uppercase',
          letterSpacing: '0.8px',
        }}
      >
        {label}
        {required && <span style={{ color: '#DC2626', marginLeft: '3px' }}>*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          border: `1.5px solid ${error ? '#DC2626' : focused ? '#1e9953' : 'rgba(0,0,0,0.12)'}`,
          borderRadius: '12px',
          padding: '12px 14px',
          fontSize: '15px',
          color: '#1d1d1f',
          fontFamily: 'inherit',
          background: '#fff',
          outline: 'none',
          transition: 'border-color 0.18s',
          width: '100%',
          boxSizing: 'border-box',
        }}
      />
      {error && (
        <span style={{ fontSize: '12px', color: '#DC2626', fontWeight: 500 }}>{error}</span>
      )}
    </div>
  );
}

export default function QuizForm({ score, answers, onSubmit, onSkip, onBack }: Props) {
  const [formData, setFormData] = useState<Lead>({
    name: '',
    company: '',
    position: '',
    email: '',
    phone: '',
    consent: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const set = (key: keyof Lead, value: string | boolean) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!formData.name.trim()) e.name = 'Imię jest wymagane';
    if (!formData.company.trim()) e.company = 'Nazwa firmy jest wymagana';
    if (!formData.email.trim()) e.email = 'Email jest wymagany';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email)) e.email = 'Nieprawidłowy adres email';
    if (!formData.consent) e.consent = 'Zgoda jest wymagana';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      localStorage.setItem(
        'audyt_lead',
        JSON.stringify({ ...formData, score, date: new Date().toISOString() })
      );
    } catch {}

    try {
      await fetch('/api/audyt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          position: formData.position,
          email: formData.email,
          phone: formData.phone,
          score,
          answers,
        }),
      });
    } catch {}

    setLoading(false);
    onSubmit(formData);
  };

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '32px',
        border: '1px solid rgba(0,0,0,0.06)',
        padding: 'clamp(24px, 5vw, 44px)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '14px',
            background: 'rgba(30,153,83,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            fontSize: '20px',
          }}
        >
          📬
        </div>
        <h2
          style={{
            fontSize: 'clamp(20px, 3.5vw, 26px)',
            fontWeight: 800,
            color: '#1d1d1f',
            margin: '0 0 8px',
            letterSpacing: '-0.8px',
          }}
        >
          Prawie gotowe — gdzie wysłać Twój raport?
        </h2>
        <p style={{ fontSize: '14px', color: '#6e6e73', margin: 0, lineHeight: 1.55 }}>
          Wyślę Ci spersonalizowaną analizę z rekomendacjami i szacunkową oszczędnością czasu.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <InputField
            label="Imię i nazwisko"
            required
            placeholder="Jan Kowalski"
            value={formData.name}
            error={errors.name}
            onChange={(v) => { set('name', v); setErrors((p) => ({ ...p, name: undefined })); }}
          />
          <InputField
            label="Firma"
            required
            placeholder="Nazwa firmy"
            value={formData.company}
            error={errors.company}
            onChange={(v) => { set('company', v); setErrors((p) => ({ ...p, company: undefined })); }}
          />
          <InputField
            label="Stanowisko"
            placeholder="np. Kierownik produkcji"
            value={formData.position}
            onChange={(v) => set('position', v)}
          />
          <InputField
            label="Email"
            required
            type="email"
            placeholder="jan@firma.pl"
            value={formData.email}
            error={errors.email}
            onChange={(v) => { set('email', v); setErrors((p) => ({ ...p, email: undefined })); }}
          />
          <InputField
            label="Telefon"
            type="tel"
            placeholder="+48 500 000 000"
            value={formData.phone}
            onChange={(v) => set('phone', v)}
          />

          {/* Consent checkbox */}
          <div>
            <label
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                cursor: 'pointer',
              }}
            >
              <div style={{ position: 'relative', flexShrink: 0, marginTop: '1px' }}>
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => { set('consent', e.target.checked); setErrors((p) => ({ ...p, consent: undefined })); }}
                  style={{ opacity: 0, position: 'absolute', width: '100%', height: '100%', margin: 0, cursor: 'pointer' }}
                />
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '6px',
                    border: `2px solid ${errors.consent ? '#DC2626' : formData.consent ? '#1e9953' : 'rgba(0,0,0,0.15)'}`,
                    background: formData.consent ? '#1e9953' : '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.18s',
                    pointerEvents: 'none',
                  }}
                >
                  {formData.consent && (
                    <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                      <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
              <span style={{ fontSize: '13px', color: '#6e6e73', lineHeight: 1.5, fontWeight: 500 }}>
                Wyrażam zgodę na kontakt w sprawie wyników audytu
                <span style={{ color: '#DC2626' }}> *</span>
              </span>
            </label>
            {errors.consent && (
              <span style={{ fontSize: '12px', color: '#DC2626', fontWeight: 500, display: 'block', marginTop: '6px', paddingLeft: '30px' }}>
                {errors.consent}
              </span>
            )}
          </div>
        </div>

        <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: loading ? '#6e6e73' : '#1e9953',
              color: '#fff',
              border: 'none',
              borderRadius: '980px',
              padding: '15px 32px',
              fontSize: '15px',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = '#17803f'; }}
            onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = '#1e9953'; }}
          >
            {loading ? 'Wysyłanie…' : 'Zobacz wynik →'}
          </button>

          <button
            type="button"
            onClick={onSkip}
            style={{
              background: 'none',
              border: 'none',
              color: '#6e6e73',
              fontSize: '13px',
              cursor: 'pointer',
              fontFamily: 'inherit',
              padding: '6px 0',
              textAlign: 'center',
              fontWeight: 500,
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#1d1d1f')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#6e6e73')}
          >
            Pomiń i zobacz wynik →
          </button>
        </div>
      </form>

      <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            color: '#6e6e73',
            fontSize: '13px',
            cursor: 'pointer',
            padding: '0',
            fontFamily: 'inherit',
            fontWeight: 500,
            transition: 'color 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#1d1d1f')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#6e6e73')}
        >
          ← Wróć do pytań
        </button>
      </div>
    </div>
  );
}
