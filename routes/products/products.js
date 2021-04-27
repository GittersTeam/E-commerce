var express = require('express');
var router = express.Router();


const controller = require("../../controllers");
router.get('/', controller.products.getAllProducts);
router.get('/:id', controller.products.getProductByID);
router.post('/', controller.products.addProduct);
router.put('/:id', controller.products.updateProduct);
router.delete('/', controller.products.deleteAllProducts);
router.delete('/:id', controller.products.deleteProductByID);
// router.put('/deleteColor/:id', controller.products.deleteColor);
// router.put('/addColor/:id', controller.products.addColor);




module.exports = router;