'use client';

import { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import LeadCaptureModal from '@/components/LeadCaptureModal';
import LevelQuiz from '@/components/LevelQuiz';
import { IconClipboardCheck } from '@/components/Icons';

interface Props {
  variant?: 'card' | 'plain';
}

export default function LevelTestCTA({ variant = 'card' }: Props) {
  const [open, setOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);

  const inner = (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        gap: '28px',
        alignItems: 'center',
      }}
      className="lead-magnet-grid"
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          background: 'rgba(30,153,83,0.12)',
          borderRadius: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <IconClipboardCheck size={28} color="#1e9953" />
      </div>
      <div>
        <h2 style={{ fontSize: 'clamp(20px, 2.6vw, 26px)', fontWeight: 700, color: '#1d1d1f', margin: '0 0 8px', letterSpacing: '-0.4px' }}>
          Nie wiesz, które szkolenie wybrać?
        </h2>
        <p style={{ color: '#6e6e73', fontSize: '15px', lineHeight: 1.65, margin: 0 }}>
          Uzupełnij quiz i sprawdź swój poziom wiedzy z Excela!
        </p>
      </div>
      <button
        onClick={() => setQuizOpen(true)}
        style={{
          background: '#1e9953',
          color: 'white',
          border: 'none',
          padding: '13px 24px',
          borderRadius: '980px',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: 'inherit',
          transition: 'background 0.2s',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = '#17803f')}
        onMouseLeave={(e) => (e.currentTarget.style.background = '#1e9953')}
      >
        Rozwiąż quiz
      </button>
    </div>
  );

  return (
    <section style={{ padding: '80px 24px', background: variant === 'card' ? '#f9f9f9' : '#ffffff' }}>
      <div style={{ maxWidth: '880px', margin: '0 auto' }}>
        <ScrollReveal>
          <div
            style={{
              background: variant === 'card' ? 'rgba(30,153,83,0.06)' : '#ffffff',
              border: '1px solid rgba(30,153,83,0.18)',
              borderRadius: '24px',
              padding: '40px 44px',
            }}
          >
            {inner}
          </div>
        </ScrollReveal>
      </div>

      <LeadCaptureModal
        open={open}
        onClose={() => setOpen(false)}
        fileName="test-poziomujacy-excel.xlsx"
        source="level-test"
        title="Pobierz test poziomujący"
        description="Wpisz swój email, a wyślę Ci test poziomujący w formacie Excel. Po wypełnieniu odeślij go do mnie, a dobiorę szkolenie do Twojego poziomu."
      />

      <LevelQuiz open={quizOpen} onClose={() => setQuizOpen(false)} />
    </section>
  );
}
