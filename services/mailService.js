const nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "450b140558be89",
      pass: "c4ff97a7c02093"
    }
  });

let mailOptions = {
    from: 'vipitha.seeroo@yopmail.com',
    to: 'sarath@yopmail.com',
    subject: 'Test email',
    text: 'This is a test email from Node.js using Node Mailer!'
};

exports.sendMail =
    transport.sendMail(mailOptions, async (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

