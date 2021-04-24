var express = require('express');
var router = express.Router();

const db = require("../../models");
const order = db.order;
const controller=require("../../controllers");

 router.post('/', controller.orders.CreateOrder);
 router.get('/', controller.orders.getOrders);
 router.get('/:id', controller.orders.GetorderByID);
router.put('/:id',controller.orders.updateOrder);
router.delete('/:id',controller.orders.DeleteOrder);


module.exports = router;