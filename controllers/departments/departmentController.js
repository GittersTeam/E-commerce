const db = require("../../models");
const  Department = db.departments;
const  Category = db.categories;
const  Subcategories = db.subcategories;
const  Product = db.products;

const getAllDepartments = function (req, res) {
    Department.findAll({
        where: {},
        include: {model: Category, as: 'categories', include: [
          {model: Subcategories, as:'subcategories', include: [{model:Product, as:'products'}]},
          
        ]}
    })
        .then((data) => {
            res.send({
                data: data,
                message: "Departments retrieved successfully",
                status: 200,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials.",
            });
        });
};
const getDepartmentByuuid =  async(req, res) =>{
    const uuid = req.params.uuid;
    try{
         const department = await Department.findOne({
            where:{uuid},
            include:'categories',
            include: {model: Category, as: 'categories', include: [
                {model: Subcategories, as:'subcategories'}
              ]}
        })
        return res.json(department)
    }catch(err){
        console.log(err);
        return res.status.json({error:`Some error occurred while retrieving Department for room with uuid = ${uuid}.`})
    }
};
const createDepartment = async (req, res) => {
    // Validate request
    const { name, icon, descrption } = req.body;
    if (!name || !descrption) {
        res.status(400).send({
            message: "Department name and descrption can not be empty!",
        });
        return;
    }
    // Create a Tutorial
    try {
        const department = await Department.create({ name, icon, descrption });
        return res.json(department);
    } catch (err) {
      res.json(err);
    }
};

  const updateDepartmentByUuiD = function(req, res){

    const uuid = req.params.uuid;

    Department.update(req.body, {
        where:{uuid}
    }).then(num => {
        if (num == 1) {
          res.send({
            message: "Department was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Department with id=${uuid}. Maybe the Department was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Department with id=" + uuid + err
        });
      });

  };

  const deleteDepartmentByUuiD = function(req, res){

    const uuid = req.params.uuid;

    Department.destroy({
      where: { uuid }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Department was deleted successfully."
          });
        } else {
          res.send({
            message: `Cannot delete Department with id=${uuid}. Maybe the Department was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error deleting Department with id=" + uuid
        });
      });
  };

  const deleteAllDepartments = function(req, res){

    Department.destroy({
      where: { },
      truncate: false
    })
      .then(num => {
          res.send({
            message: `${num} Departments were deleted successfully!`
          });

      })
      .catch(err => {
        res.status(500).send({
          message: "Error deleting Departments"
        });
      });

  };

module.exports = {
    getAllDepartments: getAllDepartments,
    getDepartmentByuuid:getDepartmentByuuid,
    createDepartment: createDepartment,
    updateDepartmentByUuiD:updateDepartmentByUuiD,
    deleteDepartmentByUuiD:deleteDepartmentByUuiD,
    deleteAllDepartments:deleteAllDepartments
};
