var express = require('express');
var router = express.Router();
const isAuth = require('../../middleware/auth')
const isAdmin = require('../../middleware/isAdmin')


const controller = require("../../controllers");
router.get('/', controller.packages.getAllPackages);
router.get('/:id', controller.packages.getPackageByID);
router.post('/', [isAdmin], controller.packages.addPackage);
router.put('/:id', [isAdmin], controller.packages.updatePackage);
router.delete('/', [isAdmin], controller.packages.deleteAllPackages);
router.delete('/:id', [isAdmin], controller.packages.deletePackageByID);

module.exports = router;