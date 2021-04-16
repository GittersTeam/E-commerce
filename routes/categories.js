var express = require("express");
var router = express.Router();
const CategoriesController = require("../controllers/categoryController");

router.get("/:uuid", CategoriesController.getCategoryByuuid);
router.post("/", CategoriesController.createCategory);
router.get("/", CategoriesController.getAllCategories);

router.put("/:uuid", CategoriesController.updateDepartmentByUuiD);
router.delete("/:uuid", CategoriesController.deleteDepartmentByUuiD);
router.delete("/", CategoriesController.deleteAllDepartments);

module.exports = router;