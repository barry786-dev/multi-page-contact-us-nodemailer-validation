const getIndex = (req, res) => {
  res.render('index');
};

const getAbout = (req, res) => {
  res.render('about');
};

const getPost1 = (req, res) => {
  res.render('post1');
};

const getPost2 = (req, res) => {
  res.render('post2');
};
const getPost3 = (req, res) => {
  res.render('post3');
};
const getContact = (req, res) => {
  res.render('contact', {
    sitKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  });
};

module.exports = {
  getIndex,
  getAbout,
  getContact,
  getPost1,
  getPost2,
  getPost3,
};
