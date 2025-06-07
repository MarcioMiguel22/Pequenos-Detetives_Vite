import { Link } from 'react-router-dom';
import '../styles/SubjectSelectionPage.css';

export default function SubjectSelectionPage() {
  const subjects = [
    { id: 'portuguese', name: 'Português', icon: '📚', color: '#FF5733' },
    { id: 'math', name: 'Matemática', icon: '🔢', color: '#33FF57' },
    { id: 'english', name: 'Inglês', icon: '🌎', color: '#3357FF' },
    { id: 'environment', name: 'Estudo do Meio', icon: '🌿', color: '#FF33A8' },
  ];

  return (
    <div className="subject-selection-page">
      <h1>Escolhe uma Disciplina</h1>
      <p className="intro-text">Seleciona a disciplina que queres praticar:</p>
      
      <div className="subjects-grid">
        {subjects.map(subject => (
          <Link 
            key={subject.id} 
            to={`/school-exercises/${subject.id}/1`} 
            className="subject-card"
            style={{ backgroundColor: subject.color }}
          >
            <div className="subject-icon">{subject.icon}</div>
            <h2 className="subject-name">{subject.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
