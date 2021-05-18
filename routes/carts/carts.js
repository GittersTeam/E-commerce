var express = require('express');
var router = express.Router();

const db = require("../../models");
const Cart = db.carts;
const controller=require("../../controllers");
const isAuth=require('../../middleware/auth');
//const isCustomer=require('../../middleware/isCustomer');
const isAdmin=require('../../middleware/isAdmin');

router.post('/',[isAuth], controller.carts.AddProduct);
 router.get('/',[isAuth], controller.carts.getallProduct);
  router.put('/:id',[isAuth], controller.carts.updateCart);
  

  


module.exports = router;