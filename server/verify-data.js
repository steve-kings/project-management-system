import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/User.js';
import Workspace from './models/Workspace.js';
import Project from './models/Project.js';

dotenv.config();

// Connect to MongoDB
await mongoose.connect(process.env.MONGODB_URI);

console.log('✅ Connected to MongoDB\n');

async function verifyData() {
    try {
        // Find user
        const user = await User.findOne({ email: 'kingscreationagency635@gmail.com' });
        console.log('👤 User:', user ? '✅ Found' : '❌ Not found');
        if (user) {
            console.log('   Name:', user.name);
            console.log('   Email:', user.email);
            console.log('   ID:', user._id);
        }

        // Find workspaces
        const workspaces = await Workspace.find({ ownerId: user._id })
            .populate('ownerId', 'name email')
            .populate('members.userId', 'name email');
        
        console.log('\n🏢 Workspaces:', workspaces.length);
        workspaces.forEach((ws, index) => {
            console.log(`\n   Workspace ${index + 1}:`);
            console.log('   Name:', ws.name);
            console.log('   ID:', ws._id);
            console.log('   Owner:', ws.ownerId.email);
            console.log('   Members:', ws.members.length);
            ws.members.forEach((member, i) => {
                console.log(`     ${i + 1}. ${member.userId.email} (${member.role})`);
            });
        });

        // Find projects
        if (workspaces.length > 0) {
            const projects = await Project.find({ workspaceId: workspaces[0]._id })
                .populate('team_lead', 'name email')
                .populate('members.userId', 'name email');
            
            console.log('\n📋 Projects:', projects.length);
            projects.forEach((proj, index) => {
                console.log(`\n   Project ${index + 1}:`);
                console.log('   Name:', proj.name);
                console.log('   ID:', proj._id);
                console.log('   Status:', proj.status);
                console.log('   Priority:', proj.priority);
                console.log('   Team Lead:', proj.team_lead.email);
                console.log('   Start Date:', proj.start_date?.toLocaleDateString());
                console.log('   End Date:', proj.end_date?.toLocaleDateString());
            });
        }

        console.log('\n' + '='.repeat(60));
        console.log('✅ Data verification complete!');
        console.log('='.repeat(60));
        console.log('\n🌐 You can now login at: http://localhost:3000');
        console.log('   Email: kingscreationagency635@gmail.com');
        console.log('\n📝 The workspace and project are ready to use!');
        console.log('='.repeat(60));

    } catch (error) {
        console.error('❌ Error:', error);
        throw error;
    }
}

verifyData()
    .then(() => {
        process.exit(0);
    })
    .catch((error) => {
        console.error('Script failed:', error);
        process.exit(1);
    });
