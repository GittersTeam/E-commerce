var express = require('express');
var router = express.Router();
const controller = require('../../controllers')

router.post('/:path', controller.uploads.adUpload)

module.exports = router;