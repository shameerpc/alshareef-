var nodemailer = require('nodemailer');
// email sender function
exports.sendEmail = function(req, res){
    // define the transporter
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'shamseerpcshan@gmail.com',
            pass: 'shaMSEERPC'
        }
    });

    // Define the email
    var mailOptions = {
        from: 'shamseerpcshan@gmail.com',
        to: 'keralatechvlog@gmail.com',
        subject: 'Subject',
        text: 'Email content'
    };

    // We send the email
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.send(500, err.message);
        } else {
            console.log("Email sent");
            res.status(200).jsonp(req.body);
        }
    });
};