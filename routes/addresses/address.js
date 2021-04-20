var express = require('express');
var router = express.Router();
const addressController = require('../../Controllers/addresses/addressController')

router.get('/addresses/:id',addressController.getAddressForOneCustomerByID)
router.get('/addresses',addressController.getAddress)
router.post('/addresses',addressController.addAddress)
router.put('/addresses/:id',addressController.updateAddress)
router.delete('/addresses/:id',addressController.deleteAddressByID)
router.delete('/addresses',addressController.deleteAllAddress)
module.exports = router;