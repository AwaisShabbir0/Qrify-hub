import { useState, useEffect } from 'react';
import QRGenerator from './components/QRGenerator';
import QRScanner from './components/QRScanner';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('generate');
  // Initialize theme from localStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('qrify-theme') || 'light';
  });

  useEffect(() => {
    // Apply theme to document body
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('qrify-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <h1>QRify Hub</h1>
          <p>Generate & Scan</p>
        </div>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle Dark Mode"
          title={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
          {theme === 'light' ? (
            // Moon Icon
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          ) : (
            // Sun Icon
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"></path>
            </svg>
          )}
        </button>
      </header>

      <div className="card">
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === 'generate' ? 'active' : ''}`}
            onClick={() => setActiveTab('generate')}
          >
            Generate
          </button>
          <button
            className={`tab-btn ${activeTab === 'scan' ? 'active' : ''}`}
            onClick={() => setActiveTab('scan')}
          >
            Scan
          </button>
        </div>

        <main>
          {activeTab === 'generate' ? (
            <QRGenerator />
          ) : (
            <QRScanner />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
