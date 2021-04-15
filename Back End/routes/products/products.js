var express = require('express');
var router = express.Router();


const productController = require("../../controllers/products/productController");
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductByID);
router.post('/products', productController.addProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/', productController.deleteAllProducts);
router.delete('/products/:id', productController.deleteProductByID);




module.exports = router;