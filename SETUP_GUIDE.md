# Complete Setup Guide - Project Management App

This guide will walk you through setting up the complete project with Google OAuth, Node.js backend, and MongoDB Atlas.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (free tier available)
- Google Cloud Console account

---

## Part 1: MongoDB Atlas Setup

### 1. Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (M0 Free tier is sufficient)

### 2. Configure Database Access

1. In Atlas dashboard, go to **Database Access**
2. Click **Add New Database User**
3. Create a user with username and password
4. Save these credentials securely

### 3. Configure Network Access

1. Go to **Network Access**
2. Click **Add IP Address**
3. For development, click **Allow Access from Anywhere** (0.0.0.0/0)
4. For production, add your specific IP addresses

### 4. Get Connection String

1. Click **Connect** on your cluster
2. Choose **Connect your application**
3. Copy the connection string
4. It looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

---

## Part 2: Google OAuth Setup

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Name it (e.g., "Project Management App")

### 2. Enable Google+ API

1. In the left sidebar, go to **APIs & Services** → **Library**
2. Search for "Google+ API"
3. Click and enable it

### 3. Configure OAuth Consent Screen

1. Go to **APIs & Services** → **OAuth consent screen**
2. Choose **External** user type
3. Fill in required fields:
   - App name: "Project Management"
   - User support email: your email
   - Developer contact: your email
4. Add scopes: `email`, `profile`, `openid`
5. Add test users (your email) if in testing mode
6. Save and continue

### 4. Create OAuth Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth 2.0 Client ID**
3. Choose **Web application**
4. Add authorized redirect URIs:
   - `http://localhost:5000/api/auth/google/callback` (development)
   - `https://yourdomain.com/api/auth/google/callback` (production)
5. Click **Create**
6. Copy **Client ID** and **Client Secret**

---

## Part 3: Backend Setup

### 1. Install Backend Dependencies

```bash
cd server
npm install
```

### 2. Create Environment File

```bash
cp .env.example .env
```

### 3. Configure .env File

Edit `server/.env`:

```env
PORT=5000
NODE_ENV=development

# MongoDB Atlas - Replace with your connection string
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/project-management?retryWrites=true&w=majority

# Google OAuth - Replace with your credentials
GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# JWT Secret - Generate a random string (use: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_SECRET=your_super_secret_jwt_key_here

# Session Secret - Generate another random string
SESSION_SECRET=your_session_secret_key_here

# Frontend URL
CLIENT_URL=http://localhost:5173
```

### 4. Start Backend Server

```bash
npm run dev
```

Server should start on `http://localhost:5000`

---

## Part 4: Frontend Setup

### 1. Install Frontend Dependencies

```bash
# From project root
npm install axios
```

### 2. Create Frontend Environment File

```bash
cp .env.example .env
```

### 3. Configure .env File

Edit `.env` in project root:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Start Frontend Development Server

```bash
npm run dev
```

Frontend should start on `http://localhost:5173`

---

## Part 5: Testing the Setup

### 1. Test Backend Health

Open browser and visit: `http://localhost:5000/api/health`

You should see:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### 2. Test Google OAuth

1. Open `http://localhost:5173`
2. You should be redirected to login page
3. Click "Continue with Google"
4. Sign in with your Google account
5. You should be redirected back to the dashboard

### 3. Verify Database Connection

1. Go to MongoDB Atlas dashboard
2. Click **Browse Collections**
3. You should see your database with collections: `users`, `workspaces`, `projects`, `tasks`

---

## Part 6: Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"

**Solution:**
- Check your MongoDB connection string in `.env`
- Ensure IP address is whitelisted in Atlas
- Verify username and password are correct
- Check if cluster is active

### Issue: "Google OAuth redirect not working"

**Solution:**
- Verify redirect URI in Google Console matches exactly
- Check `GOOGLE_CALLBACK_URL` in `.env`
- Ensure Google+ API is enabled
- Clear browser cookies and try again

### Issue: "CORS errors in browser"

**Solution:**
- Verify `CLIENT_URL` in backend `.env` matches frontend URL
- Check CORS configuration in `server/server.js`
- Ensure `withCredentials: true` in frontend API calls

### Issue: "JWT token not working"

**Solution:**
- Generate a strong JWT secret
- Clear browser cookies
- Check cookie settings in `server/routes/auth.js`
- Verify `httpOnly` and `sameSite` settings

---

## Part 7: Production Deployment

### Backend (e.g., Heroku, Railway, Render)

1. Set environment variables in hosting platform
2. Update `GOOGLE_CALLBACK_URL` to production URL
3. Update `CLIENT_URL` to production frontend URL
4. Add production domain to Google OAuth redirect URIs
5. Set `NODE_ENV=production`

### Frontend (e.g., Vercel, Netlify)

1. Set `VITE_API_URL` to production backend URL
2. Build the project: `npm run build`
3. Deploy the `dist` folder

### MongoDB Atlas

1. Update Network Access to allow production server IPs
2. Consider upgrading to paid tier for better performance

---

## Part 8: Project Structure

```
project-management/
├── server/                 # Backend
│   ├── config/            # Configuration files
│   │   ├── database.js    # MongoDB connection
│   │   └── passport.js    # Google OAuth config
│   ├── middleware/        # Express middleware
│   │   └── auth.js        # JWT authentication
│   ├── models/            # Mongoose models
│   │   ├── User.js
│   │   ├── Workspace.js
│   │   ├── Project.js
│   │   └── Task.js
│   ├── routes/            # API routes
│   │   ├── auth.js
│   │   ├── workspace.js
│   │   ├── project.js
│   │   └── task.js
│   ├── utils/             # Utility functions
│   │   └── generateToken.js
│   ├── .env               # Environment variables
│   ├── .env.example       # Example env file
│   ├── package.json
│   └── server.js          # Entry point
│
├── src/                   # Frontend
│   ├── app/               # Redux store
│   ├── components/        # React components
│   ├── features/          # Redux slices
│   │   ├── authSlice.js
│   │   ├── themeSlice.js
│   │   └── workspaceSlice.js
│   ├── pages/             # Page components
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   └── ...
│   ├── services/          # API services
│   │   └── api.js
│   └── ...
│
├── .env                   # Frontend env
├── .env.example
└── package.json
```

---

## Part 9: Next Steps

After successful setup:

1. **Create your first workspace** - Click "Create Workspace" in the app
2. **Add team members** - Invite others via email
3. **Create projects** - Start organizing your work
4. **Add tasks** - Break down projects into manageable tasks
5. **Customize** - Modify the code to fit your needs

---

## Support

If you encounter issues:

1. Check the console logs (browser and server)
2. Verify all environment variables are set correctly
3. Ensure all services (MongoDB, Google OAuth) are properly configured
4. Review the error messages carefully

For more help, refer to:
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)

---

## Security Notes

⚠️ **Important for Production:**

1. Never commit `.env` files to version control
2. Use strong, randomly generated secrets for JWT and sessions
3. Enable HTTPS in production
4. Set `secure: true` for cookies in production
5. Restrict MongoDB network access to specific IPs
6. Regularly update dependencies
7. Implement rate limiting on API endpoints
8. Add input validation and sanitization
9. Use environment-specific configurations
10. Monitor logs for suspicious activity
