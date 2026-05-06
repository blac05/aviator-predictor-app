const express = require('express');
const PredictionService = require('../services/PredictionService');
const Game = require('../models/Game');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Apply auth to all routes
router.use(authMiddleware);

// Get prediction for upcoming game
router.get('/next', async (req, res) => {
  try {
    const { company } = req.query;
    if (!company) {
      return res.status(400).json({ error: 'Company required' });
    }

    const recentGames = await Game.find({ company }).sort({ createdAt: -1 }).limit(50);
    const historicalData = recentGames.map(g => ({ crashPoint: g.crashPoint }));
    
    const prediction = await PredictionService.predictCrash(historicalData);
    res.json({ ...prediction, company });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
