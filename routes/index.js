var express = require('express');
var router = express.Router();

var usersRouter = require('./users/users');
var customerRouter = require('./customers/customer')
var loginRouter = require("./logins/login")
var registerRouter = require("./registrations/register")
var addressRouter = require('./addresses/address');

router.use('/users', usersRouter);
router.use('/customers', customerRouter);
router.use('/registers', registerRouter);
router.use('/addresses', addressRouter);
router.use('/logins',loginRouter)

module.exports = router;
