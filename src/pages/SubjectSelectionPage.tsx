import { Link, useParams, useNavigate } from 'react-router-dom';
import '../styles/SubjectSelectionPage.css';

export default function SubjectSelectionPage() {
  const { grade } = useParams<{ grade: string }>();
  const navigate = useNavigate();

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

  if (grade && ['2', '3', '4'].includes(grade)) {
    return (
      <div className="subject-selection-page construction-page">
        <h1>Exercícios para {gradeNames[grade]}</h1>
        <div className="construction-message">
          <div className="construction-icon">🚧</div>
          <h2>Em Construção</h2>
          <p>Os exercícios para o {gradeNames[grade]} estão a ser preparados com muito carinho!</p>
          <p>Volta em breve para ver as novidades.</p>
          <button 
            className="back-button"
            onClick={() => navigate('/school-exercises')}
          >
            ← Voltar para Seleção de Ano
          </button>
        </div>
      </div>
    );
  }

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
      
      <button 
        className="back-button"
        onClick={() => navigate('/school-exercises')}
      >
        ← Voltar para Seleção de Ano
      </button>
    </div>
  );
}
