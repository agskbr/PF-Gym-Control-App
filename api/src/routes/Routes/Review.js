const router = require('express').Router();
const { Sequelize } = require("sequelize");
const { Review, User, Activity } = require ('../../db');

router.get("activity/:id/reviews", async (req,res) => {
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


// router.post('/activity/:id/review', async (req,res,) =>{
//     const {
//         comment,
//         rating,
//         userId
//     } = req.body;
//     const {id} = req.params;
    
//     const {
//         comment: comment,
//         rating: rating,
//         userId:userId
//         activityId:activityId,
//     } = req.body;
//         console.log(req.body)
//     const newReview = 
        
// });
