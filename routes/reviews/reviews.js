var express = require('express');
var router = express.Router();
const controller = require('../../controllers')
const isAuth = require('../../middleware/Auth');

router.get('/', [isAuth], controller.reviews.getAllReviews) //Get all reviews for a product by product id
router.get('/:id', [isAuth], controller.reviews.getReviewByID) //get a review by id for a product by id

router.post('/', [isAuth], controller.reviews.addReview)

router.put('/:id', [isAuth], controller.reviews.updateReview)

router.delete('/:id', [isAuth], controller.reviews.deleteReviewByID)

module.exports = router;