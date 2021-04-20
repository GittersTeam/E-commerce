var express = require('express');
var router = express.Router();
const controller = require('../../controllers')

router.post('/admin',controller.registrations.addAdmin)
router.post('/',controller.registrations.addUser)

module.exports = router;