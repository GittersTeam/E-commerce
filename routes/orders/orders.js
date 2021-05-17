var express = require('express');
var router = express.Router();

const db = require("../../models");
const order = db.order;
const controller=require("../../controllers");
const isAuth=require('../../middleware/auth');
const isCustomer=require('../../middleware/isCustomer');
const isAdmin=require('../../middleware/isAdmin');
 router.post('/',[isCustomer], controller.orders.CreateOrder);
 router.get('/', [isAuth],controller.orders.getOrders);
 router.get('/:id', [isAdmin],controller.orders.GetorderByID);
router.put('/:id',[isAdmin],controller.orders.updateOrder);
router.delete('/:id',[isAuth],controller.orders.DeleteOrder);


module.exports = router;