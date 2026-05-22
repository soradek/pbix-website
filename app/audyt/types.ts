export interface Question {
  id: number;
  area: string;
  question: string;
  answers: {
    label: string;
    points: 1 | 2 | 3;
  }[];
}

export type QuizStep = 'intro' | 'question' | 'form' | 'result';

export interface Lead {
  name: string;
  company: string;
  position: string;
  email: string;
  phone: string;
  consent: boolean;
}

export interface AnswerRecord {
  questionId: number;
  area: string;
  points: 1 | 2 | 3;
}
