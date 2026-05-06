const Bet = require('../models/Bet');
const User = require('../models/User');
const Game = require('../models/Game');

class BettingService {
  // Place a bet
  static async placeBet(userId, gameId, amount) {
    try {
      const user = await User.findById(userId);
      
      if (!user) throw new Error('User not found');
      if (user.balance < amount) throw new Error('Insufficient balance');

      // Deduct amount from balance
      user.balance -= amount;
      user.totalBets += 1;
      await user.save();

      // Create bet record
      const bet = new Bet({
        userId,
        gameId,
        amount,
        status: 'pending'
      });

      await bet.save();
      
      // Update game total bets
      await Game.findByIdAndUpdate(gameId, { $inc: { totalBets: amount } });

      return bet;
    } catch (error) {
      throw new Error(`Bet placement failed: ${error.message}`);
    }
  }

  // Cashout bet
  static async cashoutBet(betId, currentMultiplier) {
    try {
      const bet = await Bet.findById(betId);
      
      if (!bet) throw new Error('Bet not found');
      if (bet.status !== 'pending') throw new Error('Bet already settled');

      // Calculate winnings
      const winnings = this.calculateWinnings(bet.amount, currentMultiplier);
      
      bet.cashoutMultiplier = currentMultiplier;
      bet.winnings = winnings;
      bet.status = 'cashed_out';
      await bet.save();

      // Update user balance and stats
      const user = await User.findById(bet.userId);
      user.balance += winnings;
      user.totalWinnings += (winnings - bet.amount);
      user.winRate = (user.totalWinnings / (user.totalBets * bet.amount)) * 100;
      await user.save();

      return { bet, newBalance: user.balance };
    } catch (error) {
      throw new Error(`Cashout failed: ${error.message}`);
    }
  }

  // Settle bet after crash
  static async settleBet(betId, gameStatus) {
    try {
      const bet = await Bet.findById(betId);
      
      if (!bet) throw new Error('Bet not found');
      if (bet.status !== 'pending') throw new Error('Bet already settled');

      if (gameStatus === 'won') {
        const winnings = bet.amount * bet.multiplier;
        bet.winnings = winnings;
        bet.status = 'won';

        const user = await User.findById(bet.userId);
        user.balance += winnings;
        user.totalWinnings += (winnings - bet.amount);
        await user.save();
      } else {
        bet.status = 'lost';
      }

      await bet.save();
      return bet;
    } catch (error) {
      throw new Error(`Bet settlement failed: ${error.message}`);
    }
  }

  // Calculate potential winnings
  static calculateWinnings(betAmount, multiplier) {
    return parseFloat((betAmount * multiplier).toFixed(2));
  }

  // Get user bet history
  static async getUserBetHistory(userId, limit = 20) {
    return await Bet.find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit);
  }
}

module.exports = BettingService;
