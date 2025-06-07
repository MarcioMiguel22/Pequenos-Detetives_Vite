import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { schoolExercises } from '../data/school-exercises';
import { GradeLevel, Subject, SchoolExercise } from '../types/school-exercise';
import SchoolExerciseCard from '../components/SchoolExerciseCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/SchoolExercisesPage.css';

export default function SchoolExercisesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | 'todos'>('todos');
  const [selectedSubject, setSelectedSubject] = useState<Subject | 'todos'>('todos');
  const [filteredExercises, setFilteredExercises] = useState<SchoolExercise[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);

  // Parse URL query parameters on component mount and when location changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const grade = searchParams.get('grade');
    const subject = searchParams.get('subject');

    if (grade && (grade === '1º ano' || grade === '2º ano')) {
      setSelectedGrade(grade);
    }

    if (subject && ['Português', 'Matemática', 'Inglês', 'Estudo do Meio'].includes(subject)) {
      setSelectedSubject(subject as Subject);
    }
  }, [location]);

  // Update filtered exercises when filters change
  useEffect(() => {
    let filtered = [...schoolExercises];

    if (selectedGrade !== 'todos') {
      filtered = filtered.filter(ex => ex.grade === selectedGrade);
    }

    if (selectedSubject !== 'todos') {
      filtered = filtered.filter(ex => ex.subject === selectedSubject);
    }

    setFilteredExercises(filtered);
    setCurrentExerciseIndex(0);
  }, [selectedGrade, selectedSubject]);

  // Load completed exercises from localStorage
  useEffect(() => {
    const savedCompleted = localStorage.getItem('completedSchoolExercises');
    if (savedCompleted) {
      setCompletedExercises(JSON.parse(savedCompleted));
    }
  }, []);

  const handleGradeChange = (grade: GradeLevel | 'todos') => {
    setSelectedGrade(grade);
    updateURLParams(grade, selectedSubject);
  };

  const handleSubjectChange = (subject: Subject | 'todos') => {
    setSelectedSubject(subject);
    updateURLParams(selectedGrade, subject);
  };

  const updateURLParams = (grade: GradeLevel | 'todos', subject: Subject | 'todos') => {
    const params = new URLSearchParams();
    if (grade !== 'todos') params.set('grade', grade);
    if (subject !== 'todos') params.set('subject', subject);
    navigate({ search: params.toString() });
  };

  const handleExerciseComplete = () => {
    const currentExercise = filteredExercises[currentExerciseIndex];
    if (currentExercise && !completedExercises.includes(currentExercise.id)) {
      const updatedCompleted = [...completedExercises, currentExercise.id];
      setCompletedExercises(updatedCompleted);
      localStorage.setItem('completedSchoolExercises', JSON.stringify(updatedCompleted));
    }

    // Move to next exercise if available
    if (currentExerciseIndex < filteredExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      // Show completion message or redirect
      alert('Parabéns! Você completou todos os exercícios disponíveis!');
    }
  };

  const isCurrentExerciseCompleted = () => {
    return filteredExercises.length > 0 && 
           completedExercises.includes(filteredExercises[currentExerciseIndex].id);
  };

  return (
    <div className="school-exercises-page">
      <Header />
      
      <main className="exercises-content">
        <h1>Exercícios Escolares</h1>
        
        <div className="filters-container">
          <div className="filter-group">
            <label htmlFor="grade-filter">Ano Escolar:</label>
            <select 
              id="grade-filter"
              value={selectedGrade}
              onChange={(e) => handleGradeChange(e.target.value as GradeLevel | 'todos')}
            >
              <option value="todos">Todos</option>
              <option value="1º ano">1º Ano</option>
              <option value="2º ano">2º Ano</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="subject-filter">Disciplina:</label>
            <select 
              id="subject-filter"
              value={selectedSubject}
              onChange={(e) => handleSubjectChange(e.target.value as Subject | 'todos')}
            >
              <option value="todos">Todas</option>
              <option value="Português">Português</option>
              <option value="Matemática">Matemática</option>
              <option value="Inglês">Inglês</option>
              <option value="Estudo do Meio">Estudo do Meio</option>
            </select>
          </div>
        </div>
        
        {filteredExercises.length > 0 ? (
          <div className="exercise-container">
            <SchoolExerciseCard 
              exercise={filteredExercises[currentExerciseIndex]} 
              onComplete={handleExerciseComplete}
            />
            
            {isCurrentExerciseCompleted() && (
              <div className="completion-badge">
                ✓ Você já completou este exercício!
              </div>
            )}
            
            <div className="navigation-buttons">
              <button 
                disabled={currentExerciseIndex === 0}
                onClick={() => setCurrentExerciseIndex(currentExerciseIndex - 1)}
              >
                ← Exercício Anterior
              </button>
              <button 
                disabled={currentExerciseIndex >= filteredExercises.length - 1}
                onClick={() => setCurrentExerciseIndex(currentExerciseIndex + 1)}
              >
                Próximo Exercício →
              </button>
            </div>
          </div>
        ) : (
          <div className="no-exercises">
            <p>Nenhum exercício encontrado com os filtros selecionados.</p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
