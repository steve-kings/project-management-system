import dotenv from 'dotenv';
import { sendWorkspaceInvitation } from './utils/emailService.js';

dotenv.config();

console.log('📧 Testing Email System...\n');
console.log('From:', process.env.EMAIL_USER);
console.log('To: kingoristephen635@gmail.com\n');

async function testEmail() {
    try {
        const result = await sendWorkspaceInvitation({
            recipientEmail: 'kingoristephen635@gmail.com',
            recipientName: 'Stephen',
            workspaceName: 'Test Workspace',
            inviterName: 'Kings Creation Agency',
            role: 'MEMBER',
        });

        console.log('✅ Email sent successfully!');
        console.log('Message ID:', result.messageId);
        console.log('\n📬 Check the inbox for: kingoristephen635@gmail.com');
        console.log('Subject: "You\'ve been invited to join Test Workspace"');
        console.log('\n' + '='.repeat(60));
        console.log('✅ Email system is working correctly!');
        console.log('='.repeat(60));
    } catch (error) {
        console.error('\n❌ Email failed to send:');
        console.error('Error:', error.message);
        console.error('\nPossible issues:');
        console.error('1. Check EMAIL_USER is correct in server/.env');
        console.error('2. Verify EMAIL_APP_PASSWORD is correct');
        console.error('3. Ensure 2-Step Verification is enabled on Gmail');
        console.error('4. Check if app password is still valid');
        console.error('\nCurrent config:');
        console.error('EMAIL_USER:', process.env.EMAIL_USER);
        console.error('EMAIL_APP_PASSWORD:', process.env.EMAIL_APP_PASSWORD ? '****' + process.env.EMAIL_APP_PASSWORD.slice(-4) : 'NOT SET');
    }
}

testEmail()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error('Script error:', error);
        process.exit(1);
    });
