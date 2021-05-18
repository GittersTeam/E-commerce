var express = require('express');
var router = express.Router();
const controller = require('../../controllers')
const isAuth = require('../../middleware/Auth');
const isAdmin = require('../../middleware/isAdmin');

router.get('/', [isAuth], controller.advertisements.getAllAds)
router.get('/:id', [isAuth], controller.advertisements.getAdByID)

router.post('/', [isAdmin], controller.advertisements.addAd)

router.put('/:id', [isAdmin], controller.advertisements.updateAd)

router.delete('/:id', [isAdmin], controller.advertisements.deleteAdByID)

module.exports = router;