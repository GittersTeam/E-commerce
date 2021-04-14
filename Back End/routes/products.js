var express = require('express');
var router = express.Router();


const productController = require("../controllers/productController");
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductByID);
router.post('/products', productController.addProduct);
router.delete('/products/:id', productController.deleteProductByID);
router.put('/products/:id', productController.updateProduct);




module.exports = router;