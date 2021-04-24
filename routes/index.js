const express = require('express');
const router = express.Router();

const cartRouter = require('./carts/carts');
const orderRouter = require('./orders/orders');
const productsRouter = require('./products/products');
const brandsRouter = require('./brands/brands');
const packagesRouter = require('./packages/packages');
const salesRouter = require('./sales/sales')
const advertisementsRouter = require('./advertisements/advertisements')
const reviewsRouter = require('./reviews/reviews')
const uploadsRouter = require('./uploads/uploads')
const flashDealsRouter = require('./flashDeals/flashDeals')
const dealProductsRouter = require('./flashDeals/dealProducts')
const departmentsRouter = require('./departments/departments');
const categoriesRouter = require('./categories/categories');
const subcategoriesRouter = require('./subcategories/subcategories');

router.use('/departments', departmentsRouter);
router.use('/categories', categoriesRouter);
router.use('/subcategories', subcategoriesRouter);
router.use('/sales', salesRouter);
router.use('/flash-deals/products', dealProductsRouter);
router.use('/flash-deals', flashDealsRouter);
router.use('/uploads', uploadsRouter);
router.use('/advertisements', advertisementsRouter);
router.use('/reviews', reviewsRouter);
router.use('/carts', cartRouter);
router.use('/orders', orderRouter);
router.use('/products', productsRouter);
router.use('/brands', brandsRouter);
router.use('/packages', packagesRouter);

module.exports = router;
