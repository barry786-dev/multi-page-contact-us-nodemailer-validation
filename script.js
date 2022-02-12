require('dotenv').config();
const { log } = require('console');
const emailSender = require('./models/emailSender');
const express = require('express');
const path = require('path');
const { body, validationResult } = require('express-validator');
const fetch = require('node-fetch');

const app = express();
app.set('port', process.env.PORT || 3000);
// add middleware to get the data using post request
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//set and use ejs as view engine
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'views')));
//set public folder path
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/ejs')));

/*Routering begin */
app.get('/', (req, res) => {
  res.render('index');
});
app.get('/index', (req, res) => {
  res.render('index');
});
app.get('/about', (req, res) => {
  res.render('about');
});
/* app.post('/submited', (req, res) => {
  res.render('submited');
}); */
app.get('/contact', (req, res) => {
  res.render('contact', { sitKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY });
});
app.post(
  '/contact/:captcharesponse',
  body('email').isEmail().normalizeEmail(),
  body('firstName')
    .isLength({
      min: 3,
      max: 20,
    })
    .notEmpty(),
  body('lastName')
    .isLength({
      min: 3,
      max: 20,
    })
    .notEmpty(),
  body('subject')
    .isLength({
      max: 2000,
    })
    .notEmpty(),
  async (req, res) => {
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
      return res.render('errorSubmited',{captcha:'you must check in reCAPTCHA I am not a robot'});
    }
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
      return res.render('errorSubmited', {
        captcha: 'Some Enterd Data was WRONG',
      });
      //return res.json({'success':false, 'msg':'Please select captcha'})
      /* return res.status(400).json({
        success: false,
        errors: errors.array(),
      }); */
    }
    console.log('hallo');
    emailSender.sendEmail(req.body, (data) => {
      console.log(data);
      //res.render('submited');
      //res.json(data);
    });
    //res.json('hghg');
    res.render('submited');
  }
);
app.get('/post1', (req, res) => {
  res.render('post1');
});
app.get('/post2', (req, res) => {
  res.render('post2');
});
app.get('/post3', (req, res) => {
  res.render('post3');
});
/*Routering end */
app.listen(app.get('port'), () => {
  log(`The application is running on port ${app.get('port')}`);
});