var express = require("express");
var router = express.Router();
const controller = require("../../controllers");
const isAdmin = require('./../../middleware/isAdmin');

router.post("/", [isAdmin], controller.subcategories.createSubcategories);
router.get("/", controller.subcategories.getAllsubcategories);
router.get("/:uuid", controller.subcategories.getSubcategoryByuuid);

router.put("/:uuid", [isAdmin],controller.subcategories.updateSubcategoryByUuiD);
router.delete("/:uuid", [isAdmin],controller.subcategories.deleteSubcategoryByUuiD);
router.delete("/", [isAdmin],controller.subcategories.deleteAllSubcategories);

module.exports = router;