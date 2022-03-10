
# What is this project about?
- The main purposes of this project are:
    * Use the knowledge that you got in **Backend**.
    * to understand the functionality of **POST** and **GET** methods and the difference between using them to deal with **FORM** data like **CONTACT** FORM as an example, either from the **HTML** FORM directly or from the **JS** side.
    * understand **EJS** technics and how to use `render()` method from **Backend** as well as from **Frontend** too.
    * **Validate** data in many ways :
        * From inside **HTML**
        * From **JS Frontend**
        * From **Node Backend**
    * Using **reCAPTCHA** and validate it from **Backend** as well as from **Frontend** too.
    * Using **Nodemailer** to send the form data to the specific email.

- Which packeges and methods we used:
    * "dotenv": "^16.0.0",
    * "ejs": "^3.1.6",
    * "express": "^4.17.2",
    * "express-validator": "^6.14.0",
    * "node-fetch": "2.0",
    * "nodemailer": "^6.7.2"
    * reCAPTCHA : "v2 Checkbox"
    * async await fetch
    * HTML attributes
    * Call back funcions
    * response & requests
    * URL parameters
    * e.keyCode
    * encodeURI()
    * ejs.render()
    * document. methods


## what you need to understand here about using POST method?
Resource [Stackoverflow](https://stackoverflow.com/questions/58230804/what-is-the-difference-between-post-api-call-and-form-submission-with-post-metho).

**There are multiple ways to submit a form from the browser:**

*#1-* HTML form, submit button, user presses submit button, no Javascript involved.

*#2-* HTML form in the page, Javascript gets DOM element for the form and calls .submit() method on the form object.

*#3-* Ajax call using the **XMLHttpRequest** interface with the POST method and manually sending appropriate form data.

*#4-* Ajax **Fetch** call with the POST method and manually sending appropriate form data.

- I do not prefer using the third way

**You need to notice here:**

With #1 or #2, the browser sends the form and the browser will pay attention to redirects and will display the form response (whether redirected or not) in the browser.

With #3 and #4, the form is sent via Javascript and the response comes back to your Javascript. #3 does not process redirects. #4 has an option to process redirects. Here's more info on each of the above options. #3 and #4 do not affect the browser display is not affected at all unless you program your own Javascript to process the request and affect the browser display (either by inserting content or setting ```window.location``` to a new URL.

> Programmatic Ajax calls with XMLHttpRequest do not process redirects or the response from the Ajax call in any way. They just return that response to YOUR Javascript. Keep in mind that a redirect is just one specific type of response you can get back from an Ajax call. This is different than a browser submitted form POST.

> Programmatic Ajax calls with the ```fetch()``` interface offer an option to follow redirects automatically. See the ```redirect``` option [here](https://developer.mozilla.org/en-US/docs/Web/API/fetch). But, even in this case, all the fetch() interface does is get the contents of the redirected URL. It does not cause the browser page to change. To so that, you would have to write your own Javascript code to either see the 3xx redirect response and then set ```window.location``` to the new redirect URL. Or, you would have to let the interface follow the redirect automatically and then do something with the new redirected content that it will return to your Javascript.

> These programmatic requests different than letting the browser submit a form for you. In the browser submitted case (without using Javascript to submit the form), the browser follows redirects and updates the display in the browser based on whatever content is returned from the form response.

> When you submit a form via Ajax, the browser does nothing automatically with the server response. That response goes back to your Javascript and your script decides what to do with it. If you want your script to follow redirects, then you have to examine the response, see if it's a 3xx status, get the new URL from the appropriate header and set window.location to that new URL. That will then cause the browser to display the redirect page. But, you have to either program that yourself or find an Ajax library that offers a feature to do it form. A standard Ajax call just returns the form POST response back to your Javascript - that's all. Your script has to process that response and decide what to do next.

## Ajax "Asynchronous JavaScript and XML"
[Wiki - Ajax](https://en.wikipedia.org/wiki/Ajax_(programming))
> Ajax is not a technology, but rather a programming concept. HTML and CSS can be used in combination to mark up and style information. The webpage can be modified by JavaScript to dynamically display—and allow the user to interact with the new information. The built-in XMLHttpRequest object is used to execute Ajax on webpages, allowing websites to load content onto the screen without refreshing the page. Ajax is not a new technology, nor is it a new language. Instead, it is existing technologies used in a new way.

![Ajax vs Conventional](/public/images/Ajax-vergleich-en.svg.png)

# What if you want to use fetch but still you want to redierect or render EJS file from front end.
- Is it possible to render EJS from front end?

> YES

- How EJS doing the work?
> The EJS file will be compiled into HTML and returned to the front end. the back end will render the EJS + frontEnd framework.

- What if I sent EJS file as response to front end, how to render it?

    1- Add this script to your contct page ejs file `<script src="ejs.js"></script>`

    2- be sure that your back end will allow access to ejs.js `app.use(express.static(path.join(__dirname, 'node_modules/ejs')));`

    3- send the **EJS** page which you want render as response from the **back end** to the fetch in **front end**. inside your `App.post('',(req,res)={})` router of the contact page , here is the response as example `res.render('submited.ejs');`

    4- In the **front end** use the response inside fetch to convert it to **text** then render it using **EJS render method** and assign after that to your page **innerHTML**.`const answer = await response.text();
    document.body.innerHTML = ejs.render(answer);`

    > I used the above way to show **success and error messeges** to the user which sending from back end to front end 

---

## `e.preventDefault()`
- what is going on?

If you decide to submit the FORM DATA using fetch with POST method, then you need to be sure that you need to prevent the normal behavior of ***HTML*** FORM.

- Where is the problem?

Using `preventDefault()` will not only prevent the page to refresh which maybe usually that what do you want even, BUT it will block all data validation attributes of the **HTML** FORM. elements 
> if you used `preventDefault()` then you have to take care of **FRONT-END** data validation inside your **JS** and to do not miss the nice **friendly** hints which **HTML** FORM validation attributes provide you with it, you need then to build your own hints...OR continue reading for a better solution...

## submit your data form using `document.'yourFormName'.onsubmit`

`<form id="contact-form" name="contactForm">
document.contactForm.onsubmit = async (e) => {
  e.preventDefault();`

  > By using this way you can still have the friendly validation attributes functionality even if you still using `preventDefault()`

## Validate and give friendly hint if the user check **reCAPTCHA** before send the request to back-end.

- #1- Use reCaptcha inside your form like this: `<div style="position: relative">
            <div
              class="g-recaptcha"
              data-sitekey="<%= sitKey %>"
              data-size="visible"
              data-callback="recaptchaCallback"
            ></div>
            <input
              id="recaptcha_check_empty"
              tabindex="-1"
              style="
                width: 50px;
                height: 0;
                opacity: 0;
                pointer-events: none;
                position: absolute;
                bottom: 0;
              "
            />
          </div>`
- #2- Add the call back function in your front end JS, `function recaptchaCallback() {
  document.getElementById('recaptcha_check_empty').required = false;
}`  

## Error messeges Models.
- We create EJS error models to help the user to see proper message of success or fail after submit the form.
  - Success message
  - Failures messages : (We planed for three cases)
    - In case the error happened because of go over **reCaptcha**.
    - In case that the error happened because wrong data entries.
    - In case the failure was NOT from the user side but from the **server** side.
> We planned to let the **USER** be sure about if his/her form submit **Success** OR **Not**, and where was the failure in the case of fail

# What did we try inside our CSS?

- We creat very simple responsive css to style the last HTML pages without using any flexbox or grid by only playing arround with `@media` and avoid `Pixel(PX)` unit 
- Create an `index.html` page and a `posts` directory containing blog posts
- Create a `images` directory containing images and `font` directory containing fonts
- we used mostly Measurement units `vw, vh, rem ,em` instead of `px` as much as we can so the sizes of the page elements respond according to the size of each other.
- we considered the screen resolution by using `@media ` so the font and margins will not go very big or very small with big and small monitors.
- we used different `font sizes`for the `headers` and `paragraphes` acoording to their positions in `header` or `main` or `footer`   
> so the last three concepts of sizing the page elements are working together to reach responsive page as much as possible
- we tried to be `semantic` as much as we could we used `body``header``main``footer``section``figure``nav`...etc.
- was difficult to avoid `div's` in the moment.
- we left a lot of `comments` so the one who like to read the code can understand easly what is going.
- we take care for the white spaces brightness in different monitor sizes so it is not so hard for the user ayes.
- we used many kinds of styling mostly in `CSS page` but we used also `inline styling` for simple individual things.
- we used a lot of `classes` in our element selecting.
- we `linked` `fonts``icons`...etc.
- their is always `title`and `icon` for all pages.
- we did not leave any `alt` attribute for any image empty.
- we tried to do not use a lot of `images` only what is enough to to give idea about the text. we avoid in the same time the `media` inside the site, where prefered that the used use our `instagram` or `facebook` links to watch our videos..we will try to link `youtube` later.
- we gives a `titles captions` to the photos. 
- we tried to do not use a lot of `colors` and try to be in harmony with `colors` as much as we can.
- we take care for `margins` and `paddings` spaces between the elements to fit to each other and for all page sizes. 

>this HTML and CSS work here is very simple, it was just a trying to learn how to make friendly UI /UX responsive simple site, without using new technologies
>thank you for your help and notes later.
