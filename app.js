require('dotenv').config();
const { log } = require('console');
const express = require('express');
const path = require('path');
const router = require('./routes/routers');

const app = express();
app.set('port', process.env.PORT || 3000);
// add middleware to get the data using post request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//set and use ejs as view engine
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'views')));
//set public folder path
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/ejs')));


app.use(router);

app.listen(app.get('port'), () => {
  log(`The application is running on port ${app.get('port')}`);
});
