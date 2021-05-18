const {
  hashSync,
  genSaltSync
} = require('bcrypt');
const bcrypt = require('bcrypt')
const db = require("../../models");
const User = db.users;

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
    userType: "Admin"
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

const getAdmin = (req, res) => {

  User.findAll(
 {
   where:{userType:"Admin"},
})

   .then(data => {
     res.send({
       data: data,
     });
   })
   .catch(err => {
     res.status(500).send({
       message: err.message || "Some error occurred while retrieving Admins."
     });
   });
}
module.exports = {
  addAdmin:addAdmin,
  getAdmin:getAdmin
}