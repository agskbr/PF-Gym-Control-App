const { Review } = require('../../db');


const createReview = async (description, rating, userId, activityId) => {
    try {
        const review = await Review.findOne({
            where: {
                userId: userId,
                activityId:activityId
            },
        })
    
        if (!review) {
            const newReview = await Review.create({
                description,
                rating,
                activityId,
                userId
            })
            return newReview


        }else{
            return ("review ya existente")
        }

    } catch (error) {
        console.log(error)
    }
}

module.exports = { createReview }