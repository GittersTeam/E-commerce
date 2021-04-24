var express = require('express');
var router = express.Router();
const controller = require('../../controllers')

router.get('/:id',controller.addresses.getAddressForOneCustomerByID)
router.get('/',controller.addresses.getAddress)
router.post('/',controller.addresses.addAddress)
router.put('/:id',controller.addresses.updateAddress)
router.delete('/:id',controller.addresses.deleteAddressByID)
router.delete('/all/:id',controller.addresses.deleteAllAddress)
module.exports = router;