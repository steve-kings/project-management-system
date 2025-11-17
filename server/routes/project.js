import express from 'express';
import Project from '../models/Project.js';
import Task from '../models/Task.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/projects
// @desc    Create new project
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const {
            name,
            description,
            priority,
            status,
            start_date,
            end_date,
            team_lead,
            workspaceId,
            team_members,
        } = req.body;

        const members = team_members?.map((userId) => ({ userId })) || [];

        const project = await Project.create({
            name,
            description,
            priority,
            status,
            start_date,
            end_date,
            team_lead: team_lead || req.user._id,
            workspaceId,
            members,
        });

        const populatedProject = await Project.findById(project._id)
            .populate('team_lead', 'name email image')
            .populate('members.userId', 'name email image');

        res.status(201).json({ success: true, project: populatedProject });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Private
router.put('/:id', protect, async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )
            .populate('team_lead', 'name email image')
            .populate('members.userId', 'name email image');

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json({ success: true, project });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   DELETE /api/projects/:id
// @desc    Delete project
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Delete all tasks associated with project
        await Task.deleteMany({ projectId: req.params.id });

        await project.deleteOne();

        res.json({ success: true, message: 'Project deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
