var express = require('express');
var router = express.Router();
const controller = require('../../controllers')
const isCustomer = require('../../middleware/isCustomer');
const isAdmin = require('../../middleware/isAdmin');
const isAuth = require('../../middleware/auth');

<<<<<<< HEAD
router.get('/:id', controller.customers.getCustomerByID)
router.get('/', controller.customers.getAllCustomer)
router.put('/:id', controller.customers.updateCustomer)
=======
router.get('/:id',[isAuth],controller.customers.getCustomerByID)
router.get('/',[isAdmin],controller.customers.getAllCustomer)
router.put('/:id',[isCustomer],controller.customers.updateCustomer)
>>>>>>> 1b3364d261919dd11508ddf92fe19b499481c4ee
module.exports = router;