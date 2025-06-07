import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import '../styles/Header.css';

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [bounceIcon, setBounceIcon] = useState(false);
  
  useEffect(() => {
    // Set active link based on current path
    const path = window.location.pathname;
    if (path === '/') setActiveLink('home');
    else if (path.includes('/puzzles')) setActiveLink('puzzles');
    else if (path.includes('/detective')) setActiveLink('detective');
    else if (path.includes('/challenge-riddles')) setActiveLink('challenge-riddles');
  }, []);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    // Animate logo when menu opens
    setBounceIcon(true);
    setTimeout(() => setBounceIcon(false), 1000);
  };
  
  const handleNavClick = (linkName: string) => {
    setActiveLink(linkName);
    setMenuOpen(false);
  };
  
  return (
    <header className={`header ${theme}`}>
      <div className={`logo-container ${bounceIcon ? 'bounce' : ''}`}>
        <Link to="/" onClick={() => handleNavClick('home')}>
          <div className="logo-animation">
            <span className="detective-icon">🕵️‍♂️</span>
            <h1 className="logo-text">Pequenos Detetives</h1>
            <span className="detective-icon">🕵️‍♀️</span>
          </div>
        </Link>
      </div>
      
      <button 
        className={`menu-toggle ${menuOpen ? 'open' : ''}`} 
        onClick={toggleMenu}
        aria-label="Menu Principal"
      >
        <div className="menu-toggle-inner">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      
      <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
        <ul className="nav-links">
          <li className={`nav-item ${activeLink === 'home' ? 'active' : ''}`}>
            <Link 
              to="/" 
              className="nav-link home-link"
              onClick={() => handleNavClick('home')}
            >
              <span className="nav-icon">🏠</span>
              <span className="nav-text">Início</span>
            </Link>
          </li>
          <li className={`nav-item ${activeLink === 'puzzles' ? 'active' : ''}`}>
            <Link 
              to="/puzzles" 
              className="nav-link puzzles-link"
              onClick={() => handleNavClick('puzzles')}
            >
              <span className="nav-icon puzzles-icon">❓</span>
              <span className="nav-text">Advinhas Simples</span>
            </Link>
          </li>
         
          <li className={`nav-item ${activeLink === 'challenge-riddles' ? 'active' : ''}`}>
            <Link 
              to="/challenge-riddles" 
              className="nav-link challenge-riddles-link"
              onClick={() => handleNavClick('challenge-riddles')}
            >
              <span className="nav-icon">🎯</span>
              <span className="nav-text">Advinhas Desafiantes</span>
            </Link>
          </li>
           <li className={`nav-item ${activeLink === 'detective' ? 'active' : ''}`}>
            <Link 
              to="/detective" 
              className="nav-link detective-link"
              onClick={() => handleNavClick('detective')}
            >
              <span className="nav-icon">🔍</span>
              <span className="nav-text">Enigmas de Detetive</span>
            </Link>
          </li>
          <li className="nav-item theme-toggle-item">
            <button 
              className="theme-toggle-button" 
              onClick={toggleTheme} 
              aria-label={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
            >
              <span className="theme-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
              <span className="nav-text">{theme === 'light' ? 'Modo Noturno' : 'Modo Dia'}</span>
            </button>
          </li>
        </ul>
      </nav>
      
      {menuOpen && <div className="nav-backdrop" onClick={() => setMenuOpen(false)}></div>}
    </header>
  );
}
