var express = require("express");
var router = express.Router();
const controller = require("../../controllers");

router.get("/:uuid", controller.categories.getCategoryByuuid);
router.post("/", controller.categories.createCategory);
router.get("/", controller.categories.getAllCategories);

router.put("/:uuid", controller.categories.updateDepartmentByUuiD);
router.delete("/:uuid", controller.categories.deleteDepartmentByUuiD);
router.delete("/", controller.categories.deleteAllDepartments);

module.exports = router;