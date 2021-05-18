const db = require("../../models");
const Brand = db.brands;


const addBrand = (req, res) => {
    const brand = {
        name: req.body.name,
        logo: req.body.logo ? req.body.logo : [],

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
}
const getAllBrands = (req, res) => {
    Brand.findAll()
        .then(data => {
            res.send({
                'data': data,
                'message': "List of brands",
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
            if (data != null) {

                data.logo = JSON.parse(data.logo)
                res.send({
                    data: data,
                    msg: "The brand was found successfully "
                });
            } else {
                res.send({
                    data: data,
                    msg: "The brand was not found"
                });
            }
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
const deleteAllBrands= function (req, res) {

    Brand.destroy({
        where: {},
        truncate: false
    })

        .then(num => {
            if (num == 1) {
                res.send({
                    message: `${num} brands were deleted successfully!`
                });
            } else {
                res.send({
                    message: `Cannot delete brands. Maybe there are no brands to delete`
                });
            }

        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleting brands"
            });
        });
}


module.exports =
{
    getAllBrands,
    addBrand,
    getBrandByID,
    deleteBrandByID,
    updateBrand,
    deleteAllBrands
};