import React, { useState, useEffect } from 'react';
import './GameBoard.css';

function GameBoard({ currentGame, gameStatus }) {
  const [multiplier, setMultiplier] = useState(1.0);

  useEffect(() => {
    if (gameStatus === 'running') {
      const interval = setInterval(() => {
        setMultiplier(prev => parseFloat((prev + 0.01).toFixed(2)));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [gameStatus]);

  return (
    <div className="game-board">
      <div className="game-header">
        <h2>Active Game</h2>
        <span className={`status ${gameStatus}`}>{gameStatus.toUpperCase()}</span>
      </div>
      
      <div className="crash-display">
        <div className="multiplier-big">{multiplier}x</div>
        {currentGame?.predictedCrash && (
          <div className="prediction-info">
            <p>📊 Predicted: {currentGame.predictedCrash}x</p>
            <p>🎯 Confidence: {(currentGame.confidence * 100).toFixed(0)}%</p>
          </div>
        )}
      </div>

      <div className="game-chart">
        <svg width="100%" height="300">
          <line x1="0" y1="300" x2={multiplier * 50} y2={Math.max(10, 300 - multiplier * 30)} stroke="blue" strokeWidth="2" />
          <circle cx={multiplier * 50} cy={Math.max(10, 300 - multiplier * 30)} r="5" fill="blue" />
        </svg>
      </div>

      <div className="game-stats">
        <div className="stat">
          <span>💰 Total Bets:</span>
          <strong>${currentGame?.totalBets || 0}</strong>
        </div>
        <div className="stat">
          <span>🎰 Players:</span>
          <strong>Loading...</strong>
        </div>
      </div>
    </div>
  );
}

export default GameBoard;
