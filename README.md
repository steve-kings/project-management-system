# Project Management Application

A full-stack project management application with real-time collaboration features.

## 🏗️ Project Structure

```
project-management-app/
├── client/          # React frontend (Vite + React + Redux)
├── server/          # Node.js backend (Express + MongoDB)
└── package.json     # Root package manager
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Google OAuth credentials
- Gmail account for email notifications

### Installation

1. **Install all dependencies:**
```bash
npm run install:all
```

Or install separately:
```bash
npm run install:client
npm run install:server
```

2. **Configure environment variables:**

**Client** (`client/.env`):
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

**Server** (`server/.env`):
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
EMAIL_USER=your_gmail@gmail.com
EMAIL_APP_PASSWORD=your_gmail_app_password
CLIENT_URL=http://localhost:5173
```

### Running the Application

**Development mode (both client and server):**
```bash
npm run dev
```

**Run separately:**
```bash
npm run client    # Frontend only (port 5173)
npm run server    # Backend only (port 5000)
```

**Build for production:**
```bash
npm run build:client
```

## 📚 Documentation

- [Client Documentation](./client/README.md)
- [Server Documentation](./server/README.md)
- [Setup Guide](./SETUP_GUIDE.md)
- [Google Sign-In Setup](./GOOGLE_SIGNIN_SETUP.md)
- [Email Setup](./EMAIL_SETUP.md)
- [Testing Guide](./TESTING_GUIDE.md)
- [Deployment Guide](./DEPLOYMENT.md)

## ✨ Features

- 🔐 Google OAuth authentication
- 📊 Real-time task updates with Socket.IO
- 👥 Multi-workspace collaboration
- 📧 Email invitations
- 📈 Project analytics and dashboards
- 📅 Calendar view
- ✅ Task management with priorities and status tracking

## 🛠️ Tech Stack

**Frontend:**
- React 19
- Redux Toolkit
- Vite
- Tailwind CSS
- Socket.IO Client
- Recharts

**Backend:**
- Node.js
- Express
- MongoDB
- Socket.IO
- Nodemailer
- JWT Authentication

## 📞 Contact

© 2025 [kingscreation.co.ke](https://kingscreation.co.ke)

## 📄 License

MIT License - see LICENSE.md for details
