var express = require('express');
var router = express.Router();
const controller = require('../../controllers')

router.get('/', controller.dealProducts.getAllDealProducts)
router.get('/:id', controller.dealProducts.getDealProductByID)

router.post('/', controller.dealProducts.addDealProduct)

router.put('/:id', controller.dealProducts.updateDealProduct)

router.delete('/:id', controller.dealProducts.deleteDealProductByID)

module.exports = router;