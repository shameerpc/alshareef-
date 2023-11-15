const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

// Define the transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

// Function to send a welcome email
exports.sendWelcomeEmail = async (user) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: user.email, 
            subject: 'Welcome to our platform!',
            text: `Welcome, ${user.username}! Thank you for joining our platform.your password is ${user.password}`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Email could not be sent:', error);
    }
};


