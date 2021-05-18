const db = require("../../models");
const Address = db.addresses;
const Customer = db.customers;
const User = db.users;
const getAddress = (req, res) => { //is admin

    Address.findAll({
        where:{},
        include:{model: Customer, as: 'customer'}
    }) // convert to sql query
        .then(data => {
            res.send({
                'data': data,
                'message': 'Address retrieve successfully'
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });
}

const getAddressForOneCustomerByID = (req, res) => { //is customer

    Address.findAll({
        where:{customerID: req.customer.customerID},
        include:{model: Customer, as: 'customer'}            
        })
        .then(data => {
            res.send({
                data: data,
                msg: "This is the findByPK"
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Address."
            });
        });
}

const addAddress = (req, res) => { // is customer

    const address = {
        addressLine1: req.body.addressLine1,
        addressLine2: req.body.addressLine2,
        city: req.body.city,
        customerID: req.customer.customerID,
        postalCode: req.body.postalCode,
    };
    Address.create(address)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the address."
            });
        });
}
const updateAddress = (req, res) => {

    const id = req.body.addressID;
    Address.update(req.body, {
            where: {
                addressID:id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Address was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Address with id=${id}. Maybe Address was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Address with id=" + id
            });
        });
}

const deleteAddressByID = (req, res) => {

    const id = req.params.id;
    Address.destroy({
            where: {
                addressID: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "address was deleted successfully."
                });
            } else {
                res.send({
                    message: `Cannot delete address with id=${id}. Maybe address was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleting address with id=" + id
            });
        });
}

const deleteAllAddress = (req, res) => {
    const customerID = req.customer.customerID
    Address.destroy({
            where: {
                customerID: customerID
            },
            truncate: false
        })
        .then(num => {
            res.send({
                message: `${num} address were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleting address"
            });
        });
}

module.exports = {
    addAddress:addAddress,
    getAddress:getAddress,
    getAddressForOneCustomerByID:getAddressForOneCustomerByID,
    deleteAllAddress:deleteAllAddress,
    deleteAddressByID:deleteAddressByID,
    updateAddress:updateAddress
}