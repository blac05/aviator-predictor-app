import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import GameBoard from './components/GameBoard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [passkey, setPasskey] = useState('');
  const [company, setCompany] = useState('company1');
  const [currentGame, setCurrentGame] = useState(null);
  const [gameStatus, setGameStatus] = useState('idle');

  const handleAccess = async () => {
    try {
      const res = await fetch('/api/auth/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passkey })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert('Error accessing app');
    }
  };

  if (!token) {
    return (
      <div className="access-container">
        <h1>✈️ Aviator Predictor</h1>
        <input
          type="password"
          placeholder="Enter Passkey"
          value={passkey}
          onChange={(e) => setPasskey(e.target.value)}
        />
        <button onClick={handleAccess}>Access</button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>✈️ Aviator Predictor</h1>
        <select value={company} onChange={(e) => setCompany(e.target.value)}>
          <option value="company1">Company 1</option>
          <option value="company2">Company 2</option>
          <option value="company3">Company 3</option>
        </select>
        <button onClick={() => { localStorage.removeItem('token'); setToken(null); }}>Logout</button>
      </header>
      
      <main className="app-main">
        <section className="game-section">
          <GameBoard currentGame={currentGame} gameStatus={gameStatus} company={company} />
        </section>
        
        <section className="dashboard-section">
          <Dashboard company={company} />
        </section>
      </main>
    </div>
  );
}

export default App;
