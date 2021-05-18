const express = require('express');
const router = express.Router();

const isAdmin = require('../middleware/isAdmin');
const usersRouter = require('./users/users');
const customerRouter = require('./customers/customer')
<<<<<<< HEAD
const adminRouter = require("./admins/admin")
=======
const registerRouter = require("./registrations/register")
>>>>>>> e777f40b349723f351ac768c63751ac6b03e5b59
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
const departmentsRouter = require('./departments/departments');
const categoriesRouter = require('./categories/categories');
const subcategoriesRouter = require('./subcategories/subcategories');
const authRouter = require('./auth/auth')

router.use('/auth', authRouter)
router.use('/addresses', addressRouter);
router.use('/admins',[isAdmin], adminRouter);
router.use('/customers',customerRouter);
router.use('/users', usersRouter);
//router.use('/logins',loginRouter)
router.use('/departments', departmentsRouter);
router.use('/categories', categoriesRouter);
router.use('/subcategories', subcategoriesRouter);
router.use('/sales', salesRouter);
router.use('/flash-deals', flashDealsRouter);
router.use('/uploads', [isAdmin], uploadsRouter);
router.use('/advertisements', advertisementsRouter);
router.use('/reviews', reviewsRouter);
router.use('/carts', cartRouter);
router.use('/orders', orderRouter);
router.use('/products', productsRouter);
router.use('/brands', brandsRouter);
router.use('/packages', packagesRouter);

module.exports = router;