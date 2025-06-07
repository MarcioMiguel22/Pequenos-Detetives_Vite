import { Link } from 'react-router-dom';
import '../styles/GradeSelectionPage.css';

export default function GradeSelectionPage() {
  const grades = [
    { id: '1', name: '1º Ano', icon: '1️⃣', color: '#FF9933' },
    { id: '2', name: '2º Ano', icon: '2️⃣', color: '#33CC66' },
    { id: '3', name: '3º Ano', icon: '3️⃣', color: '#3399FF' },
    { id: '4', name: '4º Ano', icon: '4️⃣', color: '#CC66FF' },
  ];

  return (
    <div className="grade-selection-page">
      <h1>Escolhe o teu Ano</h1>
      <p className="intro-text">Seleciona o ano de escolaridade para ver os exercícios:</p>
      
      <div className="grades-grid">
        {grades.map(grade => (
          <Link 
            key={grade.id} 
            to={`/school-exercises/${grade.id}`} 
            className="grade-card"
            style={{ backgroundColor: grade.color }}
          >
            <div className="grade-icon">{grade.icon}</div>
            <h2 className="grade-name">{grade.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
