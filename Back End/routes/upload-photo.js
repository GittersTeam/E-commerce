var express = require('express')
var router = express.Router();


const uploadPhotoController = require("../controllers/upload-photo");
router.post('/photo', uploadPhotoController.uploadImage);

module.exports = router;