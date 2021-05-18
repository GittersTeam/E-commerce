const users = require('./users/userController')
const customers = require('./customers/customerController')
const logins = require('./logins/loginController')
const addresses = require('./addresses/addressController')
const admins = require('./admins/adminController')
const products = require('./products/productController')
const brands = require('./brands/brandController')
const packages = require('./packages/packageController')
const carts = require('./carts/cartController.js')
const orders = require('./orders/orderController.js')
const departments = require('./departments/departmentController')
const categories = require('./categories/categoryController.js')
const subcategories = require('./subcategories/subcategoryController.js')
const advertisements = require('./advertisements/adsController')
const sales = require('./sales/salesController')
const reviews = require('./reviews/reviewsController')
const uploads = require('./uploads/uploadsController')
const flashDeals = require('./flashDeals/flashDealsController')

module.exports = {
  departments,
  categories,
  subcategories,
  advertisements,
  sales,
  reviews,
  flashDeals,
  uploads,
  orders,
  carts,
  products,
  brands,
  packages,
  users,
  addresses,
  customers,
  logins,
  admins

}