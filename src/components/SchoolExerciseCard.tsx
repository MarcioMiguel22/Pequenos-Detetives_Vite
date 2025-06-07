import { useState, useEffect } from 'react';
import { SchoolExercise } from '../types/school-exercise';
import '../styles/SchoolExerciseCard.css';

interface SchoolExerciseCardProps {
  exercise: SchoolExercise;
  onComplete: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  isFirstExercise?: boolean;
  isLastExercise?: boolean;
}

export default function SchoolExerciseCard({ 
  exercise, 
  onComplete, 
  onPrevious, 
  onNext,
  isFirstExercise = false,
  isLastExercise = false
}: SchoolExerciseCardProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentQuestion = exercise.questions[currentQuestionIndex];

  useEffect(() => {
    setSelectedAnswer(null);
    setShowResult(false);
  }, [currentQuestionIndex]);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const correctAnswer = String(currentQuestion.correctAnswer);
    const isAnswerCorrect = selectedAnswer === correctAnswer;

    setIsCorrect(isAnswerCorrect);
    setShowResult(true);

    if (isAnswerCorrect) {
      setCompletedQuestions([...completedQuestions, currentQuestion.id]);
    }

    // Após 2 segundos, move para a próxima pergunta ou finaliza
    setTimeout(() => {
      if (isAnswerCorrect) {
        if (currentQuestionIndex < exercise.questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          onComplete();
        }
      }
      setShowResult(false);
    }, 2000);
  };

  const readText = (text: string) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = text;
      speech.lang = 'pt-PT';
      speech.rate = 0.9;
      speech.pitch = 1.1;

      speech.onstart = () => setIsPlaying(true);
      speech.onend = () => setIsPlaying(false);

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(speech);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'fácil': return 'green';
      case 'médio': return 'orange';
      case 'difícil': return 'red';
      default: return 'gray';
    }
  };

  return (
    <div className="school-exercise-card">
      <div className="exercise-header">
        <h2>{exercise.title}</h2>
        <div className="exercise-meta">
          <span className="exercise-grade">{exercise.grade}</span>
          <span className="exercise-subject">{exercise.subject}</span>
          <span 
            className="difficulty-badge" 
            style={{ backgroundColor: getDifficultyColor(exercise.difficulty) }}
          >
            {exercise.difficulty}
          </span>
        </div>
      </div>

      <div className="exercise-description">
        <p>{exercise.description}</p>
      </div>

      <div className="question-progress">
        <span>Pergunta {currentQuestionIndex + 1} de {exercise.questions.length}</span>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(completedQuestions.length / exercise.questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="question-container">
        <p className="question-text">{currentQuestion.question}</p>
        <button 
          className={`audio-button ${isPlaying ? 'playing' : ''}`} 
          onClick={() => readText(currentQuestion.question)}
          aria-label={isPlaying ? "Parar leitura" : "Ouvir pergunta"}
        >
          {isPlaying ? '🔊' : '🔈'}
        </button>
      </div>

      {currentQuestion.imageUrl && (
        <div className="question-image">
          <div className="emoji-display">
            {currentQuestion.imageUrl.startsWith('emoji:') 
              ? <span className="question-emoji">{currentQuestion.imageUrl.replace('emoji:', '')}</span>
              : <span className="question-emoji">📷</span> /* Default emoji if not properly formatted */
            }
          </div>
        </div>
      )}

      <div className="answer-options">
        {currentQuestion.options?.map((option, index) => (
          <div 
            key={index}
            className={`answer-option 
              ${selectedAnswer === option ? 'selected' : ''}
              ${showResult && selectedAnswer === option && isCorrect ? 'correct' : ''}
              ${showResult && selectedAnswer === option && !isCorrect ? 'incorrect' : ''}`}
            onClick={() => handleAnswerSelect(option)}
          >
            {option}
          </div>
        ))}
      </div>

      <div className="action-buttons">
        <button 
          className="submit-button" 
          disabled={!selectedAnswer}
          onClick={handleSubmit}
        >
          Verificar Resposta
        </button>
        
        <div className="navigation-buttons">
          <button 
            className="prev-button"
            onClick={onPrevious}
            disabled={isFirstExercise}
          >
            ← Anterior
          </button>
          <button 
            className="next-button"
            onClick={onNext}
            disabled={isLastExercise}
          >
            Próximo →
          </button>
        </div>
      </div>

      {showResult && (
        <div className={`result-message ${isCorrect ? 'success' : 'error'}`}>
          {isCorrect 
            ? '🎉 Correto! Muito bem!' 
            : `❌ Ops! A resposta correta é: ${currentQuestion.correctAnswer}`}
        </div>
      )}
    </div>
  );
}
