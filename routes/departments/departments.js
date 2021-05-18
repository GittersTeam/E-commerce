var express = require("express");
var router = express.Router();
const controller = require("../../controllers");

const isAdmin = require('./../../middleware/isAdmin');
router.get("/:uuid", controller.departments.getDepartmentByuuid);
router.post("/", [isAdmin],controller.departments.createDepartment);
router.get("/", controller.departments.getAllDepartments);

router.put("/:uuid", [isAdmin],controller.departments.updateDepartmentByUuiD);
router.delete("/:uuid", [isAdmin],controller.departments.deleteDepartmentByUuiD);
router.delete("/", [isAdmin], controller.departments.deleteAllDepartments);

module.exports = router;