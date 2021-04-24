var express = require('express');
var router = express.Router();
const salesRouter = require('./sales/sales')
const advertisementsRouter = require('./advertisements/advertisements')
const reviewsRouter = require('./reviews/reviews')
const uploadsRouter = require('./uploads/uploads')
const flashDealsRouter = require('./flashDeals/flashDeals')
const dealProductsRouter = require('./flashDeals/dealProducts')

router.use('/sales', salesRouter);
router.use('/flash-deals/products', dealProductsRouter);
router.use('/flash-deals', flashDealsRouter);
router.use('/uploads', uploadsRouter);
router.use('/advertisements', advertisementsRouter);
router.use('/reviews', reviewsRouter);

module.exports = router;