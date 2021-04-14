var express = require('express');
var router = express.Router();


var productsRouter = require('./products');
// var brandsRouter = require('../brands');

router.use('/products', productsRouter)
// router.use('/brands', brandsRouter)

module.exports = router;