var express = require('express');
var router = express.Router();
const controller = require('../../controllers')
const isAuth = require('../../middleware/Auth');
const isAdmin = require('../../middleware/isAdmin');

router.get('/', [isAuth], controller.flashDeals.getAllFlashDeals)
router.get('/:id', [isAuth], controller.flashDeals.getFlashDealByID)
router.post('/', [isAdmin], controller.flashDeals.addFlashDeal)
router.put('/:id', [isAdmin], controller.flashDeals.updateFlashDeal)
router.delete('/:id', [isAdmin], controller.flashDeals.deleteFlashDealByID)

router.post('/products/', [isAdmin], controller.flashDeals.addProductToFlashDeal)
router.put('/products/:id', [isAdmin], controller.flashDeals.updateProductinFlashDeal)
router.delete('/products/:id', [isAdmin], controller.flashDeals.deleteProductInFlashDeal)

module.exports = router;