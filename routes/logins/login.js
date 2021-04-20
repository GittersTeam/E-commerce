var express = require('express');
var router = express.Router();
const loginController = require('../../Controllers/logins/loginController')

router.post('/',loginController.login)
module.exports = router;