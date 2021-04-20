var express = require('express');
var router = express.Router();
const customerController = require('../../Controllers/customers/customerController')

router.get('/:id',customerController.getCustomerByID)
router.get('/',customerController.getAllCustomer)
router.put('/:id',customerController.updateCustomer)
router.delete('/:id',customerController.deleteCustomerByID)
module.exports = router;