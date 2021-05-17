// const db = require("../../models");
// const User = db.users;
// const bcrypt = require('bcrypt')
// const {
//   hashSync,
//   genSaltSync
// } = require('bcrypt');

// const login = async (req, res) => {

//   const email = req.body.email

//   const user = await User.findOne({
//     where: {
//       email: email
//     }
//   })
//   if (user == null) {
//     return res.send({
//       message: "check your email and password :)"
//     })
//   }
//   try {
//     var valid = await bcrypt.compare(req.body.password, user.password)
//     if (valid) {
//       return res.send({
//         message: 'Login Successfully'
//       })
//     } else {
//       return res.send({
//         message: 'check your email and password'
//       })
//     }
//   } catch {
//     res.status(500).send("error")
//   }

// }

// module.exports = {
//   login
// }