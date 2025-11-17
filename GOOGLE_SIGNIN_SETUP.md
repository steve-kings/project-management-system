# Google Sign-In Setup Guide

This guide will help you set up Google Sign-In for the Project Management application using Google Identity Services.

## Overview

The application uses Google Identity Services (GIS) library for authentication, which provides:
- Modern, secure authentication
- Google One Tap sign-in
- Better user experience
- No redirect required (token-based authentication)

## Prerequisites

- A Google Cloud Platform account
- Node.js and npm installed

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note your project name and ID

## Step 2: Enable Google+ API

1. In the Google Cloud Console, go to **APIs & Services** > **Library**
2. Search for "Google+ API"
3. Click on it and press **Enable**

## Step 3: Create OAuth 2.0 Credentials

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth client ID**
3. If prompted, configure the OAuth consent screen:
   - Choose **External** user type
   - Fill in the required fields:
     - App name: `Project Management`
     - User support email: Your email
     - Developer contact email: Your email
   - Click **Save and Continue**
   - Skip the Scopes section (click **Save and Continue**)
   - Add test users if needed (for development)
   - Click **Save and Continue**

4. Create OAuth Client ID:
   - Application type: **Web application**
   - Name: `Project Management Web Client`
   - Authorized JavaScript origins:
     - `http://localhost:5173` (for development)
     - Add your production URL when deploying
   - Authorized redirect URIs:
     - `http://localhost:5000/api/auth/google/callback` (for fallback OAuth flow)
     - Add your production callback URL when deploying
   - Click **Create**

5. Copy the **Client ID** and **Client Secret**

## Step 4: Configure Environment Variables

### Frontend (.env)

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com
```

Replace `your_google_client_id_here` with your actual Google Client ID.

### Backend (server/.env)

Create a `server/.env` file:

```env
PORT=5000
NODE_ENV=development

# MongoDB Atlas
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/project-management?retryWrites=true&w=majority

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Session Secret
SESSION_SECRET=your_session_secret_key_change_this_in_production

# Frontend URL
CLIENT_URL=http://localhost:5173
```

Replace the placeholder values with your actual credentials.

## Step 5: Install Dependencies

Both frontend and backend dependencies should already be installed. If not:

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
```

## Step 6: Start the Application

```bash
# Terminal 1 - Start backend server
cd server
npm run dev

# Terminal 2 - Start frontend
npm run dev
```

## Step 7: Test Google Sign-In

1. Open your browser and navigate to `http://localhost:5173`
2. You should be redirected to the login page
3. You'll see:
   - A Google Sign-In button
   - Google One Tap prompt (if you're already signed in to Google)
4. Click the button or use One Tap to sign in
5. After successful authentication, you'll be redirected to the dashboard

## How It Works

### Frontend Flow

1. The Login component initializes Google Identity Services
2. When the user clicks "Sign in with Google" or uses One Tap:
   - Google returns a JWT credential token
   - The token is sent to the backend `/api/auth/google/verify` endpoint
3. Backend verifies the token and creates/updates the user
4. Backend returns a JWT token and sets it as an HTTP-only cookie
5. User is redirected to the dashboard

### Backend Flow

1. Receives the Google credential token
2. Decodes and validates the token:
   - Checks the issuer is Google
   - Verifies the token hasn't expired
   - Confirms the audience matches the Client ID
3. Extracts user information (email, name, picture, Google ID)
4. Finds or creates the user in the database
5. Generates a JWT token for session management
6. Returns user data and sets authentication cookie

## Security Features

- **HTTP-only cookies**: Prevents XSS attacks
- **Token validation**: Verifies Google tokens server-side
- **Secure flag**: Enabled in production for HTTPS
- **SameSite**: Protects against CSRF attacks
- **Token expiration**: Checks token validity

## Troubleshooting

### "Invalid token audience" error
- Verify `VITE_GOOGLE_CLIENT_ID` matches `GOOGLE_CLIENT_ID` in server/.env
- Ensure you're using the correct Client ID from Google Cloud Console

### Google One Tap not showing
- Clear browser cookies and cache
- Check browser console for errors
- Ensure you're on `localhost` or HTTPS (required by Google)

### "Unauthorized JavaScript origin" error
- Add `http://localhost:5173` to Authorized JavaScript origins in Google Cloud Console
- Wait a few minutes for changes to propagate

### CORS errors
- Verify `CLIENT_URL` in server/.env matches your frontend URL
- Check CORS configuration in server.js

## Production Deployment

When deploying to production:

1. Update Authorized JavaScript origins in Google Cloud Console:
   - Add your production domain (e.g., `https://yourdomain.com`)

2. Update Authorized redirect URIs:
   - Add `https://yourdomain.com/api/auth/google/callback`

3. Update environment variables:
   - Set `NODE_ENV=production`
   - Update `CLIENT_URL` to your production frontend URL
   - Update `VITE_API_URL` to your production API URL
   - Use strong, unique values for `JWT_SECRET` and `SESSION_SECRET`

4. Enable HTTPS (required by Google for production)

## Additional Resources

- [Google Identity Services Documentation](https://developers.google.com/identity/gsi/web)
- [Google Cloud Console](https://console.cloud.google.com/)
- [OAuth 2.0 Best Practices](https://tools.ietf.org/html/rfc6749)
