const ApiError = require('../error/ApiError')
const { Order, OrderedDevice } = require('../models/models')
class TypeController {
    async createOrder (req, res) {
        const {userName, userPhone, userEmail, totalPrice, devices, userId} = req.body
        const order = await Order.create({userName, userPhone, userEmail, totalPrice, devices, userId})

        let orderedDevices = devices
                orderedDevices.forEach(i => 
                    OrderedDevice.create({
                        orderId: order.id,
                        deviceId: i.deviceId
                    }))
        return res.json(order)
    }

    async getAllOrders (req, res) {
        const {userId} = req.query
        const orders = await Order.findAll(
            {
                where:{userId},
                include: [{model: OrderedDevice, as: 'devices'}]
                
            }
        )
        return res.json(orders)
    }
    async deleteType(req, res) {
        const {id} = req.params;

        const deletedType = await Order.destroy({
            where: {id},
        });
        return res.json(deletedType)
    }

}

module.exports = new TypeController()