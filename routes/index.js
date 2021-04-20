var express = require('express');
var router = express.Router();


var departmentsRouter = require('./departments/departments');
var categoriesRouter = require('./categories/categories');
var subcategoriesRouter = require('./subcategories/subcategories');

router.use('/departments', departmentsRouter);
router.use('/categories', categoriesRouter);
router.use('/subcategories', subcategoriesRouter);

module.exports = router;