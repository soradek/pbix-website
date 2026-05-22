'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScoreGauge from './ScoreGauge';
import type { AnswerRecord } from '../types';

interface LevelConfig {
  label: string;
  icon: string;
  color: string;
  description: string;
  estimate: string;
  recommendation: string;
}

function getLevel(score: number): LevelConfig {
  if (score <= 15) {
    return {
      label: 'Początek drogi',
      icon: '🔴',
      color: '#DC2626',
      description:
        'Twoja firma jest na wczesnym etapie cyfryzacji raportowania. Większość procesów raportowych opiera się na pracy ręcznej w Excelu, a dane docierają do decydentów z dużym opóźnieniem. To normalne — większość polskich firm produkcyjnych jest na tym poziomie.',
      estimate: 'Szacunkowa strata: 30–50 roboczogodzin miesięcznie na ręczne raportowanie.',
      recommendation:
        'Zacznij od audytu raportowania (1 dzień) — zidentyfikuję najszybsze quick wins i pokażę prototyp dashboardu na Twoich danych.',
    };
  }
  if (score <= 22) {
    return {
      label: 'W połowie drogi',
      icon: '🟡',
      color: '#F59E0B',
      description:
        'Twoja firma ma podstawy — korzystacie z ERP, macie częściową automatyzację, ale raportowanie nadal wymaga dużo pracy ręcznej. Brakuje dashboardów, które dałyby zarządowi bieżący obraz sytuacji.',
      estimate: 'Szacunkowa strata: 15–30 roboczogodzin miesięcznie na procesy, które powinny być automatyczne.',
      recommendation:
        'Najlepszy next step: szkolenie Power BI + Power Query dla zespołu (2 dni) lub Dashboard MVP — jeden dashboard na Twoich danych w 2–3 dni.',
    };
  }
  return {
    label: 'Zaawansowany',
    icon: '🟢',
    color: '#1e9953',
    description:
      'Twoja firma jest na zaawansowanym poziomie dojrzałości raportowej. Korzystacie z dashboardów, automatyzacji i macie kulturę pracy z danymi. Warto teraz optymalizować i rozszerzać.',
    estimate:
      'Twój zespół już oszczędza czas dzięki automatyzacji. Kolejny krok to zaawansowane analizy, predykcja i optymalizacja istniejących procesów.',
    recommendation:
      'Rozważ zaawansowane szkolenie DAX/Power Query lub konsultację optymalizacyjną — pokażę, co jeszcze da się wycisnąć z Waszych danych.',
  };
}

function pointsIcon(p: 1 | 2 | 3) {
  if (p === 1) return '🔴';
  if (p === 2) return '🟡';
  return '🟢';
}

function pointsLabel(p: 1 | 2 | 3) {
  if (p === 1) return 'Poziom 1';
  if (p === 2) return 'Poziom 2';
  return 'Poziom 3';
}

interface Props {
  score: number;
  answers: AnswerRecord[];
}

type ContactState = 'idle' | 'open' | 'sending' | 'sent' | 'error';

export default function QuizResult({ score, answers }: Props) {
  const [copied, setCopied] = useState(false);
  const [contactState, setContactState] = useState<ContactState>('idle');
  const [email, setEmail] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const level = getLevel(score);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText('https://pbix.pl/audyt');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleSendContact = async () => {
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) return;

    setContactState('sending');
    try {
      await fetch('/api/audyt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmed,
          score,
          level: level.label,
          completedAt: new Date().toISOString(),
        }),
      });
      setContactState('sent');
    } catch {
      setContactState('error');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Main result card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: '#fff',
          borderRadius: '32px',
          border: '1px solid rgba(0,0,0,0.06)',
          padding: 'clamp(28px, 5vw, 44px)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}
      >
        {/* Score gauge + level */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <ScoreGauge score={score} maxScore={30} color={level.color} />
          <div style={{ marginTop: '16px' }}>
            <div style={{ fontSize: '28px', marginBottom: '6px' }}>{level.icon}</div>
            <h2
              style={{
                fontSize: 'clamp(22px, 4vw, 28px)',
                fontWeight: 800,
                color: '#1d1d1f',
                margin: '0 0 4px',
                letterSpacing: '-0.8px',
              }}
            >
              {level.label}
            </h2>
            <div
              style={{
                display: 'inline-block',
                background: `${level.color}18`,
                color: level.color,
                borderRadius: '980px',
                padding: '4px 14px',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.5px',
              }}
            >
              {score} / 30 punktów
            </div>
          </div>
        </div>

        {/* Description */}
        <p style={{ fontSize: '14px', color: '#6e6e73', lineHeight: 1.65, margin: '0 0 16px' }}>
          {level.description}
        </p>

        {/* Estimate box */}
        <div
          style={{
            background: `${level.color}0d`,
            border: `1px solid ${level.color}30`,
            borderRadius: '16px',
            padding: '14px 18px',
            marginBottom: '16px',
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start',
          }}
        >
          <span style={{ fontSize: '18px', flexShrink: 0 }}>⏱</span>
          <p style={{ fontSize: '13px', color: '#1d1d1f', fontWeight: 600, margin: 0, lineHeight: 1.5 }}>
            {level.estimate}
          </p>
        </div>

        {/* Recommendation */}
        <div
          style={{
            background: 'rgba(30,153,83,0.06)',
            border: '1px solid rgba(30,153,83,0.18)',
            borderRadius: '16px',
            padding: '16px 18px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              fontSize: '10px',
              color: '#1e9953',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              fontWeight: 700,
              marginBottom: '8px',
            }}
          >
            Rekomendacja
          </div>
          <p style={{ fontSize: '14px', color: '#1d1d1f', fontWeight: 600, margin: 0, lineHeight: 1.55 }}>
            {level.recommendation}
          </p>
        </div>

        {/* Contact capture */}
        <AnimatePresence mode="wait">
          {contactState === 'sent' ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                background: 'rgba(30,153,83,0.08)',
                border: '1px solid rgba(30,153,83,0.2)',
                borderRadius: '16px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                <circle cx="10" cy="10" r="10" fill="#1e9953" />
                <path d="M5.5 10.5L8.5 13.5L14.5 7" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1f' }}>
                Wysłano — odezwę się wkrótce.
              </span>
            </motion.div>
          ) : contactState === 'open' || contactState === 'sending' || contactState === 'error' ? (
            <motion.div
              key="open"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  placeholder="twoj@email.pl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendContact()}
                  autoFocus
                  style={{
                    flex: 1,
                    border: `1.5px solid ${emailFocused ? '#1e9953' : 'rgba(0,0,0,0.12)'}`,
                    borderRadius: '980px',
                    padding: '13px 18px',
                    fontSize: '15px',
                    color: '#1d1d1f',
                    fontFamily: 'inherit',
                    background: '#fff',
                    outline: 'none',
                    transition: 'border-color 0.18s',
                  }}
                />
                <button
                  onClick={handleSendContact}
                  disabled={contactState === 'sending'}
                  style={{
                    background: contactState === 'sending' ? '#6e6e73' : '#1e9953',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '980px',
                    padding: '13px 20px',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: contactState === 'sending' ? 'not-allowed' : 'pointer',
                    fontFamily: 'inherit',
                    transition: 'background 0.18s',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                  onMouseEnter={(e) => { if (contactState !== 'sending') e.currentTarget.style.background = '#17803f'; }}
                  onMouseLeave={(e) => { if (contactState !== 'sending') e.currentTarget.style.background = '#1e9953'; }}
                >
                  {contactState === 'sending' ? (
                    'Wysyłam…'
                  ) : (
                    <>
                      Wyślij
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 7H13M13 7L8 2M13 7L8 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
              {contactState === 'error' && (
                <span style={{ fontSize: '12px', color: '#DC2626', paddingLeft: '4px' }}>
                  Coś poszło nie tak — spróbuj ponownie.
                </span>
              )}
            </motion.div>
          ) : (
            <motion.button
              key="idle"
              onClick={() => setContactState('open')}
              whileHover={{ scale: 1.008 }}
              whileTap={{ scale: 0.995 }}
              style={{
                width: '100%',
                background: '#1e9953',
                color: '#fff',
                border: 'none',
                borderRadius: '980px',
                padding: '15px 32px',
                fontSize: '15px',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'background 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#17803f')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#1e9953')}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1.5 4L8 9L14.5 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="1.5" y="3" width="13" height="10" rx="2" stroke="white" strokeWidth="1.6" />
              </svg>
              Zostaw do siebie kontakt
            </motion.button>
          )}
        </AnimatePresence>

        {/* Share button */}
        <button
          onClick={handleShare}
          style={{
            width: '100%',
            marginTop: '10px',
            background: 'transparent',
            color: '#6e6e73',
            border: '1.5px solid rgba(0,0,0,0.1)',
            borderRadius: '980px',
            padding: '13px 32px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'all 0.18s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '7px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#1e9953';
            e.currentTarget.style.color = '#1e9953';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)';
            e.currentTarget.style.color = '#6e6e73';
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="11" cy="2.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="11" cy="11.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="3" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M4.4 6.2L9.6 3.3M4.4 7.8L9.6 10.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {copied ? 'Link skopiowany!' : 'Udostępnij quiz'}
        </button>
      </motion.div>

      {/* Answer breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        style={{
          background: '#fff',
          borderRadius: '32px',
          border: '1px solid rgba(0,0,0,0.06)',
          padding: 'clamp(24px, 4vw, 36px)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}
      >
        <h3
          style={{
            fontSize: '15px',
            fontWeight: 700,
            color: '#1d1d1f',
            margin: '0 0 16px',
            letterSpacing: '-0.3px',
          }}
        >
          Szczegółowe wyniki wg obszarów
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {answers.map((a) => (
            <div
              key={a.questionId}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                padding: '10px 14px',
                background: '#f5f5f7',
                borderRadius: '12px',
              }}
            >
              <span style={{ fontSize: '13px', color: '#1d1d1f', fontWeight: 500, flex: 1 }}>
                {a.area}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                <span style={{ fontSize: '16px' }}>{pointsIcon(a.points)}</span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#6e6e73',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  {pointsLabel(a.points)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{ textAlign: 'center', padding: '16px 0 8px' }}
      >
        <p style={{ fontSize: '12px', color: '#6e6e73', margin: 0 }}>
          Powered by{' '}
          <a href="https://pbix.pl" style={{ color: '#1e9953', textDecoration: 'none', fontWeight: 600 }}>
            PBIX.pl
          </a>{' '}
          · Radosław Sobczak · MCT
        </p>
      </motion.div>
    </div>
  );
}
