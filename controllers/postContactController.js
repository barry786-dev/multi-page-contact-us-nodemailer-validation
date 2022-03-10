const emailSender = require('../models/emailSender');
const fetch = require('node-fetch');
const {validationResult } = require('express-validator');

const postContact = async (req, res) => {
  console.log(req.body);
  //console.log(req.params)
  //verify the captcha first
  const captchaVerified = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=6Lfgw3IeAAAAAHA2WsiZx0XNBNhMS2EntaaEJ5o0&response=${req.params.captcharesponse}`,
    {
      method: 'POST',
    }
  ).then((_res) => _res.json());
  if (captchaVerified.success === false) {
    return res.render('errorSubmited', {
      errMsg: 'you must check in reCAPTCHA I am not a robot',
    });
  }
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.render('errorSubmited', {
      errMsg: 'Some Enterd Data was WRONG',
    });
    //return res.json({'success':false, 'msg':'Please select captcha'})
    /* return res.status(400).json({
        success: false,
        errors: errors.array(),
      }); */
  }
  console.log('hallo');
  emailSender.sendEmail(req.body, (data) => {
    if (data.result === 'success') {
      res.render('submited');
    } else {
      res.render('errorSubmited', {
        errMsg:
          'Problem in Email sending from the company side please send email to mbrsyr@yahoo.com, or call our customer support at : +49 157-8444-6611',
      });
    }
    console.log(data);
    //res.render('submited');
    //res.json(data);
  });
  //res.json('hghg');
};

/* const postContact = (req, res) => {
  console.log(req.body);
  emailSender
    .sendEmail(req.body)
    .then((info) => {
      console.log(info);
      res.json({ result: 'done' });
    })
    .catch((error) => {
      console.log(error);
      res.json({ result: 'error' });
    });
}; */

module.exports = {postContact}
