const db = require("../../models");
const Products = db.products;
const Package = db.packages;
const PackageProducts = db.packageProducts


const addPackage = (req, res) => {
    const package = {
        name: req.body.name,
        price: req.body.price,
        currency: req.body.currency,
        description: req.body.description,
        photo: req.body.photo ? req.body.photo : [],
    };
    Package.create(package)
        .then(data => {
            res.send({
                'data': data,
                'message': "Package was added successfully",
                'status': 200
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while adding the package."
            });
        });

}
const getAllPackages = (req, res) => {
    Package.findAll({
        include: [
            { model: Products, through: PackageProducts },
        ]
    })
        .then(data => {
            res.send({
                'data': data,
                'message': "List of packages",
                'status': 200
            });

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving packages."
            });
        });


}
const getPackageByID = (req, res) => {
    Package.findOne({
        where: { packageID: req.params.id },
        include: [
            { model: Products, through: PackageProducts },
        ]
    })
        .then(data => {
            if (data != null) {
                data.photo = JSON.parse(data.photo)
                res.send({
                    data: data,
                    msg: "The package was found successfully "
                });
            }
            else {
                res.send({
                    data: data,
                    msg: "The package was not found"
                });
            }
        })

        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving the package with id :" + packageID
            });
        });

}

const updatePackage = (req, res) => {

    const packageID = req.params.id;

    Package.update(req.body, {
        where: { packageID: packageID }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "package was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update package with id=${packageID}. Maybe package was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating package with id=" + packageID
            });
        });
}
const deletePackageByID = (req, res) => {
    const packageID = req.params.id;

    Package.destroy({
        where: { packageID: packageID }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "The package was deleted successfully."
                });
            } else {
                res.send({
                    message: `Cannot delete package with id=${packageID}. Maybe package was not found !`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleting package"
            });
        });
}
const deleteAllPackages = function (req, res) {

    Package.destroy({
        where: {},
        truncate: false
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `${num} packages were deleted successfully!`
                });
            } else {
                res.send({
                    message: `Cannot delete packages. Maybe there are no packages to delete`
                });
            }

        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleting packages."
            });
        });
}

const addProductToPackageByProductID = (req, res) => {

    const entry = {
        packageID: req.params.pid,
        productID: req.body.productID
    }

    PackageProducts.create(entry)
        .then(data => {
            res.send({
                'data': data,
                'message': "Product was added successfully",
                'status': 200
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while adding the package."
            });
        });

}
const deleteProductFromPackageByProductID = (req, res) => {
    const packageID = req.params.pid;
    const productID = req.params.id;

    PackageProducts.destroy({
        where: { packageID: packageID, productID: productID }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "The product was deleted successfully from the package."
                });
            } else {
                res.send({
                    message: `Cannot delete product, Maybe it was not found in the package!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleting package"
            });
        });
}
module.exports = {
    getAllPackages,
    addPackage,
    deleteAllPackages,
    updatePackage,
    getPackageByID,
    deletePackageByID,
    addProductToPackageByProductID,
    deleteProductFromPackageByProductID
};
