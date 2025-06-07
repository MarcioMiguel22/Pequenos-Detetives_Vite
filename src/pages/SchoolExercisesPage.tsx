import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { schoolExercises } from '../data/school-exercises';
import SchoolExerciseCard from '../components/SchoolExerciseCard';
import '../styles/SchoolExercisesPage.css';

export default function SchoolExercisesPage() {
  const { subject, id } = useParams<{ subject: string; id: string }>();
  const navigate = useNavigate();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [filteredExercises] = useState(
    schoolExercises.filter(exercise => exercise.subject.toLowerCase() === subject)
  );
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);

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
    }

    // Move to next exercise
    const nextIndex = currentExerciseIndex + 1;
    if (nextIndex < filteredExercises.length) {
      navigate(`/school-exercises/${subject}/${filteredExercises[nextIndex].id}`);
    } else {
      // If all exercises are completed, redirect to results page
      navigate('/result', { state: { source: 'school-exercises' } });
    }
  };

  // Get subject name in Portuguese
  const getSubjectName = () => {
    switch (subject) {
      case 'portuguese': return 'Português';
      case 'math': return 'Matemática';
      case 'english': return 'Inglês';
      case 'environment': return 'Estudo do Meio';
      default: return 'Disciplina';
    }
  };

  if (filteredExercises.length === 0) {
    return (
      <div className="school-exercises-page">
        <div className="subject-header">
          <h2>Exercícios de {getSubjectName()}</h2>
          <button 
            className="back-button"
            onClick={() => navigate('/school-exercises')}
          >
            ← Voltar para Disciplinas
          </button>
        </div>
        <p className="no-exercises-message">
          Não existem exercícios disponíveis para esta disciplina.
        </p>
      </div>
    );
  }

  const currentExercise = filteredExercises[currentExerciseIndex];

  return (
    <div className="school-exercises-page">
      <div className="subject-header">
        <h2>Exercícios de {getSubjectName()}</h2>
        <button 
          className="back-button"
          onClick={() => navigate('/school-exercises')}
        >
          ← Voltar para Disciplinas
        </button>
      </div>
      
      <div className="exercises-progress">
        <span>Exercício {currentExerciseIndex + 1} de {filteredExercises.length}</span>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(completedExercises.filter(id => 
              filteredExercises.some(e => e.id === id)).length / filteredExercises.length) * 100}%` 
            }}
          ></div>
        </div>
      </div>
      
      {currentExercise && (
        <SchoolExerciseCard 
          exercise={currentExercise} 
          onComplete={handleExerciseComplete} 
        />
      )}
    </div>
  );
}
