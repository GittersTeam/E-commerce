var express = require('express');
var router = express.Router();
const controller = require('../../controllers')

router.get('/', controller.sales.getAllSales)
router.get('/:id', controller.sales.getSaleByID)

router.post('/', controller.sales.addSale)

router.put('/:id', controller.sales.updateSale)

router.delete('/:id', controller.sales.deleteSaleByID)

module.exports = router;