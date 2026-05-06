import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import GameBoard from './components/GameBoard';
import BettingPanel from './components/BettingPanel';
import UserProfile from './components/UserProfile';

function App() {
  const [user, setUser] = useState(null);
  const [currentGame, setCurrentGame] = useState(null);
  const [gameStatus, setGameStatus] = useState('idle');

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login
      window.location.href = '/login';
    }
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>✈️ Aviator Predictor</h1>
        <UserProfile user={user} setUser={setUser} />
      </header>
      
      <main className="app-main">
        <section className="game-section">
          <GameBoard currentGame={currentGame} gameStatus={gameStatus} />
        </section>
        
        <section className="betting-section">
          <BettingPanel user={user} currentGame={currentGame} setGameStatus={setGameStatus} />
        </section>
        
        <section className="dashboard-section">
          <Dashboard user={user} />
        </section>
      </main>
    </div>
  );
}

export default App;
