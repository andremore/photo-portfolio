const express = require('express');

module.exports = (() => {
    const route = express();
    const transport = require('../configs/email/email.js');

    route.use(express.json());

    route.post('/contact', (req, res, next) => {
        const { name, email, subject, message } = req.body;

        const mailOptions = {
            from: email,
            to: email,
            subject: subject,
            text: 'Name: ' + name + ' ' + 'Message: ' + message,
        };

        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Message sent: %s', info.messageId);
            }
        });
    });

    return route;
})();
