var express = require("express");
var router = express.Router();
const controller = require("../../controllers");

router.get("/:uuid", controller.departments.getDepartmentByuuid);
router.post("/", controller.departments.createDepartment);
router.get("/", controller.departments.getAllDepartments);

router.put("/:uuid", controller.departments.updateDepartmentByUuiD);
router.delete("/:uuid", controller.departments.deleteDepartmentByUuiD);
router.delete("/", controller.departments.deleteAllDepartments);

module.exports = router;