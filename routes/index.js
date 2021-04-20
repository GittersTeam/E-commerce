var express = require('express');
<<<<<<< HEAD
var unirest = require("unirest");
var router = express.Router();
var cartRouter = require('./carts/carts');
 var orderRouter = require('./orders/orders');
router.use('/carts', cartRouter);
router.use('/orders', orderRouter);

module.exports = router;
=======
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;
>>>>>>> 38da3185af61e41489924d9606d1199b869264e0
