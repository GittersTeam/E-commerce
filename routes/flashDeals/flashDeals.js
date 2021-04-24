var express = require('express');
var router = express.Router();
const controller = require('../../controllers')

router.get('/', controller.flashDeals.getAllFlashDeals)
router.get('/:id', controller.flashDeals.getFlashDealByID)

router.post('/', controller.flashDeals.addFlashDeal)

router.put('/:id', controller.flashDeals.updateFlashDeal)

router.delete('/:id', controller.flashDeals.deleteFlashDealByID)

module.exports = router;