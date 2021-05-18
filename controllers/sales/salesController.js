const db = require("../../models");
const Op = db.Sequelize.Op;
const Sale = db.sales
const getAllSales = async(req, res) => {
    const sale = await Sale.findAll({
        order: [
            ['productID', 'ASC'],
            ['createdAt', 'DESC'],
        ],
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Sale."
        });
    });
    var temp = [];
    var index = [];
    sale.filter(function(item) {
        return temp.indexOf(item.productID) >= 0 ? false : index.push(item), temp.push(item.productID);
    });
    res.send({
        "data": index,
        "message": "Sale retrieved successfully",
        "status": 200

    });

    return;

}
const getSaleByID = (req, res) => {
    Sale.findOne({
            where: {
                id: req.params.id
            },
            // include:{
            //     model:Products
            // }
        })
        .then(data => {
            res.send({
                "data": data,
                "message": "Sale retrieved successfully",
                "status": 200

            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Sale."
            });
        });

}

const addSale = (req, res) => {

    // Validate request
    if (!req.body.percentage || !req.body.productID) {
        res.status(400).send({
            message: "Percentage, or productID can not be empty!"
        });
        return;
    }

    // Create a Tutorial
    const sale = {
        percentage: req.body.percentage,
        productID: req.body.productID,
    };

    // Save Tutorial in the database
    Sale.create(sale)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Sale."
            });
        });


}
const updateSale = (req, res) => {

    const id = req.params.id;

    Sale.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Sale was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Sale with id=${id}. Maybe Sale was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Sale with id=" + id
            });
        });

}

const deleteSaleByID = (req, res) => {

    const id = req.params.id;

    Sale.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Sale was deleted successfully."
                });
            } else {
                res.send({
                    message: `Cannot delete Sale with id=${id}. Maybe Sale was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleting Sale with id=" + id
            });
        });

}


module.exports = {
    getAllSales: getAllSales,
    getSaleByID: getSaleByID,
    addSale: addSale,
    updateSale: updateSale,
    deleteSaleByID: deleteSaleByID,
}