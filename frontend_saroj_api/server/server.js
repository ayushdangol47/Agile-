const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const consign = require("consign");
//var engine = require('ejs-mate');
const authvalidation = require('./middlewares/auth.validation');
const errorHandler = require("./middlewares/error-handler");

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(cors());

// use JWT auth to secure the api
app.use(authvalidation.checkToken);

consign()
  .include("./routes")
  .into(app);

// error handler
app.use(errorHandler);

module.exports = app;
