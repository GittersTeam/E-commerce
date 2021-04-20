var express = require('express');
var router = express.Router();
const controller = require('../../controllers')

router.post('/',controller.logins.login)
module.exports = router;