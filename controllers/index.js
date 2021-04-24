const carts= require('./carts/cartController.js')
const orders = require('./orders/orderController.js')

const advertisements = require('./advertisements/adsController')
const sales = require('./sales/salesController')
const reviews = require('./reviews/reviewsController')
const uploads = require('./uploads/uploadsController')
const flashDeals = require('./flashDeals/flashDealsController')
const dealProducts = require('./flashDeals/dealProductsController')


module.exports = {
    advertisements,
    sales,
    reviews,
    flashDeals,
    dealProducts,
    uploads,
    orders,carts
}
