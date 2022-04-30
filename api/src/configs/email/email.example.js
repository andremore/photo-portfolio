const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: '<MAILTRAP USER CODE>',
        pass: '<MAILTRAP PASS CODE>',
    },
});

module.exports = transport;
