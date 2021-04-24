const departments = require('./departments/departmentController')
const categories = require('./categories/categoryController.js')
const subcategories = require('./subcategories/subcategoryController.js')
const advertisements = require('./advertisements/adsController')
const sales = require('./sales/salesController')
const reviews = require('./reviews/reviewsController')
const uploads = require('./uploads/uploadsController')
const flashDeals = require('./flashDeals/flashDealsController')
const dealProducts = require('./flashDeals/dealProductsController')

module.exports = {
    departments,
    categories,
    subcategories,
    advertisements,
    sales,
    reviews,
    flashDeals,
    dealProducts,
    uploads
}