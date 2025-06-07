import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { schoolExercises } from '../data/school-exercises';
import SchoolExerciseCard from '../components/SchoolExerciseCard';
import '../styles/SchoolExercisesPage.css';

export default function SchoolExercisesPage() {
  const { grade, subject, id } = useParams<{ grade: string; subject: string; id: string }>();
  const navigate = useNavigate();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  
  // Map route parameters to the actual data values
  const subjectMap: Record<string, string> = {
    'portuguese': 'Português',
    'math': 'Matemática',
    'english': 'Inglês',
    'environment': 'Estudo do Meio'
  };
  
  const gradeMap: Record<string, string> = {
    '1': '1º ano',
    '2': '2º ano',
    '3': '3º ano',
    '4': '4º ano'
  };
  
  // Filter exercises based on the mapped subject and grade
  const [filteredExercises] = useState(
    schoolExercises.filter(exercise => 
      exercise.grade === gradeMap[grade || '1'] && 
      exercise.subject === subjectMap[subject || 'portuguese']
    )
  );
  
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const exerciseId = parseInt(id || '1', 10);
    const index = filteredExercises.findIndex(exercise => exercise.id === exerciseId);
    setCurrentExerciseIndex(index >= 0 ? index : 0);
  }, [id, filteredExercises]);

  useEffect(() => {
    // Load completed exercises from localStorage
    const savedCompletedExercises = localStorage.getItem('completedSchoolExercises');
    if (savedCompletedExercises) {
      setCompletedExercises(JSON.parse(savedCompletedExercises));
    }
  }, []);

  const handleExerciseComplete = () => {
    if (filteredExercises.length === 0) return;
    
    const currentExerciseId = filteredExercises[currentExerciseIndex].id;
    if (!completedExercises.includes(currentExerciseId)) {
      const updatedCompleted = [...completedExercises, currentExerciseId];
      setCompletedExercises(updatedCompleted);
      localStorage.setItem('completedSchoolExercises', JSON.stringify(updatedCompleted));
      
      // Increment streak and celebrate
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      
      if (newStreak % 3 === 0) {
        setShowCelebration(true);
        createConfetti();
        setTimeout(() => setShowCelebration(false), 3000);
      }
    }

    handleNextExercise();
  };

  // Simple confetti effect without external dependencies
  const createConfetti = () => {
    const celebrationContainer = document.createElement('div');
    celebrationContainer.style.position = 'fixed';
    celebrationContainer.style.top = '0';
    celebrationContainer.style.left = '0';
    celebrationContainer.style.width = '100%';
    celebrationContainer.style.height = '100%';
    celebrationContainer.style.pointerEvents = 'none';
    celebrationContainer.style.zIndex = '9999';
    document.body.appendChild(celebrationContainer);

    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A8', '#FFFF33'];
    
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'absolute';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.borderRadius = '50%';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = -20 + 'px';
      confetti.style.opacity = '1';
      confetti.style.transform = 'translateY(0)';
      confetti.style.transition = 'transform 1s ease-out, opacity 1s ease-out';
      celebrationContainer.appendChild(confetti);
      
      setTimeout(() => {
        confetti.style.transform = `translateY(${Math.random() * 100 + 500}px) rotate(${Math.random() * 360}deg)`;
        confetti.style.opacity = '0';
      }, 10);
      
      setTimeout(() => {
        confetti.remove();
      }, 2000);
    }

    setTimeout(() => {
      celebrationContainer.remove();
    }, 3000);
  };

  // Function to navigate to the next exercise
  const handleNextExercise = () => {
    const nextIndex = currentExerciseIndex + 1;
    if (nextIndex < filteredExercises.length) {
      navigate(`/school-exercises/${grade}/${subject}/${filteredExercises[nextIndex].id}`);
    } else {
      // If we're at the last exercise, we could either loop back to the first or stay at the last
      navigate('/result', { state: { source: 'school-exercises' } });
    }
  };

  // Function to navigate to the previous exercise
  const handlePreviousExercise = () => {
    const prevIndex = currentExerciseIndex - 1;
    if (prevIndex >= 0) {
      navigate(`/school-exercises/${grade}/${subject}/${filteredExercises[prevIndex].id}`);
    }
  };

  // Get subject name in Portuguese
  const getSubjectName = () => {
    return subjectMap[subject || 'portuguese'];
  };

  const getGradeName = () => {
    return gradeMap[grade || '1'];
  };

  if (filteredExercises.length === 0) {
    return (
      <div className="school-exercises-page">
        <div className="subject-header">
          <h2>Exercícios de {getSubjectName()} - {getGradeName()}</h2>
          <button 
            className="back-button"
            onClick={() => navigate(`/school-exercises/${grade}`)}
          >
            ← Voltar para Disciplinas
          </button>
        </div>
        <div className="no-exercises-container">
          <div className="no-exercises-icon">📚</div>
          <p className="no-exercises-message">
            Não existem exercícios disponíveis para esta disciplina e ano.
          </p>
          <p className="no-exercises-submessage">
            Estamos a trabalhar para adicionar mais conteúdo em breve!
          </p>
        </div>
      </div>
    );
  }

  const currentExercise = filteredExercises[currentExerciseIndex];
  const isFirstExercise = currentExerciseIndex === 0;
  const isLastExercise = currentExerciseIndex === filteredExercises.length - 1;
  const completedCount = completedExercises.filter(id => 
    filteredExercises.some(e => e.id === id)).length;
  const progressPercentage = (completedCount / filteredExercises.length) * 100;

  return (
    <div className="school-exercises-page">
      <div className="subject-header">
        <h2>Exercícios de {getSubjectName()} - {getGradeName()}</h2>
        <button 
          className="back-button"
          onClick={() => navigate(`/school-exercises/${grade}`)}
        >
          ← Voltar para Disciplinas
        </button>
      </div>
      
      <div className="exercises-progress">
        <div className="progress-info">
          <span>Exercício {currentExerciseIndex + 1} de {filteredExercises.length}</span>
          <span className="completed-count">{completedCount} concluídos</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      {currentExercise && (
        <SchoolExerciseCard 
          exercise={currentExercise} 
          onComplete={handleExerciseComplete}
          onPrevious={handlePreviousExercise}
          onNext={handleNextExercise}
          isFirstExercise={isFirstExercise}
          isLastExercise={isLastExercise}
        />
      )}
      
      {showCelebration && (
        <div className="celebration-overlay">
          <div className="celebration-content">
            <h3>🎉 Parabéns! 🎉</h3>
            <p>Completaste {currentStreak} exercícios seguidos!</p>
            <p>Continua o bom trabalho!</p>
          </div>
        </div>
      )}
    </div>
  );
}
