var express = require('express');
var router = express.Router();


var productsRouter = require('./products');
var uploudPhotoRouter = require('./upload-photo');
// var brandsRouter = require('../brands');

router.use('/products', productsRouter)
router.use('/products', uploudPhotoRouter)
// router.use('/brands', brandsRouter)

module.exports = router;