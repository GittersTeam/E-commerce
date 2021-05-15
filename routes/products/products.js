var express = require('express');
var router = express.Router();
const isAuth = require('../../middleware/auth')
const isAdmin = require('../../middleware/isAdmin')


const controller = require("../../controllers");
router.get('/', controller.products.getAllProducts);
router.get('/:id', [isAdmin], controller.products.getProductByID);
router.post('/', [isAdmin], controller.products.addProduct);
router.put('/:id', [isAdmin], controller.products.updateProduct);
router.delete('/', [isAdmin], controller.products.deleteAllProducts);
router.delete('/:id', [isAdmin], controller.products.deleteProductByID);
// router.put('/deleteColor/:id', controller.products.deleteColor);
// router.put('/addColor/:id', controller.products.addColor);




module.exports = router;