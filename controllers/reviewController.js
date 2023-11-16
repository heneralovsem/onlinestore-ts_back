const {Review} = require('../models/models')
const ApiError = require('../error/ApiError')
class ReviewController {
    async createReview (req, res) {
        const {deviceId, rating, text, date, userId} = req.body
        const review = await Review.create({deviceId ,rating, text, date, userId})
        return res.json(review)
    }

    async getAllReviews (req, res) {
        const {deviceId} = req.query
        const reviews = await Review.findAll(
            {
                where:{deviceId} 
                
            }
        )
        return res.json(reviews)
    }
    async getAverageRating (req, res) {
        const {deviceId} = req.query
        let ratings = await Review.findAll({
            where: {deviceId}
        }) 
        if (ratings.length > 0) {
            let sum = 0;
            ratings.forEach(i => {
            sum += i.rating
        })
        const averageRating = sum / ratings.length
        return res.json(averageRating.toFixed(1))
        }
        else {
            const averageRating = 0;
            return res.json(averageRating)
        }
        
        
        
    }
    async deleteReview(req, res) {
        const {id} = req.params;

        const deletedReview = await Review.destroy({
            where: {id},
        });
        return res.json(deletedReview)
    }

}

module.exports = new ReviewController()