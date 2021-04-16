var express = require("express");
var router = express.Router();
const DepartmentsController = require("../controllers/departmentController");
router.get("/:uuid", DepartmentsController.getDepartmentByuuid);
router.post("/", DepartmentsController.createDepartment);
router.get("/", DepartmentsController.getAllDepartments);

router.put("/:uuid", DepartmentsController.updateDepartmentByUuiD);
router.delete("/:uuid", DepartmentsController.deleteDepartmentByUuiD);
router.delete("/", DepartmentsController.deleteAllDepartments);

module.exports = router;