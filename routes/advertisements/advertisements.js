var express = require('express');
var router = express.Router();
const controller = require('../../controllers')

router.get('/:id', controller.advertisements.getAdByID)
router.get('/', controller.advertisements.getAllAds)

router.post('/', controller.advertisements.addAd)

router.put('/:id', controller.advertisements.updateAd)

router.delete('/:id', controller.advertisements.deleteAdByID)

module.exports = router;