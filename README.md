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