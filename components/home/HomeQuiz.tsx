'use client';

import { useState } from 'react';
import LevelQuiz from '@/components/LevelQuiz';
import s from './home.module.css';
import { RollingButton } from './RollingButton';

export default function HomeQuiz() {
  const [open, setOpen] = useState(false);

  return (
    <section className={`${s.sectionTight} ${s.onWhite}`}>
      <div className={s.container}>
        <div className={s.quizBand}>
          <div>
            <p className={s.quizTitle}>Nie wiesz, który poziom wybrać?</p>
            <p className={s.quizText}>Rozwiąż krótki quiz z Excela i sprawdź, od czego zacząć.</p>
          </div>
          <RollingButton onClick={() => setOpen(true)} label="Rozwiąż quiz" variant="dark" />
        </div>
      </div>
      <LevelQuiz open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
