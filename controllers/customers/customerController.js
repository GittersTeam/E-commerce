const db = require("../../models");
const  Addresses = db.addresses;
const Customer = db.customers;
const Cart = db.carts;
const User = db.users;
const getAllCustomer = (req, res) => {
  Customer.findAll({
    where:{},
    include: [{model: Addresses, as: 'addresses'},{model: Cart, as:'cart'},{model:User, as: 'user'}]
  }) // convert to sql query 
    .then(data => {
      res.send({
        'data': data,
        'message': 'customers retrieve successfully'
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving customers."
      });
    });
}

const getCustomerByID = (req, res) => {

   Customer.findAll(

  {
    where:{customerID:req.userData.customerID},
    include: [{model: Addresses, as: 'addresses'},{model: Cart, as:'cart'},{model:User, as: 'user'}]
})

    .then(data => {
      res.send({
        data: data,
        msg: "This is the findByPK"
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving customer."
      });
    });
}
const updateCustomer = (req, res) => {

  const id = req.params.id;
  Customer.update(req.body, {
      where: {
        customerID: req.customer.customerID
        
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Customer was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Customer with id=" + id
      });
    });
}

module.exports = {
  updateCustomer,
  getAllCustomer,
  getCustomerByID
}