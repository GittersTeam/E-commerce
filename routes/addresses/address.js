var express = require('express');
var router = express.Router();
const controller = require('../../controllers')
const isCustomer = require('../../middleware/isCustomer');
const isAdmin = require('../../middleware/isAdmin');

router.get('/:id',[isCustomer],controller.addresses.getAddressForOneCustomerByID)
router.get('/',[isAdmin],controller.addresses.getAddress)
router.post('/',[isCustomer],controller.addresses.addAddress)
router.put('/',[isCustomer],controller.addresses.updateAddress)
router.delete('/:id',[isCustomer],controller.addresses.deleteAddressByID)
router.delete('/all/:id',[isCustomer],controller.addresses.deleteAllAddress)
module.exports = router;