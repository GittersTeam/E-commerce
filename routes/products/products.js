var express = require('express');
var router = express.Router();


const controller = require("../../controllers");
router.get('/products', controller.products.getAllProducts);
router.get('/products/:id', controller.products.getProductByID);
router.post('/products', controller.products.addProduct);
router.put('/products/:id', controller.products.updateProduct);
router.delete('/products/', controller.products.deleteAllProducts);
router.delete('/products/:id', controller.products.deleteProductByID);
// router.put('/deleteColor/:id', controller.products.deleteColor);
// router.put('/addColor/:id', controller.products.addColor);




module.exports = router;