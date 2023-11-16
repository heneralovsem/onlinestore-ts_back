const Router = require('express')
const router = new Router()
const reviewController = require('../controllers/reviewController')

router.post('/', reviewController.createReview)
router.get('/', reviewController.getAllReviews)
router.get('/rating', reviewController.getAverageRating)
router.delete('/:id', reviewController.deleteReview)


module.exports = router