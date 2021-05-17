var express = require('express');
var router = express.Router();
const controller = require('../../controllers')
const isAdmin = require('../../middleware/isAdmin');
const isAuth = require('../../middleware/Auth');

router.get('/:id',[isAuth],controller.users.getUserByID)
router.get('/',[isAdmin],controller.users.getAllUser)
router.put('/changePassword/:id',[isAuth],controller.users.updateUserPassword)
router.put('/:id',[isAuth],controller.users.updateUser)
router.delete('/:id',[isAuth],controller.users.deleteUserByID)
module.exports = router;
