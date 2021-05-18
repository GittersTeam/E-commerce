var createError = require('http-errors');
var express = require('express');
const db = require("./models");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var loadenv = require('dotenv').config();
var indexRouter = require('./routes/index');


// connect to database
var cors = require('cors');
var app = express();

app.use(cors());
app.disable('etag');
db.sequelize.sync({})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', indexRouter);
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  next(createError(404));
});

app.get('/*', function(req, res, next){ 
  res.setHeader('Last-Modified', (new Date()).toUTCString());
  next(); 
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;