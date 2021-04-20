var express = require('express');
var router = express.Router();


var productsRouter = require('./products/products');
var brandsRouter = require('./brands/brands');
var packagesRouter = require('./packages/packages');

router.use('/products', productsRouter)
router.use('/brands', brandsRouter)
router.use('/packages', packagesRouter)

module.exports = router;