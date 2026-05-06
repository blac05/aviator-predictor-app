const express = require('express');
const Game = require('../models/Game');
const PredictionService = require('../services/PredictionService');
const router = express.Router();

// Create new game
router.post('/create', async (req, res) => {
  try {
    const gameId = `game_${Date.now()}`;
    const crashPoint = PredictionService.simulateGameCrash();

    const prediction = await PredictionService.predictCrash([]);
    
    const game = new Game({
      gameId,
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
    const games = await Game.find({ status: { $in: ['pending', 'running'] } });
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;