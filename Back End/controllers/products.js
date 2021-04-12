const db = require("../models");
const Product = db.products;


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

    Product.findByPk(req.params.id)
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
const addProduct = (req, res) => {

    const product = {
        productID: req.body.productID,
        productName: req.body.productName,
        price: req.body.price,
        productSize: req.body.productSize,
        description: req.body.description,
        brandID: req.body.brandID,


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


module.exports = { getAllProducts, addProduct, deleteProductByID, updateProduct, getProductByID };