var express = require("express");
var router = express.Router();
const SubCategoriesController = require("../controllers/subcategoryController");


router.post("/", SubCategoriesController.createSubcategories);
router.get("/", SubCategoriesController.getAllsubcategories);
router.get("/:uuid", SubCategoriesController.getSubcategoryByuuid);

router.put("/:uuid", SubCategoriesController.updateSubcategoryByUuiD);
router.delete("/:uuid", SubCategoriesController.deleteSubcategoryByUuiD);
router.delete("/", SubCategoriesController.deleteAllSubcategories);

module.exports = router;