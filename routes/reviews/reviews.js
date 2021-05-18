var express = require('express');
var router = express.Router();
const controller = require('../../controllers')
const isAuth = require('../../middleware/Auth');
const isCustomer = require('../../middleware/isCustomer');

router.get('/:pid', [isAuth], controller.reviews.getAllReviewsByProductID) //pid is product id 
router.get('/:pid/:id', [isAuth], controller.reviews.getReviewByIDByProductID) //pid is product id, id is review id

router.post('/', [isCustomer], controller.reviews.addReview)

router.put('/:id', [isAuth], controller.reviews.updateReview)

router.delete('/:id', [isAuth], controller.reviews.deleteReviewByID)

module.exports = router;