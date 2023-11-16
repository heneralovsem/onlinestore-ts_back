const {Basket} = require('../models/models')
const {BasketDevice} = require('../models/models')

class BasketController {
    async createBasketDevice (req, res) {
        const {basketId, deviceId, price} = req.body
        const basketDevice = await BasketDevice.create({basketId, deviceId, price})
        return res.json(basketDevice)
    }

    async getBasketDevices (req, res) {
        const {basketId} = req.query
        const basketDevices = await BasketDevice.findAll({where: {basketId}})
        return res.json(basketDevices)
    }
    async getTotalPrice (req, res) {
        const {basketId} = req.query
        let prices = await BasketDevice.findAll({
            where: {basketId}
        }) 
        if (prices.length > 0) {
            let totalPrice = 0;
            prices.forEach(i => {
            totalPrice += i.price
        })
        const price = totalPrice
        return res.json(price)
        }
        else {
            let totalPrice = 0;
            return res.json(totalPrice)
        }
    }
    async getBasket (req, res) {
        const {userId} = req.query
        const basket = await Basket.findOne({
            where: {userId},
        })
        return res.json(basket)
    }
    async deleteBasketDevice(req, res) {
        const {id} = req.params;

        const deletedBasketDevice = await BasketDevice.destroy({
            where: {id},
        });
        return res.json(deletedBasketDevice)
    }
    async deleteAllBasketDevices(req, res) {
        const {basketId} = req.params
        const deletedBasketDevices = await BasketDevice.destroy({
            where: {basketId}
        });
        return res.json(deletedBasketDevices)
    }
    

}

module.exports = new BasketController()