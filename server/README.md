# Project Management Backend

Backend API for the Project Management application with Google OAuth authentication.

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `server` directory:

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
PORT=5000
NODE_ENV=development

# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/project-management?retryWrites=true&w=majority

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# JWT Secret (generate a random string)
JWT_SECRET=your_super_secret_jwt_key

# Session Secret (generate a random string)
SESSION_SECRET=your_session_secret_key

# Frontend URL
CLIENT_URL=http://localhost:5173
```

### 3. Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or sign in
3. Create a new cluster (free tier available)
4. Click "Connect" → "Connect your application"
5. Copy the connection string and replace `<username>` and `<password>`
6. Whitelist your IP address in Network Access

### 4. Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure OAuth consent screen
6. Add authorized redirect URIs:
   - `http://localhost:5000/api/auth/google/callback`
   - `https://yourdomain.com/api/auth/google/callback` (for production)
7. Copy Client ID and Client Secret to `.env`

### 5. Run the Server

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - Google OAuth callback
- `GET /api/auth/me` - Get current user (Protected)
- `POST /api/auth/logout` - Logout user (Protected)

### Workspaces
- `GET /api/workspaces` - Get all workspaces (Protected)
- `POST /api/workspaces` - Create workspace (Protected)

### Projects
- `POST /api/projects` - Create project (Protected)
- `PUT /api/projects/:id` - Update project (Protected)
- `DELETE /api/projects/:id` - Delete project (Protected)

### Tasks
- `POST /api/tasks` - Create task (Protected)
- `PUT /api/tasks/:id` - Update task (Protected)
- `DELETE /api/tasks` - Delete multiple tasks (Protected)
- `POST /api/tasks/:id/comments` - Add comment to task (Protected)

## Database Models

- **User**: User accounts with Google OAuth
- **Workspace**: Organization workspaces
- **Project**: Projects within workspaces
- **Task**: Tasks within projects

## Security Features

- JWT authentication with HTTP-only cookies
- Passport.js for Google OAuth
- Protected routes with middleware
- CORS configuration
- Session management
