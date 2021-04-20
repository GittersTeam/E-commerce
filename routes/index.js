var express = require('express');
var router = express.Router();


var usersRouter = require('./users/users');
var customerRouter = require('./customers/customer')
var loginRouter = require("./logins/login")
var registerRouter = require("./registrations/register")
var addressRouter = require('./addresses/address');
var loginRouter = require('./logins/login');

app.use('/users', usersRouter);
app.use('/customers', customerRouter);
app.use('/register', registerRouter);
app.use('/addresses', addressRouter);
app.use('/login',loginRouter)

module.exports = router;
