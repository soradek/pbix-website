'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { IconCheck } from '@/components/Icons';

interface Question {
  id: number;
  text: string;
  options: string[];
  points: number[];
}

interface LevelBand {
  name: string;
  range: [number, number];
  title: string;
  description: string;
  recommendation: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: 'Która z poniższych formuł poprawnie obliczy średnią tylko z wartości liczbowych w zakresie A1:A10, ignorując tekst i puste komórki?',
    options: ['ŚREDNIA(A1:A10)', 'SUMA(A1:A10)/ILE.NIEPUSTYCH(A1:A10)', 'ŚREDNIA.JEŻELI(A1:A10;">0")', 'LICZ(A1:A10)/SUMA(A1:A10)'],
    points: [3, 0, 0, 0],
  },
  {
    id: 2,
    text: 'Które stwierdzenie najlepiej opisuje różnicę między tabelą (Ctrl+T) a zwykłym zakresem danych w Excelu?',
    options: ['W tabeli odwołania w formułach automatycznie zmieniają się na strukturalne (np. [Sprzedaż]), co wpływa na sposób kopiowania i rozszerzania formuł', 'Tabela działa szybciej niż zwykły zakres, ponieważ Excel przechowuje ją w innej pamięci', 'W tabeli nie można używać adresów komórek (np. A1) w formułach', 'Tabela automatycznie blokuje możliwość sortowania i filtrowania danych'],
    points: [3, 0, 0, 0],
  },
  {
    id: 3,
    text: 'Co zrobi funkcja SUMA()?',
    options: ['Policzy liczbę komórek', 'Doda wskazane wartości', 'Znajdzie największą wartość', 'Zamieni tekst na liczbę'],
    points: [0, 3, 0, 0],
  },
  {
    id: 4,
    text: 'Do czego służy filtrowanie danych?',
    options: ['Do ukrywania całego arkusza', 'Do wyświetlania tylko wybranych rekordów', 'Do usuwania pustych komórek', 'Do zmiany formatu komórek'],
    points: [0, 3, 0, 0],
  },
  {
    id: 5,
    text: 'Które odwołanie w formule nie zmienia się po skopiowaniu?',
    options: ['A1', '$A$1', 'A$1', '$A1'],
    points: [0, 3, 0, 0],
  },
  {
    id: 6,
    text: 'Do czego służy formatowanie warunkowe?',
    options: ['Do automatycznego kolorowania komórek według reguł', 'Do tworzenia wykresów', 'Do sumowania danych', 'Do zabezpieczania arkusza hasłem'],
    points: [3, 0, 0, 0],
  },
  {
    id: 7,
    text: 'Która funkcja sprawdza warunek i zwraca jedną z dwóch wartości?',
    options: ['SUMA()', 'JEŻELI()', 'LICZ.JEŻELI()', 'ŚREDNIA()'],
    points: [0, 3, 0, 0],
  },
  {
    id: 8,
    text: 'Do czego służy tabela przestawna?',
    options: ['Do drukowania danych w formie tabeli', 'Do szybkiego podsumowania i analizy danych', 'Do ochrony komórek', 'Do usuwania duplikatów'],
    points: [0, 3, 0, 0],
  },
  {
    id: 9,
    text: 'Która funkcja wyszuka wartość w tabeli i poprawnie zadziała, gdy kolumna zwracana znajduje się po lewej stronie kolumny wyszukiwania?',
    options: ['WYSZUKAJ.PIONOWO()', 'INDEKS() + PODAJ.POZYCJĘ()', 'ZNAJDŹ()', 'LEWY()'],
    points: [0, 3, 0, 0],
  },
  {
    id: 10,
    text: 'Które z poniższych najlepiej opisuje różnicę między tabelą a zwykłym zakresem danych?',
    options: ['Tabela automatycznie rozszerza się o nowe dane i utrzymuje formuły', 'Tabela pozwala tylko na sortowanie danych', 'Zakres danych zawsze działa szybciej niż tabela', 'Tabela nie może zawierać formuł'],
    points: [3, 0, 0, 0],
  },
  {
    id: 11,
    text: 'Która formuła poprawnie policzy liczbę niepustych komórek zawierających liczby w zakresie A1:A10?',
    options: ['LICZ(A1:A10)', 'ILE.NIEPUSTYCH(A1:A10)', 'LICZ.JEŻELI(A1:A10;">0")', 'SUMA(A1:A10)'],
    points: [3, 0, 0, 0],
  },
  {
    id: 12,
    text: 'Do czego najczęściej używa się Power Query?',
    options: ['Do tworzenia animacji w arkuszu', 'Do pobierania, czyszczenia i przekształcania danych', 'Do drukowania raportów', 'Do tworzenia wykresów kołowych'],
    points: [0, 3, 0, 0],
  },
  {
    id: 13,
    text: 'Które narzędzie pozwala automatycznie połączyć dane z kilku tabel po wspólnym kluczu?',
    options: ['Formatowanie warunkowe', 'Model danych', 'Filtr zaawansowany', 'Konsolidacja danych'],
    points: [0, 3, 0, 0],
  },
  {
    id: 14,
    text: 'Która funkcja pozwala jednocześnie filtrować dane i zwracać dynamiczną tablicę wyników (Excel 365)?',
    options: ['SUMA.WARUNKÓW()', 'FILTRUJ()', 'JEŻELI()', 'WYSZUKAJ.PIONOWO()'],
    points: [0, 3, 0, 0],
  },
  {
    id: 15,
    text: 'Do czego służy funkcja LET() w Excelu?',
    options: ['Do formatowania komórek', 'Do nadawania nazw częściom formuły i upraszczania obliczeń', 'Do tworzenia tabel przestawnych', 'Do importu plików CSV'],
    points: [0, 3, 0, 0],
  },
];

const levelBands: LevelBand[] = [
  {
    name: 'Podstawowy',
    range: [0, 9],
    title: 'Podstawowy',
    description: 'Całkiem nieźle, ale chyba jeszcze trochę Ci brakuje do pełnej biegłości',
    recommendation: 'Zapoznaj się z ofertą Excel - poziom podstawowy.',
  },
  {
    name: 'Średnio zaawansowany',
    range: [10, 22],
    title: 'Średnio zaawansowany',
    description: 'Gratulacje! Wiesz już całkiem sporo na temat Excela',
    recommendation: 'Drzwi do rozwoju stoją przed Tobą otworem. Spróbuj ugruntować swoją wiedzę i poznać nowe narzędzia na szkoleniu Excel - poziom średniozaawansowany.',
  },
  {
    name: 'Zaawansowany',
    range: [23, 45],
    title: 'Zaawansowany',
    description: 'Bez dwóch zdań Excel jest Twoim sprzymierzeńcem',
    recommendation: 'Zapoznaj się z ofertą szkoleń zaawansowanych, w tym Excel - poziom zaawansowany lub Power Query. A może to już czas na Power BI...?',
  },
];

interface LevelQuizProps {
  open: boolean;
  onClose: () => void;
}

export default function LevelQuiz({ open, onClose }: LevelQuizProps) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const totalScore = answers.reduce((sum, points) => sum + points, 0);
  const currentLevel = levelBands.find(
    (band) => totalScore >= band.range[0] && totalScore <= band.range[1]
  ) || levelBands[0];

  const handleAnswer = (pointIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = questions[currentQuestion].points[pointIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  const handleClose = () => {
    handleRestart();
    onClose();
  };

  const handleViewTrainings = () => {
    router.push('/szkolenia');
  };

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9000,
        padding: '24px',
        backdropFilter: 'blur(4px)',
      }}
      onClick={handleClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'white',
          borderRadius: '32px',
          padding: 'clamp(32px, 5vw, 48px)',
          maxWidth: '680px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 32px 80px rgba(0,0,0,0.16)',
          position: 'relative',
        }}
      >
        {/* Close button (X) - visible for both questions and results */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#6e6e73',
            padding: '0',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#1d1d1f')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#6e6e73')}
        >
          ✕
        </button>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={`question-${currentQuestion}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div style={{ marginBottom: '32px' }}>
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                  }}
                >
                  <span style={{ fontSize: '12px', color: '#6e6e73', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Pytanie {currentQuestion + 1} / {questions.length}
                  </span>
                </motion.div>

                {/* Progress bar */}
                <div
                  style={{
                    width: '100%',
                    height: '6px',
                    background: '#f5f5f7',
                    borderRadius: '3px',
                    overflow: 'hidden',
                  }}
                >
                  <motion.div
                    initial={{ width: 0, opacity: 1 }}
                    animate={{
                      width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                    }}
                    transition={{ duration: 0.5 }}
                    style={{
                      height: '100%',
                      background: '#1e9953',
                    }}
                  />
                </div>
              </div>

              {/* Question */}
              <h2
                style={{
                  fontSize: 'clamp(20px, 2.4vw, 28px)',
                  fontWeight: 700,
                  color: '#1d1d1f',
                  margin: '0 0 32px',
                  letterSpacing: '-0.5px',
                }}
              >
                {questions[currentQuestion].text}
              </h2>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {questions[currentQuestion].options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      background: 'white',
                      border: '2px solid rgba(30,153,83,0.2)',
                      borderRadius: '16px',
                      padding: '16px 20px',
                      fontSize: '12px',
                      color: '#1d1d1f',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontFamily: 'inherit',
                      fontWeight: 500,
                      transition: 'all 0.2s',
                      lineHeight: '1.5',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#1e9953';
                      e.currentTarget.style.background = 'rgba(30,153,83,0.04)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(30,153,83,0.2)';
                      e.currentTarget.style.background = 'white';
                    }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{ textAlign: 'center' }}
            >
              {/* Result icon */}
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  background: 'rgba(30,153,83,0.12)',
                  borderRadius: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 28px',
                }}
              >
                <IconCheck size={40} color="#1e9953" strokeWidth={2.5} />
              </div>

              {/* Score */}
              <div style={{ marginBottom: '24px' }}>
                <div
                  style={{
                    fontSize: '11px',
                    color: '#6e6e73',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '8px',
                  }}
                >
                  Twój wynik
                </div>
                <div
                  style={{
                    fontSize: 'clamp(32px, 5vw, 48px)',
                    fontWeight: 800,
                    color: '#1e9953',
                    letterSpacing: '-1.5px',
                    lineHeight: 1,
                  }}
                >
                  {totalScore} / 45
                </div>
              </div>

              {/* Level */}
              <h2
                style={{
                  fontSize: 'clamp(24px, 3vw, 32px)',
                  fontWeight: 700,
                  color: '#1d1d1f',
                  margin: '0 0 10px',
                  letterSpacing: '-0.5px',
                }}
              >
                {currentLevel.title}
              </h2>

              <p
                style={{
                  color: '#6e6e73',
                  fontSize: '15px',
                  margin: '0 0 32px',
                  lineHeight: 1.6,
                }}
              >
                {currentLevel.description}
              </p>

              {/* Recommendation */}
              <div
                style={{
                  background: 'rgba(30,153,83,0.08)',
                  border: '1px solid rgba(30,153,83,0.2)',
                  borderRadius: '16px',
                  padding: '20px',
                  marginBottom: '32px',
                  textAlign: 'left',
                }}
              >
                <div
                  style={{
                    fontSize: '12px',
                    color: '#6e6e73',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '8px',
                  }}
                >
                  Rekomendacja
                </div>
                <p
                  style={{
                    color: '#1d1d1f',
                    fontSize: '15px',
                    lineHeight: 1.6,
                    margin: 0,
                    fontWeight: 500,
                  }}
                >
                  {currentLevel.recommendation}
                </p>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
                <button
                  onClick={handleViewTrainings}
                  style={{
                    background: '#1e9953',
                    color: 'white',
                    border: 'none',
                    padding: '14px 28px',
                    borderRadius: '980px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#17803f')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#1e9953')}
                >
                  Poznaj szkolenia
                </button>
                <button
                  onClick={handleRestart}
                  style={{
                    background: 'transparent',
                    color: '#1e9953',
                    border: '2px solid rgba(30,153,83,0.2)',
                    padding: '12px 28px',
                    borderRadius: '980px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#1e9953';
                    e.currentTarget.style.background = 'rgba(30,153,83,0.04)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(30,153,83,0.2)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  Powtórz quiz
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
