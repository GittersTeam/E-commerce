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

router.get('/products/', [isAuth], controller.flashDeals.getAllDealProducts)

router.post('/products/', [isAdmin], controller.flashDeals.addDealProduct)

router.put('/products/:id', [isAdmin], controller.flashDeals.updateDealProduct)

router.delete('/products/:id', [isAdmin], controller.flashDeals.deleteDealProductByID)


module.exports = router;