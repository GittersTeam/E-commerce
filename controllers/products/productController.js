const db = require("../../models");
const Product = db.products;
const Subcategory = db.subcategories;
const Category = db.categories;
const Brand = db.brands;

const addProduct = (req, res) => {
    const product = {
        brandID: req.body.brandID,
        name: req.body.name,
        price: req.body.price,
        cost: req.body.cost,
        currency: req.body.currency,
        color: req.body.color,
        size: req.body.size,
        quantity: req.body.quantity,
        description: req.body.description,
        subcategoryId: req.body.subcategoryId,
        barCodeNumber: req.body.barCodeNumber,
        photo: req.body.photo ? req.body.photo : [],
        subcategoryId: req.body.subcategoryId,
        isPublished: req.body.isPublished

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

}
const getProductByID = (req, res) => {
    Product.findOne({ where: { productID: req.params.id } })
        .then(data => {
            data.photo = JSON.parse(data.photo)
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
const getAllProducts = function (req, res) {  
    const user = db.users
    var condition = {}
    if ((req.user == null) || (req.user != null && req.user.userType != 'Admin')) {
        condition.isPublished = true
    }
    console.log(req.user.userType)

    Product.findAll({
        where: condition
    })
        .then(data => {
            res.send({
                'data': data,
                'message': "Products retrieved successfully",
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

module.exports = { getAllProducts, addProduct, deleteProductByID, updateProduct, getProductByID, deleteAllProducts };