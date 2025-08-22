const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

const sendMail = (options) => new Promise((resolve, reject) => {
  transporter.sendMail(options, (err, info) => {
    if (err) return reject(err);
    resolve(info);
  });
});

module.exports = { sendMail };
