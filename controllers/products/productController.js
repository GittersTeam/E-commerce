const db = require("../../models");
const user = require("../../models/users/user");
const userCont = require("../../controllers/users/userController")
const Product = db.products;
const Package = db.packages;
const Subcategory = db.subcategories;
const PackageProducts = db.packageProducts;
const Category = db.categories;
const Department = db.departments;
const Brand = db.brands;
const User = db.users
const Sales = db.sales;
const FlashDeals = db.flashDeals
const jwt = require('jsonwebtoken');
const Op = db.Sequelize.Op;



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
                message: err.message || "Some error occurred while adding the product."
            });
        });

}
const getProductByID = (req, res) => {

    const token = req.headers['authorization'];
    var condition = { isPublished: true }

    if (token != null) {
        const bearer = token.split(' ');
        const bearerToken = bearer[1];
        const verified = jwt.verify(bearerToken, process.env.JWT_SECRET);
        var users = userCont.parseJwt(bearerToken);
        if ((users != null && users.userType == 'Admin')) {
            condition = {}
        }
    }

    Product.findOne({
        where: [
            condition,
            { productID: req.params.id }

        ],
        include: [{
            model: Subcategory, as: 'subcategory',
            include: [{
                model: Category, as: 'category',
                include: [{ model: Department, as: 'department' }]
            }],
        },
        { model: Package, through: PackageProducts },
        { model: Brand, as: 'brand' },
        {
            model: Sales, as: 'sales',
            order: [
                ['createdAt', 'DESC'],
            ],
            limit: 1
        },
        { model: FlashDeals, foreignKey: 'flashDealID', where: { 'endDate': { [Op.gte]: new Date() } }, },
        ],

    })

        .then(data => {
            res.send({
                'data': data,
                'message': "Product retrieved successfully",
                'status': 200
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving product."
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
            if (num == 1) {
                res.send({
                    message: `${num} products were deleted successfully!`
                });
            } else {
                res.send({
                    message: `Cannot delete products. Maybe there are no products to delete`
                });
            }

        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleting products"
            });
        });
}
const getAllProducts = async function (req, res) {
    const brandName = req.query.brandName ? req.query.brandName : "";
    const department = req.query.department ? req.query.department : "";

    const token = req.headers['authorization'];
    var condition = { isPublished: true }

    if (token != null) {
        const bearer = token.split(' ');
        const bearerToken = bearer[1];
        const verified = jwt.verify(bearerToken, process.env.JWT_SECRET);
        var users = userCont.parseJwt(bearerToken);
        if ((users != null && users.userType == 'Admin')) {
            condition = {}
        }
    }
    Product.findAll({
        where: [
            condition
        ],
        include: [{
            model: Subcategory, as: 'subcategory',
            include: [{
                model: Category, as: 'category',
                include: [{ model: Department, as: 'department' }]
            }],
        },
        { model: Package, through: PackageProducts },
        { model: Brand, as: 'brand' },
        {
            model: Sales, as: 'sales',
            order: [
                ['createdAt', 'DESC'],
            ],
            limit: 1

        },
        { model: FlashDeals, foreignKey: 'flashDealID', required: false, left: true, where: { 'endDate': { [Op.gte]: new Date() } }, },
        ],

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

module.exports = {
    getAllProducts,
    addProduct,
    deleteProductByID,
    updateProduct,
    getProductByID,
    deleteAllProducts
};