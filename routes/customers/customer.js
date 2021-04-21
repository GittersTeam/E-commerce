var express = require('express');
var router = express.Router();
const controller = require('../../controllers')

router.get('/:id',controller.customers.getCustomerByID)
router.get('/',controller.customers.getAllCustomer)
router.put('/:id',controller.customers.updateCustomer)
//router.delete('/:id',controller.customers.deleteCustomerByID)
module.exports = router;