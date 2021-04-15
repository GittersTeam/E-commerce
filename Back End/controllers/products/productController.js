const db = require("../../models");
const Product = db.products;
var fs = require('fs');
const multer = require('multer');
var path = require('path');
const helpers = require('./helpers');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/products');
    },
    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const addProduct = (req, res) => {
    let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).array('photo', 6);
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

        const product = {
            brandID: req.body.brandID,
            name: req.body.name,
            price: req.body.price,
            cost: req.body.cost,
            currency: req.body.currency,
            size: req.body.size,
            color: req.body.color,
            description: req.body.description,
            barCodeNumber: req.body.barCodeNumber,
            photo: req.files ? req.files.map((element, index) => {
                let temp = {}
                temp[index] = element.path.replace(/\\/g, "/")
                return temp
            }) : {},


        };
        Product.create(product)
            .then(data => {
                res.send({
                    'data': data,
                    'message': "product was added successfully",
                    'status': 200
                });
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while adding the product."
                });
            });

    });

}
const getAllProducts = (req, res) => {
    Product.findAll()
        .then(data => {
            res.send({
                'data': data,
                'message': "list of products",
                'status': 200
            });

        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving products."
            });
        });


}
const getProductByID = (req, res) => {
    Product.findOne({ where: { productID: req.params.id } })
        .then(data => {
            res.send({
                data: data,
                msg: "The product was found successfully "
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving the product."
            });
        });

}

const updateProduct = (req, res) => {
    const productID = req.params.id;

    Product.update(req.body, {
        where: { productID: productID }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Product was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update product with id=${productID}. Maybe product was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating product with id=" + productID
            });
        });
}
const deleteProductByID = (req, res) => {
    const productID = req.params.id;

    Product.destroy({
        where: { productID: productID }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "The product was deleted successfully."
                });
            } else {
                res.send({
                    message: `Cannot delete product, Maybe it was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleting product"
            });
        });
}
const deleteAllProducts = function (req, res) {

    Product.destroy({
        where: {},
        truncate: false
    })
        .then(num => {
            res.send({
                message: `${num} Products were deleted successfully!`
            });

        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleting products"
            });
        });
}


module.exports = { getAllProducts, addProduct, deleteProductByID, updateProduct, getProductByID, deleteAllProducts };