import express from 'express';
import Workspace from '../models/Workspace.js';
import Project from '../models/Project.js';
import Task from '../models/Task.js';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';
import { sendWorkspaceInvitation } from '../utils/emailService.js';

const router = express.Router();

// @route   GET /api/workspaces
// @desc    Get all workspaces for current user
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const workspaces = await Workspace.find({
            $or: [
                { ownerId: req.user._id },
                { 'members.userId': req.user._id },
            ],
        })
            .populate('ownerId', 'name email image')
            .populate('members.userId', 'name email image');

        // Get projects and tasks for each workspace
        const workspacesWithData = await Promise.all(
            workspaces.map(async (workspace) => {
                const projects = await Project.find({ workspaceId: workspace._id })
                    .populate('team_lead', 'name email image')
                    .populate('members.userId', 'name email image');

                const projectsWithTasks = await Promise.all(
                    projects.map(async (project) => {
                        const tasks = await Task.find({ projectId: project._id })
                            .populate('assigneeId', 'name email image');

                        return {
                            ...project.toObject(),
                            tasks,
                        };
                    })
                );

                return {
                    ...workspace.toObject(),
                    projects: projectsWithTasks,
                };
            })
        );

        res.json({ success: true, workspaces: workspacesWithData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/workspaces
// @desc    Create new workspace
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const { name, description, image_url } = req.body;

        const slug = name.toLowerCase().replace(/\s+/g, '-');

        const workspace = await Workspace.create({
            name,
            slug,
            description,
            image_url,
            ownerId: req.user._id,
            members: [
                {
                    userId: req.user._id,
                    role: 'ADMIN',
                },
            ],
        });

        const populatedWorkspace = await Workspace.findById(workspace._id)
            .populate('ownerId', 'name email image')
            .populate('members.userId', 'name email image');

        res.status(201).json({ success: true, workspace: populatedWorkspace });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/workspaces/:id/invite
// @desc    Invite member to workspace
// @access  Private
router.post('/:id/invite', protect, async (req, res) => {
    try {
        const { email, role } = req.body;
        const workspaceId = req.params.id;

        // Validate role
        if (!['ADMIN', 'MEMBER'].includes(role)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid role. Must be ADMIN or MEMBER' 
            });
        }

        // Get workspace
        const workspace = await Workspace.findById(workspaceId)
            .populate('ownerId', 'name email');

        if (!workspace) {
            return res.status(404).json({ 
                success: false, 
                message: 'Workspace not found' 
            });
        }

        // Check if user has permission to invite (must be owner or admin)
        const userMember = workspace.members.find(
            m => m.userId.toString() === req.user._id.toString()
        );
        
        if (workspace.ownerId._id.toString() !== req.user._id.toString() && 
            (!userMember || userMember.role !== 'ADMIN')) {
            return res.status(403).json({ 
                success: false, 
                message: 'Only workspace owner or admins can invite members' 
            });
        }

        // Check if user exists
        let invitedUser = await User.findOne({ email });

        // Check if already a member
        if (invitedUser) {
            const isMember = workspace.members.some(
                m => m.userId.toString() === invitedUser._id.toString()
            );
            
            if (isMember) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'User is already a member of this workspace' 
                });
            }

            // Add user to workspace
            workspace.members.push({
                userId: invitedUser._id,
                role: role,
            });

            await workspace.save();
        }

        // Send invitation email
        try {
            await sendWorkspaceInvitation({
                recipientEmail: email,
                recipientName: invitedUser?.name || email.split('@')[0],
                workspaceName: workspace.name,
                inviterName: req.user.name,
                role: role,
            });

            res.json({ 
                success: true, 
                message: invitedUser 
                    ? 'User added to workspace and invitation email sent'
                    : 'Invitation email sent. User will be added when they sign up',
                userAdded: !!invitedUser
            });
        } catch (emailError) {
            console.error('Email error:', emailError);
            
            if (invitedUser) {
                res.json({ 
                    success: true, 
                    message: 'User added to workspace, but email failed to send',
                    userAdded: true
                });
            } else {
                res.status(500).json({ 
                    success: false, 
                    message: 'Failed to send invitation email' 
                });
            }
        }
    } catch (error) {
        console.error('Invite error:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
});

export default router;
