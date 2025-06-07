import { Link, useParams } from 'react-router-dom';
import '../styles/SubjectSelectionPage.css';

export default function SubjectSelectionPage() {
  const { grade } = useParams<{ grade: string }>();

  const subjects = [
    { id: 'portuguese', name: 'Português', icon: '📚', color: '#FF5733' },
    { id: 'math', name: 'Matemática', icon: '🔢', color: '#33FF57' },
    { id: 'english', name: 'Inglês', icon: '🌎', color: '#3357FF' },
    { id: 'environment', name: 'Estudo do Meio', icon: '🌿', color: '#FF33A8' },
  ];

  const gradeNames: Record<string, string> = {
    '1': '1º Ano',
    '2': '2º Ano',
    '3': '3º Ano',
    '4': '4º Ano',
  };

  return (
    <div className="subject-selection-page">
      <h1>Exercícios para {gradeNames[grade || '1']}</h1>
      <p className="intro-text">Seleciona a disciplina que queres praticar:</p>
      
      <div className="subjects-grid">
        {subjects.map(subject => (
          <Link 
            key={subject.id} 
            to={`/school-exercises/${grade}/${subject.id}/1`} 
            className="subject-card"
            style={{ backgroundColor: subject.color }}
          >
            <div className="subject-icon">{subject.icon}</div>
            <h2 className="subject-name">{subject.name}</h2>
          </Link>
        ))}
      </div>
      
      <Link to="/school-exercises" className="back-button">
        ← Voltar para Seleção de Ano
      </Link>
    </div>
  );
}
