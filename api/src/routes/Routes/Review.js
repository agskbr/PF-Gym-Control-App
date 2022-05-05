const router = require('express').Router();
const { Sequelize } = require("sequelize");
const { Review, User, Activity } = require ('../../db');
const { activityId } = require('../Controllers/Activity');
const { createReview } = require('../Controllers/Review');

//get específico, el global me parecio innecesario

router.get("activity/:id/review", async (req,res) => {
    try{
        const {id} = req.params;
        let reviews = await User.findByPk(id,{
            include: [{model:Review , include: {model: Activity}}]
        })
        return res.send(reviews) 
        }
    catch(error){
        console.log(error)
    }
});



router.post('/activity/review', async (req,res,) =>{
    try{
        const { description, rating, userId, activityId} = req.body
        const review = await createReview(description, rating, userId, activityId);
        console.log(userId)
        if(review){
            res.send("Review created");
        }
        res.send("Review created")

    } catch(err){
        console.log(err)
    }

});






module.exports = router;
