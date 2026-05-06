const express = require('express');
const BettingService = require('../services/BettingService');
const Bet = require('../models/Bet');
const router = express.Router();

// Place bet
router.post('/place', async (req, res) => {
  try {
    const { userId, gameId, amount } = req.body;
    const bet = await BettingService.placeBet(userId, gameId, amount);
    res.status(201).json(bet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cashout bet
router.post('/cashout', async (req, res) => {
  try {
    const { betId, currentMultiplier } = req.body;
    const result = await BettingService.cashoutBet(betId, currentMultiplier);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user bets
router.get('/history/:userId', async (req, res) => {
  try {
    const bets = await BettingService.getUserBetHistory(req.params.userId);
    res.json(bets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;