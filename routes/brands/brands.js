var express = require('express');
var router = express.Router();


const brandController = require("../../controllers/brands/brandController");
router.get('/brands', brandController.getAllBrands);
router.get('/brands/:id', brandController.getBrandByID);
router.post('/brands', brandController.addBrand);
router.put('/brands/:id', brandController.updateBrand);
router.delete('/brands', brandController.deleteAllBrands);
router.delete('/brands/:id', brandController.deleteBrandByID);




module.exports = router;