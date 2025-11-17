import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/User.js';
import Workspace from './models/Workspace.js';
import Project from './models/Project.js';
import { sendWorkspaceInvitation } from './utils/emailService.js';

dotenv.config();

// Connect to MongoDB
await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

console.log('✅ Connected to MongoDB\n');

// Test workflow
async function runTestWorkflow() {
    try {
        // 1. Create or find primary user
        console.log('📝 Step 1: Creating/Finding Primary User...');
        let primaryUser = await User.findOne({ email: 'kingscreationagency635@gmail.com' });
        
        if (!primaryUser) {
            primaryUser = await User.create({
                email: 'kingscreationagency635@gmail.com',
                name: 'Kings Creation Agency',
                googleId: 'test_google_id_' + Date.now(),
                image: 'https://ui-avatars.com/api/?name=Kings+Creation',
            });
            console.log('✅ Primary user created:', primaryUser.email);
        } else {
            console.log('✅ Primary user found:', primaryUser.email);
        }

        // 2. Create workspace
        console.log('\n📝 Step 2: Creating Workspace...');
        const workspace = await Workspace.create({
            name: 'Test Workspace',
            slug: 'test-workspace-' + Date.now(),
            description: 'This is a test workspace created via script',
            ownerId: primaryUser._id,
            members: [
                {
                    userId: primaryUser._id,
                    role: 'ADMIN',
                },
            ],
        });
        console.log('✅ Workspace created:', workspace.name);
        console.log('   ID:', workspace._id);
        console.log('   Owner:', primaryUser.email);

        // 3. Create project
        console.log('\n📝 Step 3: Creating Project...');
        const project = await Project.create({
            name: 'Test Project',
            description: 'This is a test project created via script',
            status: 'ACTIVE',
            priority: 'HIGH',
            start_date: new Date(),
            end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
            team_lead: primaryUser._id,
            workspaceId: workspace._id,
            members: [
                {
                    userId: primaryUser._id,
                },
            ],
        });
        console.log('✅ Project created:', project.name);
        console.log('   ID:', project._id);
        console.log('   Status:', project.status);
        console.log('   Priority:', project.priority);
        console.log('   Team Lead:', primaryUser.email);

        // 4. Send invitation email
        console.log('\n📝 Step 4: Sending Invitation Email...');
        const invitedEmail = 'kingoristephen635@gmail.com';
        
        try {
            await sendWorkspaceInvitation({
                recipientEmail: invitedEmail,
                recipientName: 'Stephen',
                workspaceName: workspace.name,
                inviterName: primaryUser.name,
                role: 'MEMBER',
            });
            console.log('✅ Invitation email sent to:', invitedEmail);
            console.log('   Workspace:', workspace.name);
            console.log('   Role: MEMBER');
        } catch (emailError) {
            console.error('❌ Failed to send email:', emailError.message);
        }

        // 5. Display summary
        console.log('\n' + '='.repeat(60));
        console.log('🎉 TEST WORKFLOW COMPLETED SUCCESSFULLY!');
        console.log('='.repeat(60));
        console.log('\n📊 Summary:');
        console.log('   Primary User:', primaryUser.email);
        console.log('   Workspace:', workspace.name);
        console.log('   Project:', project.name);
        console.log('   Invited User:', invitedEmail);
        console.log('\n📧 Check email inbox for:', invitedEmail);
        console.log('   Subject: "You\'ve been invited to join', workspace.name + '"');
        console.log('\n🌐 Access the app at: http://localhost:3000');
        console.log('   Login with: kingscreationagency635@gmail.com');
        console.log('\n' + '='.repeat(60));

    } catch (error) {
        console.error('\n❌ Error during test workflow:', error);
        throw error;
    }
}

// Run the workflow
runTestWorkflow()
    .then(() => {
        console.log('\n✅ Script completed successfully');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n❌ Script failed:', error);
        process.exit(1);
    });
