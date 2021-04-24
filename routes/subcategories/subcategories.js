var express = require("express");
var router = express.Router();
const controller = require("../../controllers");

router.post("/", controller.subcategories.createSubcategories);
router.get("/", controller.subcategories.getAllsubcategories);
router.get("/:uuid", controller.subcategories.getSubcategoryByuuid);

router.put("/:uuid", controller.subcategories.updateSubcategoryByUuiD);
router.delete("/:uuid", controller.subcategories.deleteSubcategoryByUuiD);
router.delete("/", controller.subcategories.deleteAllSubcategories);

module.exports = router;