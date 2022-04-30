const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: '0e13f442c95b0f',
        pass: '3eb96530b36c98',
    },
});

module.exports = transport;
