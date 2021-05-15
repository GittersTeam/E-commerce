var express = require('express');
var router = express.Router();
const controller = require("../../controllers");
/* GET users listing. */
router.post('/signup', controller.users.signUp);
router.post('/signin', controller.users.signIn);

module.exports = router;