const uuid = require('uuid')
const path = require('path')
const {Device, DeviceInfo, Rating} = require('../models/models')
const ApiError = require('../error/ApiError')
class DeviceController {
    async create (req, res, next) {
        try {
            const {name, price, brandId, typeId, info} = req.body 
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name, price, brandId,typeId, img: fileName})

            if(info) {
                let deviceInfo = JSON.parse(info)
                deviceInfo.forEach(i => 
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    }))
            }
            
    
            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
       
    }

    async getAll (req, res) {
        let {brandId, typeId, limit, page, sorting} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices;
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({ order: [
                [sorting, 'DESC'],
                
        ],limit, offset} )
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({where:{brandId}, limit, offset, order: [
                [sorting, 'DESC'],
                
        ]})
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId} , limit, offset,  order: [
                [sorting, 'DESC'],
                
        ]})
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId, brandId}, limit, offset, order: [
                [sorting, 'DESC'],
                
        ]})
        }
        return res.json(devices)
    }
    async getOne (req, res) {
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            },
        )
        return res.json(device)
    }
    async deleteDevice(req, res) {
        const {id} = req.params;

        const deletedDevice = await Device.destroy({
            where: {id},
        });
        return res.json(deletedDevice)
    }
    async updateRating(req, res) {
        let {id, rating} = req.body;
            
            const updatedRating = await Device.update(
                {
                    rating,
                },
                {
                    where: {id},
                    returning: true,
                }
            );
            return res.json(updatedRating)
    }


}

module.exports = new DeviceController()