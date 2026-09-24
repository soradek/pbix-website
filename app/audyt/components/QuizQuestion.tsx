'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import QuizProgress from './QuizProgress';
import type { Question } from '../types';

interface Props {
  question: Question;
  questionIndex: number;
  total: number;
  savedAnswer?: 1 | 2 | 3;
  onAnswer: (points: 1 | 2 | 3) => void;
  onBack: () => void;
}

const LABELS = ['A', 'B', 'C'];

export default function QuizQuestion({ question, questionIndex, total, savedAnswer, onAnswer, onBack }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (idx: number, points: 1 | 2 | 3) => {
    if (selected !== null) return;
    setSelected(idx);
    setTimeout(() => {
      onAnswer(points);
    }, 320);
  };

  return (
    <div
      style={{
        background: 'var(--white)',
        borderRadius: '32px',
        border: '1px solid rgba(0,0,0,0.06)',
        padding: 'clamp(24px, 5vw, 44px)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      }}
    >
      <QuizProgress current={questionIndex + 1} total={total} />

      <div style={{ margin: '10px 0 4px' }}>
        <span
          style={{
            fontSize: 'var(--fs-label)',
            color: 'var(--accent)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
          }}
        >
          {question.area}
        </span>
      </div>

      <h2
        style={{
          fontSize: 'var(--fs-lead)',
          fontWeight: 700,
          color: 'var(--text)',
          margin: '8px 0 24px',
          letterSpacing: '-0.4px',
          lineHeight: 1.4,
        }}
      >
        {question.question}
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {question.answers.map((answer, idx) => {
          const isSelected = selected === idx;
          const isFaded = selected !== null && !isSelected;

          return (
            <motion.button
              key={idx}
              onClick={() => handleSelect(idx, answer.points)}
              whileHover={selected === null ? { scale: 1.008 } : {}}
              whileTap={selected === null ? { scale: 0.995 } : {}}
              animate={isSelected ? { scale: [1, 1.015, 1] } : {}}
              transition={{ duration: 0.2 }}
              style={{
                background: isSelected ? 'rgba(30,153,83,0.07)' : 'var(--white)',
                border: `2px solid ${isSelected ? 'var(--accent)' : 'rgba(0,0,0,0.08)'}`,
                borderRadius: '16px',
                padding: '14px 16px',
                cursor: selected !== null ? 'default' : 'pointer',
                textAlign: 'left',
                fontFamily: 'inherit',
                fontSize: 'var(--fs-body)',
                color: 'var(--text)',
                fontWeight: 500,
                lineHeight: 1.45,
                transition: 'border-color 0.18s, background 0.18s, opacity 0.18s',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                opacity: isFaded ? 0.38 : 1,
              }}
              onMouseEnter={(e) => {
                if (selected !== null) return;
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.background = 'rgba(30,153,83,0.04)';
              }}
              onMouseLeave={(e) => {
                if (selected !== null || isSelected) return;
                e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)';
                e.currentTarget.style.background = 'var(--white)';
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: '26px',
                  height: '26px',
                  borderRadius: '8px',
                  background: isSelected ? 'var(--accent)' : 'rgba(0,0,0,0.05)',
                  color: isSelected ? 'var(--white)' : 'var(--muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--fs-label)',
                  fontWeight: 700,
                  letterSpacing: '0',
                  transition: 'background 0.18s, color 0.18s',
                  marginTop: '1px',
                }}
              >
                {LABELS[idx]}
              </span>
              <span style={{ paddingTop: '1px' }}>{answer.label}</span>
            </motion.button>
          );
        })}
      </div>

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-start' }}>
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--muted)',
            fontSize: 'var(--fs-small)',
            cursor: 'pointer',
            padding: '6px 0',
            fontFamily: 'inherit',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            transition: 'color 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
        >
          ← Wstecz
        </button>
      </div>
    </div>
  );
}
