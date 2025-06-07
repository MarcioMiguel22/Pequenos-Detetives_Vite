import { Link } from 'react-router-dom';
import '../styles/GradeSelectionPage.css';

export default function GradeSelectionPage() {
  const grades = [
    { id: '1', name: '1º Ano', icon: '1️⃣', color: '#FF9933', status: 'available' },
    { id: '2', name: '2º Ano', icon: '2️⃣', color: '#33CC66', status: 'coming-soon' },
    { id: '3', name: '3º Ano', icon: '3️⃣', color: '#3399FF', status: 'coming-soon' },
    { id: '4', name: '4º Ano', icon: '4️⃣', color: '#CC66FF', status: 'coming-soon' },
  ];

  return (
    <div className="grade-selection-page">
      <h1>Escolhe o teu Ano</h1>
      <p className="intro-text">Seleciona o ano de escolaridade para ver os exercícios:</p>
      
      <div className="grades-grid">
        {grades.map(grade => (
          <div key={grade.id} className="grade-card-container">
            {grade.status === 'available' ? (
              <Link 
                to={`/school-exercises/${grade.id}`} 
                className="grade-card"
                style={{ backgroundColor: grade.color }}
              >
                <div className="grade-icon">{grade.icon}</div>
                <h2 className="grade-name">{grade.name}</h2>
              </Link>
            ) : (
              <div 
                className="grade-card coming-soon"
                style={{ backgroundColor: grade.color }}
              >
                <div className="grade-icon">{grade.icon}</div>
                <h2 className="grade-name">{grade.name}</h2>
                <div className="coming-soon-overlay">
                  <span>Em breve!</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
