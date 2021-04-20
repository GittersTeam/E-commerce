const {
  hashSync,
  genSaltSync
} = require('bcrypt');
const bcrypt = require('bcrypt')
const db = require("../../models");
const Customer = db.customers;
const User = db.users;

const addUser = async (req, res) => {
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
    userType:"Customer"
  };
  User.create(user)
    .then(data => {
      const customer = {
        phoneNumber: req.body.phoneNumber,
        birthDay: req.body.birthDay,
        userID: data.userID 
      };
      console.log(customer)
      Customer.create(customer).then(dataC =>{
        res.send({userData:data,customerData:dataC})
      }).catch(err => {
        res.status(500).send({
          message:  "Some error occurred while creating the customer."
        });
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user."
      });
    });
}

const addAdmin = async (req, res) => {

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
    res.send({
      message: 'Passwords do not match'
    });
  }

  //Check password length
  if (password.length < 6) {
    res.send({
      message: 'Password should be at least 6 characters'
    });
  }
  var salt = genSaltSync()
  password = await bcrypt.hash(req.body.password, salt)
  const admin = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: password,
    userType:"Admin"
  };
  User.create(admin)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Admin."
      });
    });
}
module.exports = {
  addUser,
  addAdmin
}