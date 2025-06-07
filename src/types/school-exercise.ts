export type GradeLevel = '1º ano' | '2º ano';
export type Subject = 'Português' | 'Matemática' | 'Inglês' | 'Estudo do Meio';

export interface Question {
  id: number;
  question: string;
  options?: string[];
  correctAnswer: string | number;
  imageUrl?: string;
}

export interface SchoolExercise {
  id: number;
  title: string;
  grade: GradeLevel;
  subject: Subject;
  description: string;
  questions: Question[];
  difficulty: 'fácil' | 'médio' | 'difícil';
}
