const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get user profile
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user stats
router.get('/:userId/stats', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    res.json({
      balance: user.balance,
      totalBets: user.totalBets,
      totalWinnings: user.totalWinnings,
      winRate: user.winRate
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add funds
router.post('/:userId/add-funds', async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    user.balance += amount;
    await user.save();
    res.json({ message: 'Funds added', newBalance: user.balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
