# Testing Guide - Complete Workflow

## Test Scenario
- **Primary User**: kingscreationagency635@gmail.com (Workspace Owner)
- **Invited User**: kingoristephen635@gmail.com (Team Member)

## Step-by-Step Testing

### 1. Login as Primary User
1. Open http://localhost:3000
2. Click "Continue with Google"
3. Sign in with: **kingscreationagency635@gmail.com**
4. You should be redirected to the Dashboard

### 2. Create a Workspace
1. Look for the workspace selector in the sidebar (or create workspace option)
2. Click "Create Workspace" or the "+" button
3. Fill in:
   - **Name**: "My Test Workspace"
   - **Description**: "Testing workspace functionality"
4. Click "Create"
5. You should see the new workspace in the sidebar

### 3. Create a Project
1. Click "New Project" button on Dashboard or Projects page
2. Fill in the form:
   - **Project Name**: "Test Project"
   - **Description**: "Testing project creation"
   - **Status**: Active
   - **Priority**: High
   - **Start Date**: Today's date
   - **End Date**: A week from now
   - **Project Lead**: Select yourself (kingscreationagency635@gmail.com)
3. Click "Create Project"
4. You should see a success message
5. The project should appear in the Projects list

### 4. Invite Team Member
1. Go to the "Team" page (from sidebar)
2. Click "Invite Member" button
3. Fill in the form:
   - **Email**: kingoristephen635@gmail.com
   - **Role**: MEMBER (or ADMIN if you want them to have admin rights)
4. Click "Send Invitation"
5. You should see a success message

### 5. Check Email
1. Open the email inbox for: **kingoristephen635@gmail.com**
2. Look for an email from: **kingscreationagency635@gmail.com**
3. Subject: "You've been invited to join My Test Workspace"
4. The email should have:
   - Personalized greeting
   - Workspace name
   - Role badge
   - "Accept Invitation" button

### 6. Login as Invited User (Optional)
1. Open a new incognito/private browser window
2. Go to http://localhost:3000
3. Sign in with: **kingoristephen635@gmail.com**
4. You should see "My Test Workspace" in your workspaces
5. You should see "Test Project" in the projects list

## Expected Results

### After Creating Workspace:
✅ Workspace appears in sidebar
✅ You are set as the owner
✅ You are automatically added as an ADMIN member

### After Creating Project:
✅ Project appears in Projects page
✅ Project shows in Dashboard overview
✅ You are set as the team lead
✅ Project has correct status and priority

### After Inviting Member:
✅ Success toast notification
✅ Email sent to kingoristephen635@gmail.com
✅ Member appears in Team page (if they already have an account)
✅ Email contains workspace details and invitation link

### Email Content Should Include:
✅ Professional HTML template
✅ Workspace name: "My Test Workspace"
✅ Inviter name: Your name from Google account
✅ Role badge: "MEMBER" or "ADMIN"
✅ "Accept Invitation" button linking to http://localhost:3000/login

## Troubleshooting

### If Project Creation Fails:
1. Check browser console (F12) for errors
2. Verify a workspace is selected
3. Check server logs for errors
4. Ensure all required fields are filled

### If Email Not Received:
1. Check spam/junk folder
2. Verify EMAIL_USER in server/.env is correct
3. Check server logs for email errors
4. Verify app password is correct
5. Wait 1-2 minutes (email delivery can be delayed)

### If Workspace Not Showing:
1. Refresh the page
2. Check if you're logged in
3. Look in the sidebar for workspace selector
4. Check browser console for errors

## Server Logs to Monitor

Watch the terminal running the server for:
- "Google verify endpoint hit" - Login attempt
- "Email sent successfully" - Invitation sent
- Any error messages

## Browser Console Logs

Open browser console (F12) to see:
- "Submitting project:" - When creating project
- "Project created:" - After successful creation
- Any error messages in red

## Success Indicators

✅ **Login**: Redirected to dashboard with welcome message
✅ **Workspace**: Appears in sidebar, can switch between workspaces
✅ **Project**: Shows in projects list with correct details
✅ **Invitation**: Success message + email received
✅ **Team Page**: Shows invited member with correct role

## Current Configuration

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **MongoDB**: Connected to Atlas
- **Email**: kingscreationagency635@gmail.com
- **Google OAuth**: Configured and working

Everything is set up and ready to test! 🚀
