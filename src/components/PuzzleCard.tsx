import { useState, useEffect } from 'react';
import { Puzzle } from '../types/puzzle';
import '../styles/PuzzleCard.css';

// Definir a interface para o window com webkitAudioContext
interface WindowWithWebkitAudio extends Window {
  webkitAudioContext: typeof AudioContext;
}

interface PuzzleCardProps {
  puzzle: Puzzle;
  onCorrectAnswer: () => void;
  isRetry?: boolean;
}

export default function PuzzleCard({ puzzle, onCorrectAnswer, isRetry = false }: PuzzleCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  // Reset component state when the puzzle changes
  useEffect(() => {
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrectAnswer(false);
    setShowHint(false);
  }, [puzzle.id]);

  const handleAnswerSelect = (answerId: number) => {
    // Just in case we're in a retry or already answered state, reset any result states
    if (showResult || isCorrectAnswer) {
      setShowResult(false);
      setIsCorrectAnswer(false);
    }
    setSelectedAnswer(answerId);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const isCorrect = puzzle.answers.find(a => a.id === selectedAnswer)?.isCorrect;

    if (isCorrect) {
      setIsCorrectAnswer(true);
      setShowResult(true);
      // Tocar som de resposta correta (plin!)
      playCorrectSound();
      
      // If this is a retry, we can provide a different success message or behavior
      if (isRetry) {
        // We can play a different sound or show a different animation for retried puzzles
        console.log("This is a retry success!");
      }
    } else {
      setShowResult(true);
      // Tocar um som suave de resposta errada
      playGentleWrongSound();

      // Removendo o timeout automático - agora o usuário precisará clicar em "Tentar Novamente"
    }
  };

  const handleTryAgain = () => {
    setShowResult(false);
    setSelectedAnswer(null);
  };

  const handleNextPuzzle = () => {
    onCorrectAnswer();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'fácil': return 'green';
      case 'médio': return 'orange';
      case 'difícil': return 'red';
      default: return 'gray';
    }
  };

  // Função para tocar um som delicado para respostas erradas
  const playGentleWrongSound = () => {
    try {
      // Criar um oscilador (sintetizador de som) usando a Web Audio API
      const audioContext = new (window.AudioContext || 
        ((window as unknown) as WindowWithWebkitAudio).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      // Configurar o tipo de onda e frequência (som suave)
      oscillator.type = 'sine'; // Onda sinusoidal (mais suave)
      oscillator.frequency.setValueAtTime(320, audioContext.currentTime); // Frequência baixa

      // Diminuir o volume para ser delicado
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Volume baixo

      // Configurar a queda suave do som
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1.5);

      // Ligar o oscilador ao controlo de volume e depois aos altifalantes
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Iniciar e parar o som após um curto período
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
        audioContext.close();
      }, 1500);
    } catch (error) {
      console.log('Erro ao reproduzir o som de resposta errada:', error);
    }
  };

  // Função para tocar o som "plin" para respostas corretas
  const playCorrectSound = () => {
    try {
      // Criar um oscilador usando a Web Audio API
      const audioContext = new (window.AudioContext || 
        ((window as unknown) as WindowWithWebkitAudio).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      // Configurar o tipo de onda e frequência para um som agudo e agradável
      oscillator.type = 'sine'; // Onda sinusoidal para um som mais "limpo"
      oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // Lá agudo (A5)
      
      // Configurar um breve "ataque" e "decaimento" rápido para som de "plin"
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);

      // Ligar o oscilador ao controlo de volume e depois aos altifalantes
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Iniciar e parar o som após um curto período
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
        audioContext.close();
      }, 500);
    } catch (error) {
      console.log('Erro ao reproduzir o som de resposta correta:', error);
    }
  };

  // Function to read text using the Web Speech API
  const readText = () => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = puzzle.question;
      speech.lang = 'pt-PT'; // Português de Portugal
      speech.rate = 0.9; // ligeiramente mais lento para crianças
      speech.pitch = 1.1; // tom ligeiramente mais alto

      speech.onstart = () => setIsPlaying(true);
      speech.onend = () => setIsPlaying(false);

      // Ler as respostas também
      const allText = `${puzzle.question}. As opções são: ${puzzle.answers.map(a => a.text).join(', ')}`;
      speech.text = allText;

      window.speechSynthesis.cancel(); // Cancelar qualquer discurso em andamento
      window.speechSynthesis.speak(speech);
    }
  };

  return (
    <div className="puzzle-card">
      <div className="puzzle-header">
        <h2>{puzzle.title}</h2>
        <span 
          className="difficulty-badge" 
          style={{ backgroundColor: getDifficultyColor(puzzle.difficulty) }}
        >
          {puzzle.difficulty}
        </span>
      </div>

      <div className="question-container">
        <p className="puzzle-question">{puzzle.question}</p>
        <button 
          className={`audio-button ${isPlaying ? 'playing' : ''}`} 
          onClick={readText}
          aria-label={isPlaying ? "Parar leitura" : "Ouvir pergunta"}
        >
          {isPlaying ? '🔊' : '🔈'}
        </button>
      </div>

      {puzzle.image && (
        <div className="puzzle-image">
          {puzzle.image.startsWith('emoji:') ? (
            <div className="emoji-display">
              <span className="puzzle-emoji">{puzzle.image.replace('emoji:', '')}</span>
            </div>
          ) : (
            <div className="emoji-display">
              <span className="puzzle-emoji">🧩</span> {/* Default puzzle emoji */}
            </div>
          )}
        </div>
      )}

      <div className="puzzle-answers">
        {puzzle.answers.map(answer => (
          <div 
            key={answer.id}
            className={`answer-option 
              ${selectedAnswer === answer.id ? 'selected' : ''} 
              ${showResult && selectedAnswer === answer.id && answer.isCorrect ? 'correct' : ''} 
              ${showResult && selectedAnswer === answer.id && !answer.isCorrect ? 'incorrect' : ''}`}
            onClick={() => handleAnswerSelect(answer.id)}
          >
            <span className="answer-text">{answer.text}</span>
            <button 
              className="answer-audio-button"
              onClick={(e) => {
                e.stopPropagation();
                if ('speechSynthesis' in window) {
                  const speech = new SpeechSynthesisUtterance(answer.text);
                  speech.lang = 'pt-PT';
                  speech.rate = 0.9;
                  window.speechSynthesis.speak(speech);
                }
              }}
              aria-label={`Ouvir opção: ${answer.text}`}
            >
              🔈
            </button>
          </div>
        ))}
      </div>

      {puzzle.hint && (
        <div className="hint-section">
          <button 
            className="hint-button" 
            onClick={() => setShowHint(!showHint)}
          >
            {showHint ? 'Esconder Dica' : 'Mostrar Dica'}
          </button>
          {showHint && (
            <div className="hint-text-container">
              <p className="hint-text">💡 {puzzle.hint}</p>
              <button 
                className="hint-audio-button"
                onClick={() => {
                  if ('speechSynthesis' in window && puzzle.hint) {
                    const speech = new SpeechSynthesisUtterance(puzzle.hint);
                    speech.lang = 'pt-PT'; // Changed from pt-BR to pt-PT
                    speech.rate = 0.9;
                    window.speechSynthesis.speak(speech);
                  }
                }}
                aria-label="Ouvir dica"
              >
                🔈
              </button>
            </div>
          )}
        </div>
      )}

      <div className="action-buttons">
        {!isCorrectAnswer && !showResult && (
          <button 
            className="submit-button" 
            disabled={selectedAnswer === null}
            onClick={handleSubmit}
          >
            Verificar Resposta
          </button>
        )}

        {showResult && !isCorrectAnswer && (
          <button 
            className="try-again-button"
            onClick={handleTryAgain}
          >
            Tentar Outra Vez
          </button>
        )}

        {isCorrectAnswer && (
          <button 
            className="next-button"
            onClick={handleNextPuzzle}
          >
            Próximo Enigma →
          </button>
        )}
        
        {/* Botão para avançar para o próximo enigma */}
        {!isCorrectAnswer && (
          <button 
            className="skip-button"
            onClick={handleNextPuzzle}
          >
            Avançar Enigma →
          </button>
        )}
      </div>

      {showResult && (
        <div className={`result-message ${isCorrectAnswer ? 'success' : 'error'}`}>
          {isCorrectAnswer 
            ? isRetry 
              ? '🎉 Muito bem! Conseguiste resolver novamente!' 
              : '🎉 Parabéns! Acertaste!' 
            : '😢 Tenta outra vez!'}
        </div>
      )}
    </div>
  );
}
