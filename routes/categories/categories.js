var express = require("express");
var router = express.Router();
const controller = require("../../controllers");
const isAdmin = require('./../../middleware/isAdmin');

router.get("/:uuid", controller.categories.getCategoryByuuid);
router.post("/", [isAdmin],controller.categories.createCategory);
router.get("/", controller.categories.getAllCategories);

router.put("/:uuid", [isAdmin],controller.categories.updateDepartmentByUuiD);
router.delete("/:uuid", [isAdmin],controller.categories.deleteDepartmentByUuiD);
router.delete("/", [isAdmin], controller.categories.deleteAllDepartments);

module.exports = router;