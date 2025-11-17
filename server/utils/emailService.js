import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_APP_PASSWORD.replace(/\s/g, ''), // Remove spaces
        },
    });
};

// Send workspace invitation email
export const sendWorkspaceInvitation = async ({ 
    recipientEmail, 
    recipientName, 
    workspaceName, 
    inviterName, 
    role 
}) => {
    try {
        const transporter = createTransporter();

        const mailOptions = {
            from: `"${process.env.EMAIL_USER.split('@')[0]}" <${process.env.EMAIL_USER}>`,
            to: recipientEmail,
            subject: `You've been invited to join ${workspaceName}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                        .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
                        .role-badge { display: inline-block; background: #10b981; color: white; padding: 5px 15px; border-radius: 20px; font-size: 14px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🎉 Workspace Invitation</h1>
                        </div>
                        <div class="content">
                            <p>Hi ${recipientName || 'there'},</p>
                            
                            <p><strong>${inviterName}</strong> has invited you to join the workspace:</p>
                            
                            <h2 style="color: #667eea; margin: 20px 0;">${workspaceName}</h2>
                            
                            <p>You've been invited as: <span class="role-badge">${role.toUpperCase()}</span></p>
                            
                            <p>Click the button below to accept the invitation and start collaborating:</p>
                            
                            <div style="text-align: center;">
                                <a href="${process.env.CLIENT_URL}/login" class="button">Accept Invitation</a>
                            </div>
                            
                            <p style="margin-top: 30px; color: #666; font-size: 14px;">
                                If you don't have an account yet, you'll be able to sign up using Google Sign-In.
                            </p>
                        </div>
                        <div class="footer">
                            <p>This invitation was sent from Project Management App</p>
                            <p>If you didn't expect this invitation, you can safely ignore this email.</p>
                            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                            <p style="margin: 5px 0;">© ${new Date().getFullYear()} <a href="https://kingscreation.co.ke" style="color: #667eea; text-decoration: none;">kingscreation.co.ke</a></p>
                            <p style="margin: 5px 0;">WhatsApp: <a href="https://wa.me/[PHONE_NUMBER]" style="color: #25D366; text-decoration: none;">[PHONE_NUMBER]</a></p>
                        </div>
                    </div>
                </body>
                </html>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send invitation email');
    }
};

// Send project invitation email
export const sendProjectInvitation = async ({ 
    recipientEmail, 
    recipientName, 
    projectName, 
    workspaceName,
    inviterName 
}) => {
    try {
        const transporter = createTransporter();

        const mailOptions = {
            from: `"${process.env.EMAIL_USER.split('@')[0]}" <${process.env.EMAIL_USER}>`,
            to: recipientEmail,
            subject: `You've been added to ${projectName}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                        .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>📋 Project Invitation</h1>
                        </div>
                        <div class="content">
                            <p>Hi ${recipientName || 'there'},</p>
                            
                            <p><strong>${inviterName}</strong> has added you to a project:</p>
                            
                            <h2 style="color: #3b82f6; margin: 20px 0;">${projectName}</h2>
                            
                            <p>Workspace: <strong>${workspaceName}</strong></p>
                            
                            <p>You can now view and collaborate on this project.</p>
                            
                            <div style="text-align: center;">
                                <a href="${process.env.CLIENT_URL}/login" class="button">View Project</a>
                            </div>
                        </div>
                        <div class="footer">
                            <p>This notification was sent from Project Management App</p>
                            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                            <p style="margin: 5px 0;">© ${new Date().getFullYear()} <a href="https://kingscreation.co.ke" style="color: #3b82f6; text-decoration: none;">kingscreation.co.ke</a></p>
                            <p style="margin: 5px 0;">WhatsApp: <a href="https://wa.me/[PHONE_NUMBER]" style="color: #25D366; text-decoration: none;">[PHONE_NUMBER]</a></p>
                        </div>
                    </div>
                </body>
                </html>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send project invitation email');
    }
};
