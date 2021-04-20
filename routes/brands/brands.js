var express = require('express');
var router = express.Router();


const controller = require("../../controllers");
router.get('/brands', controller.brands.getAllBrands);
router.get('/brands/:id', controller.brands.getBrandByID);
router.post('/brands', controller.brands.addBrand);
router.put('/brands/:id', controller.brands.updateBrand);
router.delete('/brands', controller.brands.deleteAllBrands);
router.delete('/brands/:id', controller.brands.deleteBrandByID);




module.exports = router;