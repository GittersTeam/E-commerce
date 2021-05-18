var express = require('express');
var router = express.Router();
const isAuth = require('../../middleware/auth')
const isAdmin = require('../../middleware/isAdmin')

const controller = require("../../controllers");
router.get('/', controller.brands.getAllBrands);
router.get('/:id', controller.brands.getBrandByID);
router.post('/', [isAdmin], controller.brands.addBrand);
router.put('/:id', [isAdmin], controller.brands.updateBrand);
router.delete('/', [isAdmin], controller.brands.deleteAllBrands);
router.delete('/:id', [isAdmin], controller.brands.deleteBrandByID);




module.exports = router;