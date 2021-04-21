const db = require("../../models");
const Product = db.products;

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
        barCodeNumber: req.body.barCodeNumber,
        photo: req.body.photo ? req.body.photo : [],


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
const deleteColor = async (req, res) => {
    const mycolor = {
        hex_value: req.body.hex_value,
        colour_name: req.body.colour_name
    }
    const id = req.params.id;
    try {
        const product = await Product.findOne({ where: { productID: id } })
        console.log('Array of colors: ', product.color)

        for (let i = 0; i < product.color.length; i++) {
            if (product.color[i] == mycolor) {
                product.color.splice(i, 1);
            }
        }
        Product.update(product.color, {
            where: { productID: id }
        })
        // return res.json(product)
    }
    catch (err) {
        console.log(err);
        return res.status.json({ error: `Some error occurred while retrieving color ` })
    }


}
const addColor = async (req, res, next) => {
    const mycolor = {
        hex_value: req.body.hex_value,
        colour_name: req.body.colour_name
    }
    const id = req.params.id;
    try {
        const product = await Product.findOne({ where: { productID: id } })
        console.log('Array of colors: ', product)
        product.color.push(mycolor);

        Product.update(product.color, {
            where: { productID: id }
        })
    }
    catch (err) {
        console.log(err);
        return res.status.json({ error: `Some error occurred while retrieving color ` })
    }

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


module.exports = { getAllProducts, addProduct, deleteProductByID, updateProduct, getProductByID, deleteAllProducts, deleteColor, addColor };