import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { schoolExercises } from '../data/school-exercises';
import SchoolExerciseCard from '../components/SchoolExerciseCard';
import '../styles/SchoolExercisesPage.css';

export default function SchoolExercisesPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [filteredExercises] = useState(schoolExercises);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);

  useEffect(() => {
    const exerciseId = parseInt(id || '1', 10);
    const index = schoolExercises.findIndex(exercise => exercise.id === exerciseId);
    setCurrentExerciseIndex(index >= 0 ? index : 0);
  }, [id]);

  useEffect(() => {
    // Load completed exercises from localStorage
    const savedCompletedExercises = localStorage.getItem('completedSchoolExercises');
    if (savedCompletedExercises) {
      setCompletedExercises(JSON.parse(savedCompletedExercises));
    }
  }, []);

  const handleExerciseComplete = () => {
    const currentExerciseId = filteredExercises[currentExerciseIndex].id;
    if (!completedExercises.includes(currentExerciseId)) {
      const updatedCompleted = [...completedExercises, currentExerciseId];
      setCompletedExercises(updatedCompleted);
      localStorage.setItem('completedSchoolExercises', JSON.stringify(updatedCompleted));
    }

    // Move to next exercise
    const nextIndex = currentExerciseIndex + 1;
    if (nextIndex < filteredExercises.length) {
      navigate(`/school-exercises/${filteredExercises[nextIndex].id}`);
    } else {
      // If all exercises are completed, redirect to results page
      navigate('/result', { state: { source: 'school-exercises' } });
    }
  };

  if (filteredExercises.length === 0) {
    return (
      <div className="school-exercises-page">
        <h2>Exercícios Escolares</h2>
        <p className="no-exercises-message">
          Não existem exercícios disponíveis.
        </p>
      </div>
    );
  }

  const currentExercise = filteredExercises[currentExerciseIndex];

  return (
    <div className="school-exercises-page">
      <h2>Exercícios Escolares</h2>
      
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
