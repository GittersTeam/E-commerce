var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var loadenv = require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users/users');
var customerRouter = require('./routes/customers/customer')
var loginRouter = require("./routes/logins/login")
var registerRouter = require("./routes/registrations/register")
var addressRouter = require('./routes/addresses/address');
var loginRouter = require('./routes/logins/login');

var app = express();

// connect to database
const db = require("./models");
db.sequelize.sync({alter:true});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/customers', customerRouter);
//app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/addresses', addressRouter);
app.use('/login',loginRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  //console.log("here")
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
