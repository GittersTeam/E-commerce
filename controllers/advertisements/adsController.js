const db = require("../../models");
const Op = db.Sequelize.Op;
const Advertisement = db.advertisements

const getAllAds = (req, res) => {
    Advertisement.findAll()
        .then(data => {
            res.send({
                "data": data,
                "message": "Ad retrieved successfully",
                "status": 200

            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Ads."
            });
        });
    return;

}
const getAdByID = (req, res) => {
    Advertisement.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            data.keywords = JSON.parse(data.keywords)
            data.photos = JSON.parse(data.photos)
            res.send({
                "data": data,
                "message": "Ad retrieved successfully",
                "status": 200
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Ads."
            });
        });

}
const addAd = function(req, res, next) {

    if (!req.body.desc || !req.body.startDate || !req.body.endDate || !req.body.link) {
        res.status(400).send({
            message: "Description, start date, end date, or link can not be empty!"
        });
        return;
    }
    const ad = {
        desc: req.body.desc,
        photos: req.body.photos ? req.body.photos : [],
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        link: req.body.link,
    };
    Advertisement.create(ad)
        .then(data => {
            res.send({
                data,
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Ad."
            });
        });

}
const updateAd = async(req, res) => {

    let id = req.params.id
    Advertisement.update(req.body, {
            where: {
                id: id
            }
        })
        .then(data => {
            res.send({
                message: "Ad was updated successfully",
                status: 200
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Ad."
            });
        });

}

const deleteAdByID = (req, res) => {
    const id = req.params.id;

    Advertisement.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Ad was deleted successfully."
                });
            } else {
                res.send({
                    message: `Cannot delete Ad with id=${id}. Maybe Ad was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleting Ad with id=" + id
            });
        });

}


module.exports = {
    getAllAds,
    getAdByID,
    addAd,
    updateAd,
    deleteAdByID,
}