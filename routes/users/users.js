var express = require('express');
var router = express.Router();
const userController = require('../../Controllers/users/userController')

router.get('/users/:id',userController.getUserByID)
router.get('/users',userController.getAllUser)
router.put('/users/changePassword/:id',userController.updateUserPassword)
router.put('/users/:id',userController.updateUser)
router.delete('/users/:id',userController.deleteUserByID)
module.exports = router;
