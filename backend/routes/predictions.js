const express = require('express');
const PredictionService = require('../services/PredictionService');
const Game = require('../models/Game');
const router = express.Router();

// Get prediction for upcoming game
router.get('/next', async (req, res) => {
  try {
    const recentGames = await Game.find().sort({ createdAt: -1 }).limit(50);
    const historicalData = recentGames.map(g => ({ crashPoint: g.crashPoint }));
    
    const prediction = await PredictionService.predictCrash(historicalData);
    res.json(prediction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
