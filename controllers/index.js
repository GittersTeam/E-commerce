
const users = require('./users/userController')
const admins = require('./admins/adminController')
const customers = require('./customers/customerController')
const logins = require('./logins/loginController')
const addresses = require('./addresses/addressController')
const registrations = require('./registrations/registerController')
module.exports = {
  users,addresses,admins,customers,logins,registrations
}
