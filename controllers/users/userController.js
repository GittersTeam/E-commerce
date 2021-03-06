const db = require("../../models");
const Customer = db.customers;
const User = db.users;
const Cart = db.carts;
const Address = db.addresses;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const atob = require('atob');
const {
  hashSync,
  genSaltSync
} = require('bcrypt');
const customer = require("../../models/customers/customer");
const user = require("../../models/users/user");


const getAllUser = (req, res) => {
  User.findAll() // convert to sql query 
    .then(data => {
      res.send({
        'data': data,
        'message': 'User retrieve successfully'
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users."
      });
    });

}


const getUserByID = (req, res) => {

  User.findByPk(req.userData.userID)
    .then(data => {
      res.send({
        data: data,
        msg: "This is the findByPK"
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving User."
      });
    });
}


const updateUser = (req, res) => {

  const id = req.userData.userID;
  User.update(req.body, {
      where: {
        userID: id
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
}
const updateUserPassword = (req, res) => {
  var password = req.body.password;
  var password2 = req.body.password2;

  if (password != password2) {
    console.log('Passwords do not match');
    return res.send({
      message: 'Passwords do not match'
    });
  }

  //Check password length
  if (password.length < 6) {
    return res.send({
      message: 'Password should be at least 6 characters'
    });

  }
  var salt = genSaltSync(10)
  password = hashSync(req.body.password, salt)

  const id = req.userData.userID;
  User.update({
      password: password
    }, {
      where: {
        userID: id
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
}
const deleteUserByID =  (req, res) => {
  const id = req.userData.userID;
  User.destroy({
      where: {
        userID: id
      }
    })
    .then(num => {
      if (req.userData.userType == 'Admin') {
        res.send({
          message: "User was deleted successfully."
        });
      }
      if (req.userData.userType == 'Customer') {
        Customer.destroy({
          where: {
            customerID: req.userData.customerID
          }
        }).then(num => {
         if (num == 1) {
            Address.destroy({
              where: {
                customerID: req.userData.customerID
              }
            }).then(() => {
              res.send({
                message: "User was deleted successfully."
              });
            })
          }
          
        })
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }

    })
    .catch(err => {
      res.status(500).send({
        message: "Error User with id=" + id
      });
    });
}

const signUp = async (req, res) => {
  const email = req.body.email
  try {
    const user = await User.findOne({
      where: {
        email: email
      }
    })
    if (user) {
      return res.send({
        message: 'Email already existed'
      })
    }
  } catch (e) {
    return res.send({
      message: e
    })
  }

  var password = req.body.password;
  var password2 = req.body.password2;
  if (password != password2) {
    return res.send({
      message: 'Passwords do not match'
    });
  }
  if (password.length < 6) {
    return res.send({
      message: 'Password should be at least 6 characters'
    });
  }

  var salt = genSaltSync(10)
  password = hashSync(req.body.password, salt)

  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: password,
    userType: "Customer"
  };
  User.create(user)
    .then(data => {
      const cart = {
        products: req.body.products,
        packages: req.body.packages
      };
      console.log(customer)
      Cart.create(cart).then(dataC => {
        const customer = {
          phoneNumber: req.body.phoneNumber,
          birthDay: req.body.birthDay,
          userID: data.userID,
          cartID: dataC.cartID
        };
        Customer.create(customer)
          .then(dataCustomer => {
            res.send({
              userData: data,
              customerData: dataCustomer,
              cartData: dataC

            });
          })
          .catch(err => {
            res.status(500).send({
              message: err.message || "Some error occurred while creating the Cart."
            });
          })
      }).catch(err => {
        res.status(500).send({
          message: "Some error occurred while creating the customer."
        });
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user."
      });
    });
}

const signIn = async function (req, res) {
  const user = await User.findOne({
    where: {
      email: req.body.email
    }
  });
  if (!user) return res.status(400).json({
    error: 'user not found'
  });
  // check user password with hashed password stored in the database
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).json({
    error: 'Invalid Password'
  });
  var object = {
    userID: user.userID,
    userType: user.userType
  }

  if (user.userType == 'Customer') {
    const customer = await Customer.findOne({
      where: {
        userID: user.userID
      }
    });
    object["customerID"] = customer.customerID
    object["cartID"] = customer.cartID
  }

  const token = jwt.sign(object, process.env.JWT_SECRET, {})
  res.json({
    data: 'singin success',
    user: user,
    token: token
  });
}

const parseJwt = function (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  var userdata = atob(base64);
  return (JSON.parse(userdata));
}

module.exports = {
  updateUser: updateUser,
  getUserByID: getUserByID,
  deleteUserByID: deleteUserByID,
  updateUserPassword: updateUserPassword,
  getAllUser: getAllUser,
  signIn: signIn,
  signUp: signUp,
  parseJwt: parseJwt
}