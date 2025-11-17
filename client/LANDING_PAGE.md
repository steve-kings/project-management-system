# Landing Page

## Overview
The landing page (`/`) is the first page users see when visiting the application. It showcases the features and benefits of the project management platform.

## Features Highlighted

1. **Task Management** - Create, assign, and track tasks
2. **Team Collaboration** - Real-time collaboration across workspaces
3. **Calendar View** - Visualize project timelines
4. **Analytics Dashboard** - Track project progress
5. **Real-time Updates** - Instant notifications via Socket.IO
6. **Secure Authentication** - Google OAuth integration
7. **Task Comments** - Built-in collaboration features
8. **Email Invitations** - Easy team member management

## Navigation

- **Get Started Button** - Redirects to `/login`
- **Learn More Button** - Scrolls to features section
- **Sign In with Google** - Redirects to `/login`

## Routes

- `/` - Landing page (public)
- `/login` - Login page (public)
- `/dashboard` - Main dashboard (protected)
- `/dashboard/*` - All app routes (protected)

## Styling

The landing page uses:
- Gradient backgrounds (purple to blue)
- Lucide React icons
- Responsive design (mobile-first)
- Smooth scroll behavior
- Hover animations and transitions

## Footer

Includes copyright information and contact details:
- Website: kingscreation.co.ke
- WhatsApp support link
