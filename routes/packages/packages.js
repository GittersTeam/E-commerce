var express = require('express');
var router = express.Router();


const controller = require("../../controllers");
router.get('/packages', controller.packages.getAllPackages);
router.get('/packages/:id', controller.packages.getPackageByID);
router.post('/packages', controller.packages.addPackage);
router.put('/packages/:id', controller.packages.updatePackage);
router.delete('/packages', controller.packages.deleteAllPackages);
router.delete('/packages/:id', controller.packages.deletePackageByID);




module.exports = router;