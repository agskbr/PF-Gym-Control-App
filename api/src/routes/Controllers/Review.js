const {
    Review,
    Activity,
    User
} = require('../../db');


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
            return false
        }
    } catch (error) {
        return(error)
    }
}


const reviewActivityId = async (activityId) => {
    try {
        let reviews = await Review.findAll({
            where: {
                activityId: activityId,
            },
        })
        return reviews 
    } catch (error) {
        return error
    }
}


const reviewUserId = async (userId) => {
    try {
        let reviews = await Review.findAll({
            where: {
                userId: userId,
            },
        })
        return reviews 
    } catch (error) {
        return false
    }
}

const reviewUpdate = async (id,review) => {
    try {
        return await Review.update(review,{   
            where: {
                id: id
            }
        })
    } catch (error) {
        return(error)
    }
}

const allReviews = async () => {
    try {
        let reviews = await Review.findAll({ include: "" })
        return reviews
    } catch (error) {
        return(error)
    }
}

const createRelation = async (idUser,idActivity) => {
    try {
        var user = await User.findByPk(idUser);
        console.log(user)
        var activity = await Activity.findByPk(idActivity);
        console.log(activity)
        if (user && activity) {
            const response = await activity.addUser(user);
            console.log(response)
            return true
        } else {
            return false
        }
    } catch (error) {
        return(error);
    }
}

const deleteRelation = async (idUser,idActivity) => {
    try {
        var user = await User.findByPk(idUser);
        var activity = await Activity.findByPk(idActivity);
        if (user && activity) {
            await activity.removeUser(user);
            return true
        } else {
            return false
        }
    } catch (error) {
        return(error);
    }
}

module.exports = {
    createReview,
    reviewActivityId,
    reviewUserId,
    reviewUpdate,
    allReviews,
    createRelation,
    deleteRelation
}