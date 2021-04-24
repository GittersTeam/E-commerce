var express = require('express');
var router = express.Router();
const controller = require('../../controllers')

router.get('/', controller.reviews.getAllReviews)
router.get('/:id', controller.reviews.getReviewByID)

router.post('/', controller.reviews.addReview)

router.put('/:id', controller.reviews.updateReview)

router.delete('/:id', controller.reviews.deleteReviewByID)

module.exports = router;