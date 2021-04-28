const db = require("../../models");

const  Department = db.departments;
const  Category = db.categories;
const Subcategories = db.subcategories;
const createCategory = async (req, res) => { 
    // Create a Tutorial
    try {
       const { name, departmentUuid } = req.body;
        const dep = await Department.findOne({
            where: { uuid: departmentUuid }
        })
        const category = await Category.create({ name, departmentId: dep.uuid });
        return res.json(category);
      
   
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
const getAllCategories = async (req, res) => { 
    // Create a Tutorial
    try {
        const categories = await Category.findAll({include: [{model:Department, as:'department'},{model: Subcategories, as:'subcategories'}]})
        return res.json(categories);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
const getCategoryByuuid =  async(req, res) =>{
    const uuid = req.params.uuid;
    try{
         const category = await Category.findOne({
            where:{uuid},
            include:[{model:Department, as:'department'}, {model: Subcategories, as:'subcategories'}],
        })
        return res.json(category)
    }catch(err){
        console.log(err);
        return res.status.json({error:`Some error occurred while retrieving Department for room with uuid = ${uuid}.`})
    }
};
const updateDepartmentByUuiD = function(req, res){

    const uuid = req.params.uuid;

    Category.update(req.body, {
      where: { uuid }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Category was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Category with id=${uuid}. Maybe the Category was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Category with id=" + uuid + err
        });
      });

  };

  const deleteDepartmentByUuiD = function(req, res){

    const uuid = req.params.uuid;

    Category.destroy({
      where: { uuid }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Category was deleted successfully."
          });
        } else {
          res.send({
            message: `Cannot delete Category with id=${uuid}. Maybe the Category was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error deleting Category with id=" + uuid
        });
      });
  };

  const deleteAllDepartments = function(req, res){

    Category.destroy({
      where: { },
      truncate: false
    })
      .then(num => {
          res.send({
            message: `${num} Categories were deleted successfully!`
          });

      })
      .catch(err => {
        res.status(500).send({
          message: "Error deleting Categories"
        });
      });

  };

module.exports = {
    createCategory: createCategory,
    getAllCategories:getAllCategories,
    getCategoryByuuid:getCategoryByuuid,
    updateDepartmentByUuiD:updateDepartmentByUuiD,
    deleteDepartmentByUuiD:deleteDepartmentByUuiD,
    deleteAllDepartments:deleteAllDepartments
};