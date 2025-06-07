export type GradeLevel = '1º ano' | '2º ano';
export type Subject = 'Português' | 'Matemática' | 'Inglês' | 'Estudo do Meio';

export interface SchoolExercise {
  id: number;
  title: string;
  description: string;
  subject: string;
  grade: string;
  difficulty: string;
  questions: Question[];
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  imageUrl: string | null; // Now can contain 'emoji:🍎' format strings instead of URLs
}
