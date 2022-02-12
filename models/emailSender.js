const nodemailer = require('nodemailer');
require('dotenv').config();

// creat transporter object which containes the email host configration

const transporter = nodemailer.createTransport({
  //host: 'smtp-mail.outlook.com',
  //service: 'outlook',
  service: 'yahoo',
  //secureConnection: false,
  //port: '587',
  //secure: true,
  auth: {
    //type: 'OAuth2',
    user: 'mbrsyr@yahoo.com',
    pass: process.env.APP_EMAIL_PASSWORD,
  },
  //tls: {
  //ciphers: 'SSLv3',
  //rejectUnauthorized: false,
  //},
});
//salimbarry304
function sendEmail(emailData, cb) {
  const mailOption = {
    from: 'mbrsyr@yahoo.com',
    to: 'mawlana133@gmail.com',
    subject: 'email from your website',
    html: `
      <h1>email from contact page in your web site</h1>
      <p><strong>Name:</strong> ${emailData.firstname}</p>
      <p><strong>Name:</strong> ${emailData.lastname}</p>
      <p><strong>email:</strong> ${emailData['e-mail']}</p>
      <p>${emailData.subject}</p>
      `,
  };
  transporter.sendMail(mailOption, (err, info) => {
    //console.log(info);
    if (err) {
      cb({ result: 'error' });
      //console.log(err);
    } else {
      console.log('Sent:' + info.response);
      cb({ result: 'success' });
    }
  });
}
module.exports = { sendEmail };
