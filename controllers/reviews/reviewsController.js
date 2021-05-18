const db = require("../../models");
const Op = db.Sequelize.Op;
const Review = db.reviews
const getAllReviewsByProductID = (req, res) => {
    Review.findAll({
            where: {
                productID: req.params.pid
            }
        })
        .then(data => {
            res.send({
                "data": data,
                "message": "Review retrieved successfully",
                "status": 200

            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Reviews."
            });
        });
    return;

}
const getReviewByIDByProductID = (req, res) => {
    Review.findOne({
            where: {
                productID: req.params.pid,
                id: req.params.id,
            }
        })
        .then(data => {
            res.send({
                "data": data,
                "message": "Review retrieved successfully",
                "status": 200

            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Reviews."
            });
        });

}
const addReview = (req, res) => {

    // Validate request
    if (!req.body.customerID || !req.body.productID || !req.body.review || !req.body.rating) {
        res.status(400).send({
            message: "Customer ID, review, or rating can not be empty!"
        });
        return;
    }

    // Create a Tutorial
    const review = {
        customerID: req.body.customerID,
        productID: req.body.productID,
        review: req.body.review,
        rating: req.body.rating,
        date: new Date()
    };

    // Save Tutorial in the database
    Review.create(review)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Review."
            });
        });


}
const updateReview = (req, res) => {

    const id = req.params.id;

    Review.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Review was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Review with id=${id}. Maybe Review was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Review with id=" + id
            });
        });

}

const deleteReviewByID = (req, res) => {

    const id = req.params.id;

    Review.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Review was deleted successfully."
                });
            } else {
                res.send({
                    message: `Cannot delete Review with id=${id}. Maybe Review was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleting Review with id=" + id
            });
        });

}


module.exports = {
    getAllReviewsByProductID,
    getReviewByIDByProductID,
    addReview,
    updateReview,
    deleteReviewByID,
}