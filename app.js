var createError = require('http-errors');
var express = require('express');
const db = require("./models");
db.sequelize.sync();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var departmentsRouter = require('./routes/departments');
var categoriesRouter = require('./routes/categories');
var subcategoriesRouter = require('./routes/subcategories');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/departments', departmentsRouter);
app.use('/categories', categoriesRouter);
app.use('/subcategories', subcategoriesRouter);
// app.use('/uploads', uploadImage);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
