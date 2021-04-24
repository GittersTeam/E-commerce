
const users = require('./users/userController')
const customers = require('./customers/customerController')
const logins = require('./logins/loginController')
const addresses = require('./addresses/addressController')
const registrations = require('./registrations/registerController')
module.exports = {
  users,addresses,customers,logins,registrations
}
