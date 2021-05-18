var express = require('express');
var router = express.Router();
const controller = require('../../controllers')

router.post('/',controller.admins.addAdmin)
router.get('/',controller.admins.getAdmin)
module.exports = router;