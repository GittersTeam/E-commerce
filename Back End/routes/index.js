var express = require('express');
var router = express.Router();


var productsRouter = require('./products/products');
var brandsRouter = require('./brands/brands');

router.use('/products', productsRouter)
router.use('/brands', brandsRouter)

module.exports = router;