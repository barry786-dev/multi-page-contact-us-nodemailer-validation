let data = {};
const submitButton = document.querySelector('#submit-btn');
//submitButton.disabled = true;
function collectData(e) {
  if (e.target.name === 'firstname') {
    data = { ...data, firstName: e.target.value };
  } else if (e.target.name === 'lastname') {
    data = { ...data, lastName: e.target.value };
  } else if (e.target.name === 'e-mail') {
    data = { ...data, email: e.target.value };
  } else if (e.target.name === 'subject') {
    data = { ...data, subject: e.target.value };
  }
  /* if (
    data.firstName !== undefined &&
    data.firstName.length > 2 &&
    isNaN(data.firstName) &&
    data.lastName !== undefined &&
    isNaN(data.lastName) &&
    data.lastName.length > 2 &&
    data.email !== undefined &&
    data.subject !== undefined &&
    data.subject !== ''
  ) {
    //submitButton.disabled = false;
  } else {
    //submitButton.disabled = true;
  } */
}

function Check(e) {
  let keyCode = e.keyCode ? e.keyCode : e.which;
  if ((keyCode > 47 && keyCode < 58) || (keyCode > 95 && keyCode < 106)) {
    e.preventDefault();
  }
}
/* if (form.checkValidity()) {
  // submit via XHR etc...
} else {
  // the form is not valid
} */
function recaptchaCallback() {
  document.getElementById('recaptcha_check_empty').required = false;
}
document.contactForm.onsubmit = async (e) => {
  e.preventDefault();
  // get the captch response
  const myForm = document.getElementById('contact-form');
  const formData = new FormData(myForm);
  const captchaRsponse = formData.get('g-recaptcha-response');
  console.log(captchaRsponse);
  try {
    const response = await fetch(
      `/contact${
        captchaRsponse
          ? '/' + encodeURI(captchaRsponse)
          : '/' + encodeURI('123')
      }`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    const answer = await response.text();
    document.body.innerHTML = ejs.render(answer);
    // deal with the answer
    //console.log(answer);
  } catch (error) {
    console.log(error);
  }
};

/* function getFile(U) {
  const X = new XMLHttpRequest();
  X.open('GET', U, false);
  X.send();
  return X.responseText;
}
const submited = getFile('submited.ejs');
const submited = document.getElementById('submitedPage').innerHTML;
document.body.innerHTML = ejs.render(submited);
location.assign('/submited'); */
