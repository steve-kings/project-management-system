import mongoose from 'mongoose';

const workspaceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
        },
        settings: {
            type: Object,
            default: {},
        },
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        image_url: {
            type: String,
            default: '',
        },
        members: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
                role: {
                    type: String,
                    enum: ['ADMIN', 'MEMBER'],
                    default: 'MEMBER',
                },
                message: {
                    type: String,
                    default: '',
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Workspace = mongoose.model('Workspace', workspaceSchema);

export default Workspace;
