var express = require('express');
var router = express.Router();
const salesRouter = require('./sales/sales')
const advertisementsRouter = require('./advertisements/advertisements')
const reviewsRouter = require('./reviews/reviews')
const uploadsRouter = require('./uploads/uploads')
const flashDealsRouter = require('./flashDeals/flashDeals')
const dealProductsRouter = require('./flashDeals/dealProducts')

var departmentsRouter = require('./departments/departments');
var categoriesRouter = require('./categories/categories');
var subcategoriesRouter = require('./subcategories/subcategories');

router.use('/departments', departmentsRouter);
router.use('/categories', categoriesRouter);
router.use('/subcategories', subcategoriesRouter);
router.use('/sales', salesRouter);
router.use('/flash-deals/products', dealProductsRouter);
router.use('/flash-deals', flashDealsRouter);
router.use('/uploads', uploadsRouter);
router.use('/advertisements', advertisementsRouter);
router.use('/reviews', reviewsRouter);

module.exports = router;