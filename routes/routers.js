const express = require('express');
const router = express.Router();
const {
  getIndex,
  getAbout,
  getContact,
  getPost1,
  getPost2,
  getPost3,
} = require('../controllers/routersController');
const { postContact } = require('../controllers/postContactController');
const { body, validationResult } = require('express-validator');

router.get('/', getIndex);
router.get('/index', getIndex);
router.get('/about', getAbout);
router.get('/post1', getPost1);
router.get('/post2', getPost2);
router.get('/post3', getPost3);
router.get('/contact', getContact);
router.post(
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
  postContact
);

module.exports = router;
