const { Review } = require('../../db');


const createReview = async (description, rating) => {
    try {
        const review = await Review.findOne({
            where: {
                name: name,
            },
        })
    
        if (!review) {
            const newReview = await Review.create({
                description,
                rating
            })

        } return newAct

    } catch (error) {
        console.log(error)
    }
}

module.exports = { createReview }