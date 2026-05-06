class PredictionService {
  // Analyzes historical data to predict crash point
  static async predictCrash(historicalData = []) {
    try {
      if (historicalData.length === 0) {
        return { prediction: this.generateRandomPrediction(), confidence: 0.3 };
      }

      // Calculate average crash point
      const avgCrash = historicalData.reduce((sum, game) => sum + game.crashPoint, 0) / historicalData.length;
      
      // Calculate standard deviation
      const variance = historicalData.reduce((sum, game) => sum + Math.pow(game.crashPoint - avgCrash, 2), 0) / historicalData.length;
      const stdDev = Math.sqrt(variance);

      // Generate prediction with confidence score
      const prediction = avgCrash + (Math.random() - 0.5) * stdDev;
      const confidence = Math.min(0.95, 0.5 + (historicalData.length / 100));

      return {
        prediction: parseFloat(prediction.toFixed(2)),
        confidence: parseFloat(confidence.toFixed(2)),
        avgCrash: parseFloat(avgCrash.toFixed(2)),
        stdDev: parseFloat(stdDev.toFixed(2))
      };
    } catch (error) {
      console.error('Prediction Error:', error);
      return { prediction: 1.5, confidence: 0.2 };
    }
  }

  // Generate random prediction for initial games
  static generateRandomPrediction() {
    return parseFloat((1.5 + Math.random() * 3.5).toFixed(2));
  }

  // Calculate potential winnings
  static calculateWinnings(betAmount, multiplier) {
    return parseFloat((betAmount * multiplier).toFixed(2));
  }

  // Simulate game crash
  static simulateGameCrash() {
    const crashes = [1.2, 1.5, 1.8, 2.1, 2.5, 3.0, 3.5, 4.2, 5.0];
    return crashes[Math.floor(Math.random() * crashes.length)];
  }
}

module.exports = PredictionService;
