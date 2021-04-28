const db = require("../../models");
const Package = db.packages;


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
                message:
                    err.message || "Some error occurred while adding the package."
            });
        });

}
const getAllPackages = (req, res) => {
    Package.findAll()
        .then(data => {
            res.send({
                'data': data,
                'message': "list of packages",
                'status': 200
            });

        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving packages."
            });
        });


}
const getPackageByID = (req, res) => {
    Package.findOne({ where: { packageID: req.params.id } })
        .then(data => {
            data.photo = JSON.parse(data.photo)
            res.send({
                data: data,
                msg: "The package was found successfully "
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving the package."
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
                    message: `Cannot delete package, Maybe it was not found!`
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
            res.send({
                message: `${num} Packages were deleted successfully!`
            });

        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleting packages"
            });
        });
}


module.exports = { getAllPackages, addPackage, deleteAllPackages, updatePackage, getPackageByID, deletePackageByID };