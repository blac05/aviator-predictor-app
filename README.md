# ✈️ Aviator Predictor App - Sports Betting

A full-stack web application for predicting Aviator game crashes and managing sports betting with real-time predictions, user authentication, and comprehensive analytics.

## 🚀 Features

- **Smart Crash Prediction**: AI-powered algorithm analyzes historical game data
- **Real-time Betting**: Place bets, cashout before crash, auto-settlement
- **User Wallet System**: Secure balance management and fund tracking
- **Live Game Tracking**: Real-time multiplier display and game status
- **User Authentication**: JWT-based login and registration
- **Statistics Dashboard**: Win rates, profit/loss, betting history
- **Socket.io Integration**: Real-time game updates and notifications
- **Responsive Design**: Works on desktop and mobile devices

## 📋 Tech Stack

**Backend:**
- Node.js with Express.js
- MongoDB with Mongoose
- JWT Authentication
- Socket.io for real-time features
- bcryptjs for password hashing

**Frontend:**
- React.js
- React Router
- Axios for API calls
- CSS Grid & Flexbox

## 📦 Installation

### Prerequisites
- Node.js (v14+)
- MongoDB local or cloud (MongoDB Atlas)
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

## 🔑 Environment Variables

Create `.env` file in the backend directory:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/aviator-predictor
JWT_SECRET=your_super_secret_jwt_key_12345
NODE_ENV=development
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Games
- `POST /api/games/create` - Create new game
- `GET /api/games/:gameId` - Get game details
- `GET /api/games` - Get active games

### Betting
- `POST /api/bets/place` - Place a bet
- `POST /api/bets/cashout` - Cashout active bet
- `GET /api/bets/history/:userId` - Get bet history

### Users
- `GET /api/users/:userId` - Get user profile
- `GET /api/users/:userId/stats` - Get user statistics
- `POST /api/users/:userId/add-funds` - Add funds to wallet

### Predictions
- `GET /api/predictions/next` - Get next game prediction

## 🎮 How to Use

1. **Register/Login**: Create your account
2. **Add Funds**: Add money to your wallet
3. **Place Bet**: Select bet amount and auto-cashout multiplier
4. **Watch Game**: Monitor the multiplier in real-time
5. **Cashout or Lose**: Click cashout before crash or lose your bet
6. **Check Stats**: View your performance on the dashboard

## 🔮 Prediction Algorithm

The prediction engine:
- Analyzes last 50 games
- Calculates average crash point
- Computes standard deviation
- Generates prediction with confidence score
- Machine learning ready for future improvements

## 🛠️ Future Enhancements

- [ ] Advanced ML prediction model
- [ ] Live leaderboards
- [ ] Multiplayer tournaments
- [ ] Payment gateway integration
- [ ] Mobile app (React Native)
- [ ] Voice notifications
- [ ] Advanced analytics & charts
- [ ] Custom betting strategies
- [ ] Social features (friends, groups)
- [ ] Admin dashboard

## 📝 Project Structure

```
aviator-predictor-app/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Game.js
│   │   └── Bet.js
│   ├── routes/
│   ├── services/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature')`
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - feel free to use this project

## ⚠️ Disclaimer

This is a sports betting predictor application for entertainment purposes. Gambling involves risk of loss. Please gamble responsibly and never bet more than you can afford to lose.

## 🎯 Support

For issues or feature requests, open an issue on GitHub.

---

**Happy Predicting! ✈️**
