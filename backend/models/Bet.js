const mongoose = require('mongoose');

const betSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gameId: { type: String, required: true },
  amount: { type: Number, required: true },
  multiplier: { type: Number, default: 1 },
  cashoutMultiplier: { type: Number, default: null },
  status: { type: String, enum: ['pending', 'won', 'lost', 'cashed_out'], default: 'pending' },
  winnings: { type: Number, default: 0 },
  prediction: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bet', betSchema);
