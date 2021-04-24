var express = require('express');
var router = express.Router();

const db = require("../../models");
const Cart = db.carts;
const controller=require("../../controllers");

router.post('/', controller.carts.CreateCart);
 router.get('/', controller.carts.getallProduct);
 router.delete('/:id', controller.carts.deleteProduct);
  router.put('/:id', controller.carts.updateCart);
  router.get('/:id', controller.carts.FindProductByID);

  


module.exports = router;