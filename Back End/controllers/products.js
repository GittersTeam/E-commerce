const db = require("../models");
const Product = db.products;
const up = require("./upload-photo");


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
    // const photo = up.uploadImage
    // console.log(up.uploadImage.image_name)
    const product = {
        name: req.body.name,
        price: req.body.price,
        currency: req.body.currency,
        size: req.body.size,
        color: req.body.color,
        description: req.body.description,
        barCodeNumber: req.body.barCodeNumber,
        

    };
    // Product.update({ photo: null }, {
    //     where: { photo: JSON. stringify(up.uploadImage)  }
    // })
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