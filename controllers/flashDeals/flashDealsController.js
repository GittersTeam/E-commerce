const db = require("../../models");
const Op = db.Sequelize.Op;
const FlashDeal = db.flashDeals
const getAllFlashDeals = (req, res) => {
    FlashDeal.findAll()
        .then(data => {
            res.send({
                "data": data,
                "message": "FlashDeal retrieved successfully",
                "status": 200

            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving FlashDeals."
            });
        });
    return;

}
const getFlashDealByID = (req, res) => {
    FlashDeal.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            res.send({
                "data": data,
                "message": "FlashDeal retrieved successfully",
                "status": 200

            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving FlashDeals."
            });
        });

}
const addFlashDeal = (req, res) => {

    // Validate request
    if (!req.body.desc || !req.body.startDate || !req.body.endDate) {
        res.status(400).send({
            message: "Description, startDate, or EndDate can not be empty!"
        });
        return;
    }

    // Create a Tutorial
    const flashDeal = {
        desc: req.body.desc,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
    };

    // Save Tutorial in the database
    FlashDeal.create(flashDeal)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the FlashDeal."
            });
        });


}
const updateFlashDeal = (req, res) => {

    const id = req.params.id;

    FlashDeal.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "FlashDeal was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update FlashDeal with id=${id}. Maybe FlashDeal was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating FlashDeal with id=" + id
            });
        });

}

const deleteFlashDealByID = (req, res) => {

    const id = req.params.id;

    FlashDeal.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "FlashDeal was deleted successfully."
                });
            } else {
                res.send({
                    message: `Cannot delete FlashDeal with id=${id}. Maybe FlashDeal was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleting FlashDeal with id=" + id
            });
        });

}
const getAllDealProducts = (req, res) => {
    // DealProduct.findAll()
    //     .then(data => {
    //         res.send({
    //             "data": data,
    //             "message": "Deal Product retrieved successfully",
    //             "status": 200

    //         });
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: err.message || "Some error occurred while retrieving Deal Products."
    //         });
    //     });
    return;

}

const addDealProduct = (req, res) => {

    // // Validate request
    // if (!req.body.dealID || !req.body.productID || !req.body.price) {
    //     res.status(400).send({
    //         message: "Deal ID, product ID, or price can not be empty!"
    //     });
    //     return;
    // }

    // // Create a Tutorial
    // const dealProduct = {
    //     dealID: req.body.dealID,
    //     productID: req.body.productID,
    //     price: req.body.price,
    // };

    // // Save Tutorial in the database
    // DealProduct.create(dealProduct)
    //     .then(data => {
    //         res.send(data);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: err.message || "Some error occurred while creating the DealProduct."
    //         });
    //     });


}
const updateDealProduct = (req, res) => {

    // const id = req.params.id;

    // DealProduct.update(req.body, {
    //         where: { dealID: id }
    //     })
    //     .then(num => {
    //         if (num == 1) {
    //             res.send({
    //                 message: "DealProduct was updated successfully."
    //             });
    //         } else {
    //             res.send({
    //                 message: `Cannot update DealProduct with id=${id}. Maybe DealProduct was not found or req.body is empty!`
    //             });
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: "Error updating DealProduct with id=" + id
    //         });
    //     });

}

const deleteDealProductByID = (req, res) => {

    // const id = req.params.id;

    // DealProduct.destroy({
    //         where: { dealID: id }
    //     })
    //     .then(num => {
    //         if (num == 1) {
    //             res.send({
    //                 message: "DealProduct was deleted successfully."
    //             });
    //         } else {
    //             res.send({
    //                 message: `Cannot delete DealProduct with id=${id}. Maybe DealProduct was not found!`
    //             });
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: "Error deleting DealProduct with id=" + id
    //         });
    //     });

}

module.exports = {
    getAllDealProducts,
    addDealProduct,
    updateDealProduct,
    deleteDealProductByID,
    getAllFlashDeals,
    getFlashDealByID,
    addFlashDeal,
    updateFlashDeal,
    deleteFlashDealByID,
}