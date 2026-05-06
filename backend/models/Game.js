const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  gameId: { type: String, unique: true, required: true },
  company: { type: String, required: true },
  crashPoint: { type: Number, required: true },
  predictedCrash: { type: Number, default: null },
  confidence: { type: Number, default: 0 },
  status: { type: String, enum: ['pending', 'running', 'crashed'], default: 'pending' },
  startTime: { type: Date, default: Date.now },
  crashTime: { type: Date, default: null },
  totalBets: { type: Number, default: 0 },
  totalWinnings: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', gameSchema);
