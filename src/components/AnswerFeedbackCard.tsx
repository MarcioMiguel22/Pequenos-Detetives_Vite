import { useEffect, useState, useCallback } from 'react';
import '../styles/AnswerFeedbackCard.css';
import { AnswerFeedbackCardProps } from '../types/componentProps';

export default function AnswerFeedbackCard({ isCorrect, onClose, message }: AnswerFeedbackCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  // Use useCallback to memoize the handleClose function
  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300); // Wait for exit animation
  }, [onClose]);
  
  useEffect(() => {
    // Trigger the entrance animation after component is mounted
    setTimeout(() => setIsVisible(true), 10);
    
    // Auto-close after 3 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [handleClose]); // Now properly including handleClose in the dependency array
  
  return (
    <div className={`answer-feedback-overlay ${isVisible ? 'visible' : ''}`} onClick={handleClose}>
      <div 
        className={`answer-feedback-card ${isVisible ? 'visible' : ''} ${isCorrect ? 'correct' : 'incorrect'}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the card itself
      >
        <div className="feedback-icon">
          {isCorrect ? '✅' : '❌'}
        </div>
        <h2>{isCorrect ? 'Correto!' : 'Incorreto!'}</h2>
        <p className="feedback-details">
          {message || (isCorrect 
            ? 'Muito bem! A tua resposta está certa.' 
            : 'Tenta novamente, tu consegues!')}
        </p>
        <button className="feedback-close-btn" onClick={handleClose}>
          Continuar
        </button>
      </div>
    </div>
  );
}
