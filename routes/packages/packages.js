var express = require('express');
var router = express.Router();


const packageController = require("../../controllers/packages/packageController");
router.get('/packages', packageController.getAllPackages);
router.get('/packages/:id', packageController.getPackageByID);
router.post('/packages', packageController.addPackage);
router.put('/packages/:id', packageController.updatePackage);
router.delete('/packages', packageController.deleteAllPackages);
router.delete('/packages/:id', packageController.deletePackageByID);




module.exports = router;