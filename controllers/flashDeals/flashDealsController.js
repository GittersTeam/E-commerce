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


module.exports = {
    getAllFlashDeals,
    getFlashDealByID,
    addFlashDeal,
    updateFlashDeal,
    deleteFlashDealByID,
}