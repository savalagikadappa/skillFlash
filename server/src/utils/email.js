const nodemailer = require('nodemailer');

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

if (!emailUser || !emailPass) {
  // eslint-disable-next-line no-console
  console.warn('[email] EMAIL_USER or EMAIL_PASS missing. OTP emails will not be sent.\nSet EMAIL_USER, EMAIL_PASS env vars (Gmail App Password recommended).');
}

let transporter = null;
if (emailUser && emailPass) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: emailUser, pass: emailPass },
  });
}

const sendMail = (options) => new Promise((resolve, reject) => {
  if (!transporter) return reject(new Error('Email not configured'));
  transporter.sendMail(options, (err, info) => {
    if (err) return reject(err);
    resolve(info);
  });
});

module.exports = { sendMail };
