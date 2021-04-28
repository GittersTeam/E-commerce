var express = require('express');
var router = express.Router();


const controller = require("../../controllers");
router.get('/', controller.packages.getAllPackages);
router.get('/:id', controller.packages.getPackageByID);
router.post('/', controller.packages.addPackage);
router.put('/:id', controller.packages.updatePackage);
router.delete('/', controller.packages.deleteAllPackages);
router.delete('/:id', controller.packages.deletePackageByID);




module.exports = router;