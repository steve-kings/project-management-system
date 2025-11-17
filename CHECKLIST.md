# Setup Checklist ✅

Use this checklist to ensure your project is properly configured.

---

## 📋 Pre-Setup Checklist

- [ ] Node.js (v18+) installed
- [ ] npm or yarn installed
- [ ] Git installed
- [ ] Code editor (VS Code recommended)
- [ ] MongoDB Atlas account created
- [ ] Google Cloud Console account created

---

## 🔧 Backend Setup Checklist

### Installation
- [ ] Navigate to `server/` directory
- [ ] Run `npm install`
- [ ] All dependencies installed successfully

### Environment Configuration
- [ ] `server/.env` file created
- [ ] `PORT=5000` set
- [ ] `NODE_ENV=development` set
- [ ] MongoDB Atlas connection string added
- [ ] Google Client ID added
- [ ] Google Client Secret added
- [ ] Google Callback URL set to `http://localhost:5000/api/auth/google/callback`
- [ ] JWT Secret generated and added
- [ ] Session Secret generated and added
- [ ] Client URL set to `http://localhost:5173`

### MongoDB Atlas
- [ ] Cluster created
- [ ] Database user created
- [ ] Password saved securely
- [ ] Network access configured (IP whitelist)
- [ ] Connection string copied
- [ ] Connection string tested

### Google OAuth
- [ ] Google Cloud project created
- [ ] Google+ API enabled
- [ ] OAuth consent screen configured
- [ ] OAuth 2.0 credentials created
- [ ] Redirect URI added: `http://localhost:5000/api/auth/google/callback`
- [ ] Client ID and Secret copied

### Testing Backend
- [ ] Run `npm run dev` in `server/` directory
- [ ] Server starts without errors
- [ ] See "Server running on port 5000"
- [ ] See "MongoDB Connected: ..."
- [ ] Visit `http://localhost:5000/api/health`
- [ ] See `{"status":"OK","message":"Server is running"}`

---

## 🎨 Frontend Setup Checklist

### Installation
- [ ] Navigate to project root
- [ ] Run `npm install`
- [ ] All dependencies installed successfully
- [ ] `axios` package installed

### Environment Configuration
- [ ] `.env` file created in project root
- [ ] `VITE_API_URL=http://localhost:5000/api` set

### Testing Frontend
- [ ] Run `npm run dev` in project root
- [ ] Frontend starts without errors
- [ ] See "Local: http://localhost:5173/"
- [ ] Open browser to `http://localhost:5173`
- [ ] Login page loads

---

## 🔐 Authentication Testing Checklist

- [ ] Click "Continue with Google" button
- [ ] Redirected to Google sign-in page
- [ ] Sign in with Google account
- [ ] Redirected back to application
- [ ] See "Login successful!" toast
- [ ] Redirected to dashboard
- [ ] User name appears in navbar
- [ ] User avatar appears in navbar

---

## 🏢 Workspace Testing Checklist

- [ ] Dashboard loads successfully
- [ ] Can create new workspace
- [ ] Workspace appears in sidebar
- [ ] Can switch between workspaces
- [ ] Workspace data persists after refresh

---

## 📊 Project Testing Checklist

- [ ] Navigate to Projects page
- [ ] Click "New Project" button
- [ ] Fill in project details
- [ ] Select team members
- [ ] Submit form
- [ ] Project appears in list
- [ ] Can filter projects by status
- [ ] Can filter projects by priority
- [ ] Can search projects
- [ ] Click on project card
- [ ] Project details page loads

---

## ✅ Task Testing Checklist

- [ ] In project details, click "New Task"
- [ ] Fill in task details
- [ ] Assign to team member
- [ ] Set due date
- [ ] Submit form
- [ ] Task appears in task list
- [ ] Can change task status
- [ ] Can filter tasks
- [ ] Can select multiple tasks
- [ ] Can delete tasks
- [ ] Task data persists after refresh

---

## 🎨 UI/UX Testing Checklist

- [ ] Dark mode toggle works
- [ ] Theme persists after refresh
- [ ] Responsive on mobile (< 768px)
- [ ] Responsive on tablet (768px - 1024px)
- [ ] Responsive on desktop (> 1024px)
- [ ] Sidebar opens/closes on mobile
- [ ] All icons load correctly
- [ ] Toast notifications appear
- [ ] Loading states show correctly
- [ ] Empty states display properly

---

## 🗄️ Database Verification Checklist

- [ ] Open MongoDB Atlas dashboard
- [ ] Navigate to "Browse Collections"
- [ ] See `project-management` database
- [ ] See `users` collection with your user
- [ ] See `workspaces` collection with created workspaces
- [ ] See `projects` collection with created projects
- [ ] See `tasks` collection with created tasks

---

## 🔒 Security Checklist

- [ ] `.env` files not committed to Git
- [ ] `.gitignore` includes `.env`
- [ ] JWT secret is strong and random
- [ ] Session secret is strong and random
- [ ] MongoDB password is strong
- [ ] Google OAuth credentials are secure
- [ ] HTTP-only cookies enabled
- [ ] CORS configured correctly

---

## 📱 Cross-Browser Testing Checklist

- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works in Edge
- [ ] Works in mobile browsers

---

## 🚀 Pre-Deployment Checklist

### Backend
- [ ] All environment variables documented
- [ ] Error handling implemented
- [ ] Logging configured
- [ ] Database indexes created
- [ ] API endpoints tested
- [ ] Security headers configured

### Frontend
- [ ] Build command works (`npm run build`)
- [ ] Production build tested (`npm run preview`)
- [ ] Environment variables for production set
- [ ] API URL points to production backend
- [ ] No console errors in production build

### Database
- [ ] Backup strategy in place
- [ ] Network access configured for production
- [ ] Connection string for production ready

### Google OAuth
- [ ] Production redirect URIs added
- [ ] OAuth consent screen published
- [ ] Authorized domains configured

---

## 🌐 Deployment Checklist

### Backend Deployment (Render/Railway)
- [ ] Repository connected
- [ ] Build command configured
- [ ] Start command configured
- [ ] Environment variables set
- [ ] Service deployed successfully
- [ ] Health check endpoint accessible
- [ ] MongoDB connection working
- [ ] Google OAuth working

### Frontend Deployment (Vercel/Netlify)
- [ ] Repository connected
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Environment variable `VITE_API_URL` set
- [ ] Site deployed successfully
- [ ] Can access login page
- [ ] Can authenticate with Google
- [ ] All features working

### Post-Deployment
- [ ] Backend URL updated in frontend env
- [ ] Frontend URL updated in backend env
- [ ] Google OAuth redirect URIs updated
- [ ] MongoDB network access updated
- [ ] SSL/HTTPS enabled
- [ ] Custom domain configured (optional)
- [ ] DNS records configured (optional)

---

## ✅ Final Verification

- [ ] Can log in with Google
- [ ] Can create workspace
- [ ] Can create project
- [ ] Can create task
- [ ] Can update task status
- [ ] Can delete tasks
- [ ] Data persists across sessions
- [ ] Dark mode works
- [ ] Responsive on all devices
- [ ] No console errors
- [ ] No network errors
- [ ] Performance is acceptable
- [ ] All features work as expected

---

## 🎉 Success!

If all items are checked, congratulations! Your project management app is fully set up and ready to use.

### What's Next?

1. **Customize** - Add your branding and features
2. **Optimize** - Improve performance and UX
3. **Scale** - Add more features as needed
4. **Share** - Deploy and share with your team

---

## 📝 Notes

Use this space to track any issues or customizations:

```
Date: ___________
Issue/Note: _____________________________________
Resolution: _____________________________________

Date: ___________
Issue/Note: _____________________________________
Resolution: _____________________________________

Date: ___________
Issue/Note: _____________________________________
Resolution: _____________________________________
```

---

## 🆘 Need Help?

If any checklist item fails:
1. Check the error message
2. Review the relevant documentation
3. Verify environment variables
4. Check the troubleshooting section in SETUP_GUIDE.md
5. Review server and browser console logs

---

<div align="center">
  <p><strong>Happy Building! 🚀</strong></p>
</div>
