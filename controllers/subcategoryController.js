const db = require("../models");
const  Department = db.departments;
const  Category = db.categories;
const  Subcategory = db.subcategories;
const createSubcategories = async (req, res) => {
    // Validate request
    const { name, icon, categoryUuid } = req.body;
    // Create a Tutorial
    try {
        const cate = await Category.findOne({
            where: { uuid: categoryUuid }
        })
        const subcategory = await Subcategory.create({ subCategoryName:name, icon, categoryId: cate.uuid });
        return res.json(subcategory);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
const getAllsubcategories = async (req, res) => { 
    // Create a Tutorial
    try {
        const subcategories = await Subcategory.findAll({include: [{model:Category, as:'category'}]})
        return res.json(subcategories);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
const getSubcategoryByuuid =  async(req, res) =>{
    const uuid = req.params.uuid;
    try{
         const subcategory = await Subcategory.findOne({
            where:{uuid},
            include:[{model:Category, as:'category'}],
        })
        return res.json(subcategory)
    }catch(err){
        console.log(err);
        return res.status.json({error:`Some error occurred while retrieving Department for room with uuid = ${uuid}.`})
    }
};
const updateSubcategoryByUuiD = function(req, res){

    const uuid = req.params.uuid;

    Subcategory.update(req.body, {
      where: { uuid }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Subcategory was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Subcategory with id=${uuid}. Maybe the Subcategory was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Subcategory with id=" + uuid + err
        });
      });

  };

  const deleteSubcategoryByUuiD = function(req, res){

    const uuid = req.params.uuid;

    Subcategory.destroy({
      where: { uuid }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Subcategory was deleted successfully."
          });
        } else {
          res.send({
            message: `Cannot delete Subcategory with id=${uuid}. Maybe the Subcategory was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error deleting Subcategory with id=" + uuid
        });
      });
  };

  const deleteAllSubcategories = function(req, res){

    Subcategory.destroy({
      where: { },
      truncate: false
    })
      .then(num => {
          res.send({
            message: `${num} Subcategories were deleted successfully!`
          });

      })
      .catch(err => {
        res.status(500).send({
          message: "Error deleting Subcategories"
        });
      });

  };
module.exports = {
    createSubcategories: createSubcategories,
    getAllsubcategories:getAllsubcategories,
    getSubcategoryByuuid:getSubcategoryByuuid,
    updateSubcategoryByUuiD:updateSubcategoryByUuiD,
    deleteSubcategoryByUuiD:deleteSubcategoryByUuiD,
    deleteAllSubcategories:deleteAllSubcategories
};