import express from 'express';
import Task from '../models/Task.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/tasks
// @desc    Create new task
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const {
            projectId,
            title,
            description,
            status,
            type,
            priority,
            assigneeId,
            due_date,
        } = req.body;

        const task = await Task.create({
            projectId,
            title,
            description,
            status,
            type,
            priority,
            assigneeId,
            due_date,
        });

        const populatedTask = await Task.findById(task._id).populate(
            'assigneeId',
            'name email image'
        );

        // Emit Socket.IO event
        const io = req.app.get('io');
        const Project = (await import('../models/Project.js')).default;
        const project = await Project.findById(projectId);
        if (project) {
            io.to(`workspace-${project.workspaceId}`).emit('task-created', populatedTask);
        }

        res.status(201).json({ success: true, task: populatedTask });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT /api/tasks/:id
// @desc    Update task
// @access  Private
router.put('/:id', protect, async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        }).populate('assigneeId', 'name email image');

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Emit Socket.IO event
        const io = req.app.get('io');
        const project = await import('../models/Project.js').then(m => m.default.findById(task.projectId));
        if (project) {
            io.to(`workspace-${project.workspaceId}`).emit('task-updated', task);
        }

        res.json({ success: true, task });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   DELETE /api/tasks
// @desc    Delete multiple tasks
// @access  Private
router.delete('/', protect, async (req, res) => {
    try {
        const { taskIds } = req.body;

        // Get tasks before deletion to emit events
        const tasks = await Task.find({ _id: { $in: taskIds } });
        
        await Task.deleteMany({ _id: { $in: taskIds } });

        // Emit Socket.IO event
        const io = req.app.get('io');
        const Project = (await import('../models/Project.js')).default;
        for (const task of tasks) {
            const project = await Project.findById(task.projectId);
            if (project) {
                io.to(`workspace-${project.workspaceId}`).emit('task-deleted', { taskIds });
                break; // Only emit once per workspace
            }
        }

        res.json({ success: true, message: 'Tasks deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/tasks/:id/comments
// @desc    Add comment to task
// @access  Private
router.post('/:id/comments', protect, async (req, res) => {
    try {
        const { content } = req.body;

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.comments.push({
            userId: req.user._id,
            content,
        });

        await task.save();

        const populatedTask = await Task.findById(task._id)
            .populate('assigneeId', 'name email image')
            .populate('comments.userId', 'name email image');

        res.json({ success: true, task: populatedTask });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
