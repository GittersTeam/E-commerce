const express = require('express');
const router = express.Router();

const isCustomer = require('../middleware/isCustomer');
const isAuth = require('../middleware/Auth');
const usersRouter = require('./users/users');
const customerRouter = require('./customers/customer')
const loginRouter = require("./logins/login")
const registerRouter = require("./registrations/register")
const addressRouter = require('./addresses/address');
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
const authRouter = require ('./auth/auth')

router.use('/customers',[isCustomer],customerRouter);
router.use('/registers', registerRouter);
router.use('/addresses',[isCustomer], addressRouter);
router.use('/logins',loginRouter)
router.use('/users',[isAuth], usersRouter);
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
router.use('/auth',authRouter)

module.exports = router;
