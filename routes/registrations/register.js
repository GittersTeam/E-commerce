var express = require('express');
var router = express.Router();
const registerController = require('../../Controllers/registrations/registerController')

router.post('/registers/admin',registerController.addAdmin)
router.post('/registers',registerController.addUser)

module.exports = router;