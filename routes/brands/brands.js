var express = require('express');
var router = express.Router();


const controller = require("../../controllers");
router.get('/', controller.brands.getAllBrands);
router.get('/:id', controller.brands.getBrandByID);
router.post('/', controller.brands.addBrand);
router.put('/:id', controller.brands.updateBrand);
router.delete('/', controller.brands.deleteAllBrands);
router.delete('/:id', controller.brands.deleteBrandByID);




module.exports = router;