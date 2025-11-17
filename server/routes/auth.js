import express from 'express';
import passport from 'passport';
import generateToken from '../utils/generateToken.js';
import { protect } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// @route   GET /api/auth/google
// @desc    Initiate Google OAuth
// @access  Public
router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// @route   GET /api/auth/google/callback
// @desc    Google OAuth callback
// @access  Public
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Generate JWT token
        const token = generateToken(req.user._id);

        // Set token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        // Redirect to frontend
        res.redirect(`${process.env.CLIENT_URL}?auth=success`);
    }
);

// @route   POST /api/auth/google/verify
// @desc    Verify Google ID token and login/register user
// @access  Public
router.post('/google/verify', async (req, res) => {
    try {
        console.log('Google verify endpoint hit');
        const { credential } = req.body;

        if (!credential) {
            console.log('No credential provided');
            return res.status(400).json({ 
                success: false, 
                message: 'Google credential is required' 
            });
        }
        
        console.log('Credential received, decoding...');

        // Decode the JWT token (Google ID token)
        const base64Url = credential.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(Buffer.from(base64, 'base64').toString());

        // Verify the token is from Google and not expired
        if (payload.iss !== 'https://accounts.google.com' && payload.iss !== 'accounts.google.com') {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid token issuer' 
            });
        }

        if (payload.exp * 1000 < Date.now()) {
            return res.status(401).json({ 
                success: false, 
                message: 'Token expired' 
            });
        }

        if (payload.aud !== process.env.GOOGLE_CLIENT_ID) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid token audience' 
            });
        }

        // Check if user exists
        let user = await User.findOne({ googleId: payload.sub });

        if (!user) {
            // Check if email already exists
            user = await User.findOne({ email: payload.email });

            if (user) {
                // Link Google account to existing user
                user.googleId = payload.sub;
                user.image = payload.picture || user.image;
                await user.save();
            } else {
                // Create new user
                user = await User.create({
                    googleId: payload.sub,
                    name: payload.name,
                    email: payload.email,
                    image: payload.picture || '',
                });
            }
        }

        // Generate JWT token
        const token = generateToken(user._id);

        // Set token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        res.json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                image: user.image,
            },
        });
    } catch (error) {
        console.error('Google verification error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Authentication failed. Please try again.' 
        });
    }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', protect, async (req, res) => {
    try {
        res.json({
            success: true,
            user: req.user,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', protect, (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.json({ success: true, message: 'Logged out successfully' });
});

export default router;
