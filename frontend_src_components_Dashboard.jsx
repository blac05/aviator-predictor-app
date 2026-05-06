import React, { useEffect, useState } from 'react';
import './Dashboard.css';

function Dashboard({ user }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (user) fetchStats();
  }, [user]);

  const fetchStats = async () => {
    try {
      const response = await fetch(`/api/users/${user._id}/stats`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  if (!stats) return <div className="dashboard">Loading...</div>;

  return (
    <div className="dashboard">
      <h2>📊 Statistics</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Balance</h3>
          <p className="stat-value">${stats.balance?.toFixed(2) || 0}</p>
        </div>
        
        <div className="stat-card">
          <h3>Total Bets</h3>
          <p className="stat-value">{stats.totalBets || 0}</p>
        </div>
        
        <div className="stat-card">
          <h3>Total Winnings</h3>
          <p className="stat-value" style={{ color: stats.totalWinnings > 0 ? 'green' : 'red' }}>
            ${stats.totalWinnings?.toFixed(2) || 0}
          </p>
        </div>
        
        <div className="stat-card">
          <h3>Win Rate</h3>
          <p className="stat-value">{(stats.winRate || 0).toFixed(1)}%</p>
        </div>
      </div>

      <div className="performance-chart">
        <h3>Recent Performance</h3>
        <div className="chart-placeholder">
          <p>📈 Chart visualization coming soon...</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;