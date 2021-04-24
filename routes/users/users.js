var express = require('express');
var router = express.Router();
const controller = require('../../controllers')

router.get('/:id',controller.users.getUserByID)
router.get('/',controller.users.getAllUser)
router.put('/changePassword/:id',controller.users.updateUserPassword)
router.put('/:id',controller.users.updateUser)
router.delete('/:id',controller.users.deleteUserByID)
module.exports = router;
