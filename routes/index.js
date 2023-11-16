const Router = require('express')
const router = new Router()
const deviceRouter = require('./deviceRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const basketRouter = require('./basketRouter')
const reviewRouter = require('./reviewRouter')
const orderRouter = require('./orderRouter')

router.use('/user', userRouter)
router.use('/brand', brandRouter)
router.use('/type', typeRouter)
router.use('/device', deviceRouter)
router.use('/basket', basketRouter)
router.use('/review', reviewRouter )
router.use('/order',  orderRouter )

module.exports = router