var express = require('express');
var router = express.Router();
const controller = require('../../controllers')

router.get('/statistic',controller.admins.getStatistic)
router.post('/',controller.admins.addAdmin)
router.get('/',controller.admins.getAdmin)
module.exports = router;