import React, { useState, useEffect } from 'react';
import './GameBoard.css';

function GameBoard({ currentGame, gameStatus, company }) {
  const [multiplier, setMultiplier] = useState(1.0);
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchGames();
  }, [company]);

  useEffect(() => {
    if (gameStatus === 'running') {
      const interval = setInterval(() => {
        setMultiplier(prev => parseFloat((prev + 0.01).toFixed(2)));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [gameStatus]);

  const fetchGames = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/games?company=${company}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  const activeGame = games[0] || currentGame;

  return (
    <div className="game-board">
      <div className="game-header">
        <h2>Active Games for {company}</h2>
        <span className={`status ${gameStatus}`}>{gameStatus.toUpperCase()}</span>
      </div>
      
      {activeGame && (
        <div className="crash-display">
          <div className="multiplier-big">{multiplier}x</div>
          {activeGame.predictedCrash && (
            <div className="prediction-info">
              <p>📊 Predicted: {activeGame.predictedCrash}x</p>
              <p>🎯 Confidence: {(activeGame.confidence * 100).toFixed(0)}%</p>
            </div>
          )}
        </div>
      )}

      <div className="game-chart">
        <svg width="100%" height="300">
          <line x1="0" y1="300" x2={multiplier * 50} y2={Math.max(10, 300 - multiplier * 30)} stroke="blue" strokeWidth="2" />
          <circle cx={multiplier * 50} cy={Math.max(10, 300 - multiplier * 30)} r="5" fill="blue" />
        </svg>
      </div>

      <div className="game-stats">
        <div className="stat">
          <span>💰 Total Bets:</span>
          <strong>${activeGame?.totalBets || 0}</strong>
        </div>
        <div className="stat">
          <span>🎰 Games:</span>
          <strong>{games.length}</strong>
        </div>
      </div>
    </div>
  );
}

export default GameBoard;
  );
}

export default GameBoard;
