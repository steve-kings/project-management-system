# Email Invitation Setup Guide

This guide explains how the email invitation system works and how to configure it.

## Features

- Send email invitations to workspace members
- Invite users as ADMIN or MEMBER
- Beautiful HTML email templates
- Automatic user addition if they already have an account
- Invitation emails for users who haven't signed up yet

## Configuration

### Environment Variables

The email system is already configured in `server/.env`:

```env
EMAIL_USER=your_email@gmail.com
EMAIL_APP_PASSWORD=sekp srby emfl pzks
```

**Important:** Replace `your_email@gmail.com` with your actual Gmail address.

### How to Get Gmail App Password

Your app password is already set up: `sekp srby emfl pzks`

If you need to create a new one:
1. Go to your Google Account settings
2. Navigate to Security > 2-Step Verification
3. Scroll down to "App passwords"
4. Generate a new app password for "Mail"
5. Copy the 16-character password (spaces will be removed automatically)

## API Endpoint

### Invite Member to Workspace

**POST** `/api/workspaces/:id/invite`

**Headers:**
- Cookie with authentication token (automatic)

**Body:**
```json
{
  "email": "colleague@example.com",
  "role": "MEMBER"  // or "ADMIN"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User added to workspace and invitation email sent",
  "userAdded": true
}
```

## Usage in Frontend

### Import the Component

```javascript
import InviteMemberDialog from '../components/InviteMemberDialog';
```

### Use in Your Component

```javascript
const [showInviteDialog, setShowInviteDialog] = useState(false);

// In your JSX
<button onClick={() => setShowInviteDialog(true)}>
  Invite Member
</button>

<InviteMemberDialog
  isOpen={showInviteDialog}
  onClose={() => setShowInviteDialog(false)}
  workspaceId={workspace._id}
  workspaceName={workspace.name}
/>
```

## Email Templates

### Workspace Invitation Email

The email includes:
- Personalized greeting
- Workspace name
- Role badge (ADMIN/MEMBER)
- Call-to-action button
- Professional styling with gradients

### Project Invitation Email

Similar template for project invitations (can be extended).

## Testing

To test the email system:

1. Make sure your server is running
2. Sign in to the application
3. Create or select a workspace
4. Click "Invite Member"
5. Enter an email address and select a role
6. Click "Send Invitation"
7. Check the recipient's inbox

## Troubleshooting

### Email not sending

1. **Check Gmail credentials:**
   - Verify `EMAIL_USER` is your correct Gmail address
   - Verify `EMAIL_APP_PASSWORD` is correct (no spaces needed)

2. **Check 2-Step Verification:**
   - App passwords only work with 2-Step Verification enabled
   - Go to Google Account > Security to enable it

3. **Check server logs:**
   - Look for error messages in the terminal
   - Common errors: authentication failed, connection timeout

4. **Test with a simple script:**
   ```bash
   cd server
   node -e "import('./utils/emailService.js').then(m => m.sendWorkspaceInvitation({recipientEmail:'test@example.com',recipientName:'Test',workspaceName:'Test',inviterName:'You',role:'MEMBER'}))"
   ```

### Email goes to spam

- Ask recipients to check their spam folder
- Add your domain to SPF records (for production)
- Use a custom domain email (for production)

## Security Notes

- App passwords are stored in `.env` (not committed to git)
- Emails are sent over secure connection (TLS)
- Only workspace owners and admins can invite members
- Email addresses are validated before sending

## Future Enhancements

- [ ] Email templates for task assignments
- [ ] Email notifications for project updates
- [ ] Customizable email templates
- [ ] Email preferences per user
- [ ] Batch invitations
- [ ] Invitation expiry links
