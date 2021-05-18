var express = require('express');
var router = express.Router();

const db = require("../../models");
const Cart = db.carts;
const controller=require("../../controllers");
const isAuth=require('../../middleware/auth');
//const isCustomer=require('../../middleware/isCustomer');
const isAdmin=require('../../middleware/isAdmin');

 router.get('/',[isAuth], controller.carts.getCartByID);
  router.put('/',[isAuth], controller.carts.updateCartByID);
  

  


module.exports = router;