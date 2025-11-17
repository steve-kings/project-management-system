# Deployment Guide - Separate Frontend & Backend

This guide covers deploying the frontend and backend separately to different hosting platforms.

---

## 🎯 Architecture Overview

```
Frontend (React + Vite)          Backend (Node.js + Express)
├─ Hosted on Vercel/Netlify  →  ├─ Hosted on Render/Railway/Heroku
├─ Static files                  ├─ REST API
└─ Communicates via API          └─ MongoDB Atlas
```

---

## 📦 Backend Deployment

### Option 1: Render (Recommended - Free Tier Available)

#### 1. Prepare Backend

```bash
cd server
```

#### 2. Create `render.yaml` (optional)

```yaml
services:
  - type: web
    name: project-management-api
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: MONGODB_URI
        sync: false
      - key: GOOGLE_CLIENT_ID
        sync: false
      - key: GOOGLE_CLIENT_SECRET
        sync: false
      - key: JWT_SECRET
        generateValue: true
      - key: SESSION_SECRET
        generateValue: true
```

#### 3. Deploy to Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
5. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=https://your-api-domain.onrender.com/api/auth/google/callback
   JWT_SECRET=generate_random_string_here
   SESSION_SECRET=generate_random_string_here
   CLIENT_URL=https://your-frontend-domain.vercel.app
   ```
6. Click **Create Web Service**

#### 4. Update Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Add production callback URL:
   - `https://your-api-domain.onrender.com/api/auth/google/callback`

---

### Option 2: Railway

#### 1. Deploy

```bash
cd server
railway login
railway init
railway up
```

#### 2. Set Environment Variables

```bash
railway variables set NODE_ENV=production
railway variables set MONGODB_URI=your_connection_string
railway variables set GOOGLE_CLIENT_ID=your_client_id
railway variables set GOOGLE_CLIENT_SECRET=your_secret
railway variables set GOOGLE_CALLBACK_URL=https://your-domain.railway.app/api/auth/google/callback
railway variables set JWT_SECRET=your_jwt_secret
railway variables set SESSION_SECRET=your_session_secret
railway variables set CLIENT_URL=https://your-frontend.vercel.app
```

---

### Option 3: Heroku

#### 1. Install Heroku CLI

```bash
npm install -g heroku
```

#### 2. Deploy

```bash
cd server
heroku login
heroku create your-app-name
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

#### 3. Set Environment Variables

```bash
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_connection_string
heroku config:set GOOGLE_CLIENT_ID=your_client_id
heroku config:set GOOGLE_CLIENT_SECRET=your_secret
heroku config:set GOOGLE_CALLBACK_URL=https://your-app.herokuapp.com/api/auth/google/callback
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set SESSION_SECRET=your_session_secret
heroku config:set CLIENT_URL=https://your-frontend.vercel.app
```

---

## 🌐 Frontend Deployment

### Option 1: Vercel (Recommended)

#### 1. Install Vercel CLI

```bash
npm install -g vercel
```

#### 2. Configure Environment Variable

Create `.env.production`:

```env
VITE_API_URL=https://your-api-domain.onrender.com/api
```

#### 3. Deploy

```bash
# From project root (not server folder)
vercel

# Or link to existing project
vercel --prod
```

#### 4. Set Environment Variables in Vercel Dashboard

1. Go to your project settings
2. Navigate to **Environment Variables**
3. Add:
   ```
   VITE_API_URL=https://your-api-domain.onrender.com/api
   ```
4. Redeploy

---

### Option 2: Netlify

#### 1. Create `netlify.toml`

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  VITE_API_URL = "https://your-api-domain.onrender.com/api"
```

#### 2. Deploy

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

Or use Netlify's GitHub integration:
1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variable: `VITE_API_URL`

---

### Option 3: GitHub Pages (Static Only)

**Note**: GitHub Pages doesn't support environment variables well. Use Vercel or Netlify instead.

---

## 🔧 Post-Deployment Configuration

### 1. Update Backend CORS

Ensure your backend `.env` has the correct frontend URL:

```env
CLIENT_URL=https://your-frontend-domain.vercel.app
```

### 2. Update Google OAuth

Add production URLs to Google Cloud Console:
- Authorized JavaScript origins:
  - `https://your-frontend-domain.vercel.app`
- Authorized redirect URIs:
  - `https://your-api-domain.onrender.com/api/auth/google/callback`

### 3. Update MongoDB Atlas

1. Go to MongoDB Atlas
2. Navigate to **Network Access**
3. Add IP addresses:
   - For Render: Add `0.0.0.0/0` (or specific IPs)
   - For Railway: Add their IP ranges
   - For Heroku: Add their IP ranges

### 4. Test the Deployment

1. Visit your frontend URL
2. Click "Continue with Google"
3. Verify authentication works
4. Create a workspace, project, and task
5. Check MongoDB Atlas to confirm data is saved

---

## 🔒 Security Checklist

- [ ] All environment variables are set correctly
- [ ] MongoDB Atlas network access is configured
- [ ] Google OAuth redirect URIs are updated
- [ ] HTTPS is enabled on both frontend and backend
- [ ] `NODE_ENV=production` is set on backend
- [ ] Strong JWT and session secrets are used
- [ ] CORS is properly configured
- [ ] Cookies are set with `secure: true` in production
- [ ] API rate limiting is implemented (optional)
- [ ] Error messages don't expose sensitive information

---

## 📊 Monitoring & Logs

### Backend Logs

**Render:**
```bash
# View logs in Render dashboard or CLI
render logs
```

**Railway:**
```bash
railway logs
```

**Heroku:**
```bash
heroku logs --tail
```

### Frontend Logs

Check browser console and hosting platform logs.

---

## 🐛 Troubleshooting

### Issue: CORS Errors

**Solution:**
- Verify `CLIENT_URL` in backend matches frontend URL exactly
- Check CORS configuration in `server/server.js`
- Ensure `withCredentials: true` in frontend API calls

### Issue: Google OAuth Not Working

**Solution:**
- Verify redirect URIs in Google Console
- Check `GOOGLE_CALLBACK_URL` in backend `.env`
- Ensure HTTPS is enabled

### Issue: Database Connection Failed

**Solution:**
- Check MongoDB Atlas connection string
- Verify network access allows your hosting platform
- Test connection string locally first

### Issue: Environment Variables Not Loading

**Solution:**
- Redeploy after setting environment variables
- Check variable names match exactly (case-sensitive)
- For Vite, ensure variables start with `VITE_`

---

## 🚀 Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Render
        run: |
          # Add your deployment script here

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        run: |
          npm install -g vercel
          vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

## 💰 Cost Estimation

### Free Tier Options

| Service | Free Tier | Limits |
|---------|-----------|--------|
| **MongoDB Atlas** | Yes | 512 MB storage |
| **Render** | Yes | 750 hours/month |
| **Railway** | Yes | $5 credit/month |
| **Vercel** | Yes | 100 GB bandwidth |
| **Netlify** | Yes | 100 GB bandwidth |

### Recommended Free Stack

- **Frontend**: Vercel (Free)
- **Backend**: Render (Free)
- **Database**: MongoDB Atlas (Free)
- **Total Cost**: $0/month

---

## 📝 Environment Variables Summary

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_CALLBACK_URL=https://api-domain.com/api/auth/google/callback
JWT_SECRET=...
SESSION_SECRET=...
CLIENT_URL=https://frontend-domain.com
```

### Frontend (.env.production)
```env
VITE_API_URL=https://api-domain.com/api
```

---

## ✅ Deployment Checklist

- [ ] Backend deployed and running
- [ ] Frontend deployed and accessible
- [ ] MongoDB Atlas configured
- [ ] Google OAuth configured
- [ ] Environment variables set
- [ ] CORS working
- [ ] Authentication working
- [ ] Data persisting to database
- [ ] All features tested
- [ ] SSL/HTTPS enabled
- [ ] Custom domain configured (optional)

---

## 🎉 Success!

Your project management app is now live with:
- ✅ Separate frontend and backend hosting
- ✅ Google OAuth authentication
- ✅ MongoDB Atlas database
- ✅ Scalable architecture
- ✅ Easy to maintain and update

**Frontend URL**: `https://your-app.vercel.app`  
**Backend API**: `https://your-api.onrender.com/api`
