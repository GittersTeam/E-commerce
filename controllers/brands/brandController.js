const db = require("../../models");
const Brand = db.brands;
var fs = require('fs');
const multer = require('multer');
var path = require('path');
const helpers = require('./helpers');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/brands');
    },
    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const addBrand = (req, res) => {
    let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).array('logo', 1);
    upload(req, res, function (err) {

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.files) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        const brand = {
            name: req.body.name,
            logo: req.files ? req.files.map(file => file.path) : []

        };
        Brand.create(brand)
            .then(data => {
                res.send({
                    'data': data,
                    'message': "brand was added successfully",
                    'status': 200
                });
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while adding the brand."
                });
            });

    });

}
const getAllBrands = (req, res) => {
    Brand.findAll()
        .then(data => {
            res.send({
                'data': data,
                'message': "list of brands",
                'status': 200
            });

        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving brands."
            });
        });


}
const getBrandByID = (req, res) => {
    Brand.findOne({ where: { brandID: req.params.id } })
        .then(data => {
            res.send({
                data: data,
                msg: "The brand was found successfully "
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving the brand."
            });
        });

}

const updateBrand = (req, res) => {
    const brandID = req.params.id;

    Brand.update(req.body, {
        where: { brandID: brandID }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Brand was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update brand with id=${brandID}. Maybe brand was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating brand with id=" + brandID
            });
        });
}
const deleteBrandByID = (req, res) => {
    const brandID = req.params.id;

    Brand.destroy({
        where: { brandID: brandID }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "The brand was deleted successfully."
                });
            } else {
                res.send({
                    message: `Cannot delete brand, Maybe it was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleting brand"
            });
        });
}
const deleteAllBrands = function (req, res) {

    Brand.destroy({
        where: {},
        truncate: false
    })
        .then(num => {
            res.send({
                message: `${num} Brands were deleted successfully!`
            });

        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleting brands"
            });
        });
}


module.exports = { getAllBrands, addBrand, getBrandByID, deleteBrandByID, updateBrand, deleteAllBrands };