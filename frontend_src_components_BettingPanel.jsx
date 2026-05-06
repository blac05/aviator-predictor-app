import React, { useState } from 'react';
import './BettingPanel.css';

function BettingPanel({ user, currentGame, setGameStatus }) {
  const [betAmount, setBetAmount] = useState(10);
  const [autoMultiplier, setAutoMultiplier] = useState(1.5);
  const [isBetActive, setIsBetActive] = useState(false);

  const handlePlaceBet = async () => {
    if (!user || betAmount > user.balance) {
      alert('Insufficient balance!');
      return;
    }
    
    try {
      const response = await fetch('/api/bets/place', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id,
          gameId: currentGame?.gameId,
          amount: betAmount
        })
      });
      
      const bet = await response.json();
      setIsBetActive(true);
      setGameStatus('running');
    } catch (error) {
      alert('Error placing bet: ' + error.message);
    }
  };

  const handleCashout = async (multiplier) => {
    try {
      const response = await fetch('/api/bets/cashout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          betId: 'current_bet_id',
          currentMultiplier: multiplier
        })
      });
      
      const result = await response.json();
      setIsBetActive(false);
      alert(`💰 Cashed out! Won: $${result.bet.winnings}`);
    } catch (error) {
      alert('Error cashing out: ' + error.message);
    }
  };

  return (
    <div className="betting-panel">
      <h2>🎯 Place Your Bet</h2>
      
      <div className="bet-input-group">
        <label>Bet Amount ($)</label>
        <input 
          type="number" 
          value={betAmount} 
          onChange={(e) => setBetAmount(parseFloat(e.target.value))}
          min="1"
          max={user?.balance || 0}
          disabled={isBetActive}
        />
      </div>

      <div className="bet-input-group">
        <label>Auto Cashout Multiplier</label>
        <input 
          type="number" 
          value={autoMultiplier} 
          onChange={(e) => setAutoMultiplier(parseFloat(e.target.value))}
          step="0.1"
          disabled={isBetActive}
        />
      </div>

      <div className="balance-info">
        <p>💵 Balance: ${user?.balance || 0}</p>
        {isBetActive && <p className="active-bet">🟢 Active Bet: ${betAmount}</p>}
      </div>

      <div className="betting-buttons">
        {!isBetActive ? (
          <button className="btn-place-bet" onClick={handlePlaceBet}>
            Place Bet
          </button>
        ) : (
          <>
            <button className="btn-cashout" onClick={() => handleCashout(autoMultiplier)}>
              🚀 Cashout @ {autoMultiplier}x
            </button>
            <button className="btn-cancel" onClick={() => setIsBetActive(false)}>
              Cancel Bet
            </button>
          </>
        )}
      </div>

      <div className="bet-history">
        <h3>Recent Bets</h3>
        <div className="history-list">
          <div className="history-item">
            <span>Game #001</span>
            <span className="won">+$45.50</span>
          </div>
          <div className="history-item">
            <span>Game #000</span>
            <span className="lost">-$20.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BettingPanel;