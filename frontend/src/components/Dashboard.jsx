import React, { useEffect, useState } from 'react';
import './Dashboard.css';

function Dashboard({ company }) {
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    fetchPrediction();
  }, [company]);

  const fetchPrediction = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/predictions/next?company=${company}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setPrediction(data);
    } catch (error) {
      console.error('Error fetching prediction:', error);
    }
  };

  if (!prediction) return <div className="dashboard">Loading prediction...</div>;

  return (
    <div className="dashboard">
      <h2>🔮 Prediction for {company}</h2>
      
      <div className="prediction-card">
        <h3>Next Crash Prediction</h3>
        <p className="prediction-value">{prediction.prediction?.toFixed(2)}x</p>
        <p className="confidence">Confidence: {prediction.confidence?.toFixed(1)}%</p>
      </div>
    </div>
  );
}

export default Dashboard;

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
