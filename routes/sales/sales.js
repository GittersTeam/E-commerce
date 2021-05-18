var express = require('express');
var router = express.Router();
const controller = require('../../controllers')
const isAuth = require('../../middleware/Auth');
const isAdmin = require('../../middleware/isAdmin');

router.get('/', [isAuth], controller.sales.getAllSales)
router.get('/:id', [isAuth], controller.sales.getSaleByID)

router.post('/', [isAdmin], controller.sales.addSale)

router.put('/:id', [isAdmin], controller.sales.updateSale)

router.delete('/:id', [isAdmin], controller.sales.deleteSaleByID)

module.exports = router;