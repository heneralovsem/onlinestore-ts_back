const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')

// router.post('/', brandController.create)
// router.delete('/:id', brandController.deleteBrand)
router.get('/', basketController.getBasket)
router.get('/devices', basketController.getBasketDevices)
router.get('/devices/price', basketController.getTotalPrice)
router.post('/devices', basketController.createBasketDevice)
router.delete('/devices/:id', basketController.deleteBasketDevice)
router.delete('devices/selected/:id', basketController.deleteAllBasketDevices)

module.exports = router