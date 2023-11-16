const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')

router.post('/', orderController.createOrder)
router.get('/', orderController.getAllOrders)
// router.get('/rating', reviewController.getAverageRating)
// router.delete('/:id', reviewController.deleteReview)


module.exports = router