# Quick Start Guide

Get your Project Management app running in 5 minutes!

## Prerequisites

- Node.js (v18+) installed
- MongoDB Atlas account (free)
- Google Cloud Console account

---

## 🚀 Super Quick Start (Development)

### Option 1: Automated Script

**Linux/Mac:**
```bash
chmod +x start-dev.sh
./start-dev.sh
```

**Windows:**
```bash
start-dev.bat
```

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd server
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm install
npm run dev
```

---

## ⚙️ Configuration (Required)

### 1. MongoDB Atlas (2 minutes)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Create database user
4. Get connection string
5. Add to `server/.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/project-management
   ```

### 2. Google OAuth (3 minutes)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add redirect URI: `http://localhost:5000/api/auth/google/callback`
6. Add to `server/.env`:
   ```env
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_secret
   ```

### 3. Generate Secrets

```bash
# Generate JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate Session secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Add to `server/.env`:
```env
JWT_SECRET=generated_jwt_secret
SESSION_SECRET=generated_session_secret
```

---

## ✅ Verify Setup

1. Open `http://localhost:5173`
2. Click "Continue with Google"
3. Sign in with Google
4. You should see the dashboard!

---

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Verify all environment variables in `server/.env`

### Frontend won't connect
- Ensure backend is running on port 5000
- Check `VITE_API_URL` in `.env`

### Google OAuth fails
- Verify redirect URI in Google Console
- Check `GOOGLE_CALLBACK_URL` in `server/.env`

---

## 📚 Next Steps

- Read [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed setup
- Read [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment
- Check [README.md](./README.md) for full documentation

---

## 🎉 That's it!

You now have a fully functional project management app with:
- ✅ Google OAuth authentication
- ✅ MongoDB database
- ✅ Separate frontend and backend
- ✅ Ready for development

Happy coding! 🚀
