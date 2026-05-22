'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import QuizIntro from './QuizIntro';
import QuizQuestion from './QuizQuestion';
import QuizResult from './QuizResult';
import { questions } from '../data/questions';
import type { AnswerRecord } from '../types';

type Step = 'intro' | 'question' | 'result';

const VARIANTS = {
  enter: (dir: number) => ({ x: dir > 0 ? 52 : -52, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -52 : 52, opacity: 0 }),
};

const TRANSITION = { duration: 0.28, ease: [0.4, 0, 0.2, 1] as const };

export default function QuizClient() {
  const [step, setStep] = useState<Step>('intro');
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<(1 | 2 | 3)[]>([]);
  const [dir, setDir] = useState(1);

  const totalScore = answers.reduce((s, a) => s + a, 0);

  const answerRecords: AnswerRecord[] = questions.map((q, i) => ({
    questionId: q.id,
    area: q.area,
    points: (answers[i] ?? 1) as 1 | 2 | 3,
  }));

  const handleStart = useCallback(() => {
    setDir(1);
    setStep('question');
  }, []);

  const handleAnswer = useCallback(
    (points: 1 | 2 | 3) => {
      const next = [...answers];
      next[qIndex] = points;
      setAnswers(next);
      setDir(1);
      if (qIndex < questions.length - 1) {
        setQIndex(qIndex + 1);
      } else {
        setStep('result');
      }
    },
    [answers, qIndex]
  );

  const handleBack = useCallback(() => {
    setDir(-1);
    if (qIndex > 0) {
      setQIndex(qIndex - 1);
    } else {
      setStep('intro');
    }
  }, [qIndex]);

  return (
    <div style={{ minHeight: '100dvh', background: '#f5f5f7', display: 'flex', flexDirection: 'column' }}>
      {/* Minimal header */}
      <header style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <a href="https://pbix.pl" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #003d20, #1e9953)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 800,
            }}
          >
            PB
          </div>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.3px' }}>
            pbix.pl
          </span>
        </a>
      </header>

      {/* Quiz area */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '8px 16px 40px',
          overflowX: 'hidden',
        }}
      >
        <div style={{ width: '100%', maxWidth: '640px' }}>
          <AnimatePresence mode="wait" custom={dir}>
            {step === 'intro' && (
              <motion.div key="intro" custom={dir} variants={VARIANTS} initial="enter" animate="center" exit="exit" transition={TRANSITION}>
                <QuizIntro onStart={handleStart} />
              </motion.div>
            )}

            {step === 'question' && (
              <motion.div key={`q-${qIndex}`} custom={dir} variants={VARIANTS} initial="enter" animate="center" exit="exit" transition={TRANSITION}>
                <QuizQuestion
                  question={questions[qIndex]}
                  questionIndex={qIndex}
                  total={questions.length}
                  savedAnswer={answers[qIndex]}
                  onAnswer={handleAnswer}
                  onBack={handleBack}
                />
              </motion.div>
            )}

            {step === 'result' && (
              <motion.div key="result" custom={dir} variants={VARIANTS} initial="enter" animate="center" exit="exit" transition={TRANSITION}>
                <QuizResult score={totalScore} answers={answerRecords} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
