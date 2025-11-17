<div align="center">
  <h1><img src="https://project-management-gs.vercel.app/favicon.ico" width="20" height="20" alt="project-management Favicon">
   Project Management</h1>
  <p>
    An open-source project management platform with Google OAuth authentication, built with React, Node.js, Express, and MongoDB.
  </p>
  <p>
    <a href="https://github.com/GreatStackDev/project-management/blob/main/LICENSE.md"><img src="https://img.shields.io/github/license/GreatStackDev/project-management?style=for-the-badge" alt="License"></a>
    <a href="https://github.com/GreatStackDev/project-management/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge" alt="PRs Welcome"></a>
    <a href="https://github.com/GreatStackDev/project-management/issues"><img src="https://img.shields.io/github/issues/GreatStackDev/project-management?style=for-the-badge" alt="GitHub issues"></a>
  </p>
</div>

---

## 📖 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#-tech-stack)
- [🏗️ Architecture](#-architecture)
- [🚀 Quick Start](#-quick-start)
- [📦 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

---

## ✨ Features

### Authentication & Security
- **Google OAuth 2.0** - Secure authentication with Google accounts
- **JWT Tokens** - Stateless authentication with HTTP-only cookies
- **Protected Routes** - Client-side route protection

### Workspace Management
- **Multiple Workspaces** - Create and manage separate workspaces
- **Role-Based Access** - Admin and member roles
- **Team Collaboration** - Invite and manage team members

### Project Management
- **Project Creation** - Create projects with detailed information
- **Status Tracking** - Track project status (Planning, Active, Completed, etc.)
- **Priority Levels** - Set project priorities (Low, Medium, High)
- **Progress Monitoring** - Visual progress tracking
- **Team Assignment** - Assign team leads and members

### Task Management
- **Task Types** - Bug, Feature, Task, Improvement, Other
- **Status Workflow** - TODO, In Progress, Done
- **Priority Management** - Prioritize tasks effectively
- **Due Dates** - Set and track task deadlines
- **Assignee Management** - Assign tasks to team members
- **Bulk Operations** - Delete multiple tasks at once
- **Advanced Filtering** - Filter by status, type, priority, assignee

### Analytics & Visualization
- **Project Analytics** - Charts and statistics using Recharts
- **Dashboard Overview** - Quick stats and insights
- **Calendar View** - Visual task scheduling
- **Recent Activity** - Track team activity

### UI/UX
- **Dark Mode** - Full dark mode support with theme persistence
- **Responsive Design** - Mobile, tablet, and desktop optimized
- **Modern UI** - Clean interface with Tailwind CSS
- **Toast Notifications** - User feedback for all actions
- **Loading States** - Smooth loading experiences

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.2
- **Styling**: Tailwind CSS 4.1.12
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM v7.8.1
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Charts**: Recharts
- **Date Handling**: date-fns
- **Notifications**: react-hot-toast

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Passport.js (Google OAuth 2.0)
- **Token Management**: JWT (jsonwebtoken)
- **Session Management**: express-session
- **Security**: bcryptjs, cookie-parser, CORS

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  React + Vite + Tailwind CSS + Redux Toolkit         │  │
│  │  - Login Page (Google OAuth)                         │  │
│  │  - Protected Routes                                  │  │
│  │  - Dashboard, Projects, Tasks                        │  │
│  │  - API Service Layer (Axios)                         │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTP/HTTPS (REST API)
┌─────────────────────────────────────────────────────────────┐
│                         Backend                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Node.js + Express.js                                │  │
│  │  - Google OAuth Routes                               │  │
│  │  - JWT Authentication Middleware                     │  │
│  │  - REST API Endpoints                                │  │
│  │  - Mongoose Models                                   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                    MongoDB Atlas                             │
│  - Users Collection                                          │
│  - Workspaces Collection                                     │
│  - Projects Collection                                       │
│  - Tasks Collection                                          │
└─────────────────────────────────────────────────────────────┘
```

**Key Design Principles:**
- ✅ **Decoupled Architecture** - Frontend and backend are completely separate
- ✅ **API-First Design** - All communication via REST API
- ✅ **Stateless Authentication** - JWT tokens for scalability
- ✅ **Easy Deployment** - Can be hosted on different platforms
- ✅ **Secure** - HTTP-only cookies, CORS protection, environment variables

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (free tier available)
- Google Cloud Console account

### 1. Clone the Repository

```bash
git clone https://github.com/GreatStackDev/project-management.git
cd project-management
```

### 2. Setup Backend

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your credentials (see SETUP_GUIDE.md)
npm run dev
```

Backend runs on `http://localhost:5000`

### 3. Setup Frontend

```bash
# From project root
npm install
cp .env.example .env
# Edit .env with your API URL
npm run dev
```

Frontend runs on `http://localhost:5173`

### 4. Complete Setup

Follow the detailed setup guide: **[SETUP_GUIDE.md](./SETUP_GUIDE.md)**

This includes:
- MongoDB Atlas configuration
- Google OAuth setup
- Environment variables
- Testing instructions

---

## 📦 Deployment

The frontend and backend can be deployed separately to different platforms.

### Recommended Stack (Free Tier)

- **Frontend**: Vercel or Netlify
- **Backend**: Render or Railway
- **Database**: MongoDB Atlas

### Quick Deploy

**Backend (Render):**
1. Connect GitHub repository
2. Set root directory to `server`
3. Add environment variables
4. Deploy

**Frontend (Vercel):**
1. Connect GitHub repository
2. Set `VITE_API_URL` environment variable
3. Deploy

For detailed deployment instructions: **[DEPLOYMENT.md](./DEPLOYMENT.md)**

---

## 🔧 Development

### Project Structure

```
project-management/
├── server/                 # Backend (Node.js + Express)
│   ├── config/            # Configuration files
│   ├── middleware/        # Express middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   └── server.js          # Entry point
│
├── src/                   # Frontend (React + Vite)
│   ├── app/               # Redux store
│   ├── components/        # React components
│   ├── features/          # Redux slices
│   ├── pages/             # Page components
│   ├── services/          # API services
│   └── assets/            # Static assets
│
├── SETUP_GUIDE.md         # Detailed setup instructions
├── DEPLOYMENT.md          # Deployment guide
└── README.md              # This file
```

### Available Scripts

**Frontend:**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

**Backend:**
```bash
npm run dev      # Start with nodemon (auto-reload)
npm start        # Start production server
```

---

## 🤝 Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE.md](./LICENSE.md) file for details.

---

## 🙏 Acknowledgments

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Passport.js](http://www.passportjs.org/)

---

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

<div align="center">
  <p>Made with ❤️ by the community</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
