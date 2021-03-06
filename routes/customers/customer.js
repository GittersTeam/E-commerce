var express = require('express');
var router = express.Router();
const controller = require('../../controllers')
const isCustomer = require('../../middleware/isCustomer');
const isAdmin = require('../../middleware/isAdmin');
const isAuth = require('../../middleware/auth');

router.get('/:id',[isAuth],controller.customers.getCustomerByID)
router.get('/',[isAdmin],controller.customers.getAllCustomer)
router.put('/:id',[isCustomer],controller.customers.updateCustomer)
module.exports = router;