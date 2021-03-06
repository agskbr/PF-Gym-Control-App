const {
    Review,
    Activity,
    User
} = require('../../db');


const createReview = async (description, rating, userId, activityId) => {
    try {
        const newReview = {
            description:description,
            rating:rating,
            userId:userId,
            activityId:activityId
        }
        const review = await Review.update(newReview,{
            where: {
                userId: userId,
                activityId:activityId
            },
        })
        return review
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
        //console.log(user)
        var activity = await Activity.findByPk(idActivity);
        //console.log(activity)
        if (user && activity) {
            await activity.addUser(user);
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