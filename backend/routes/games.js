const express = require('express');
const Game = require('../models/Game');
const PredictionService = require('../services/PredictionService');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Apply auth to all routes
router.use(authMiddleware);

// Create new game
router.post('/create', async (req, res) => {
  try {
    const { company } = req.body;
    if (!company) {
      return res.status(400).json({ error: 'Company required' });
    }

    const gameId = `game_${company}_${Date.now()}`;
    const crashPoint = PredictionService.simulateGameCrash();

    const recentGames = await Game.find({ company }).sort({ createdAt: -1 }).limit(50);
    const historicalData = recentGames.map(g => ({ crashPoint: g.crashPoint }));
    const prediction = await PredictionService.predictCrash(historicalData);
    
    const game = new Game({
      gameId,
      company,
      crashPoint,
      predictedCrash: prediction.prediction,
      confidence: prediction.confidence
    });

    await game.save();
    res.status(201).json({ game, prediction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get game by ID
router.get('/:gameId', async (req, res) => {
  try {
    const game = await Game.findOne({ gameId: req.params.gameId });
    if (!game) return res.status(404).json({ error: 'Game not found' });
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get active games
router.get('/', async (req, res) => {
  try {
    const { company } = req.query;
    const query = { status: { $in: ['pending', 'running'] } };
    if (company) {
      query.company = company;
    }
    const games = await Game.find(query);
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
