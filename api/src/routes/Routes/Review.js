const router = require('express').Router();
const {
    createReview,
    reviewActivityId,
    reviewUserId,
    reviewUpdate,
    allReviews
} = require('../Controllers/Review');


//todas las review de todas las actividades
router.get('/all', async (req,res) => {
    const all_Reviews = await allReviews();
    res.json(all_Reviews);
});


router.post('/activity', async (req,res,) =>{
    try {
        const { description, rating, userId, activityId} = req.body
        const review = await createReview(description, rating, userId, activityId);
        if(review){
            res.send("Review created");
        }
        res.send("Review no created / ya existente")
    } catch(err){
        console.log(err.detail)
    }
});


//review especifica para una actividad
router.get("/activity/:id", async (req,res) => {
    try{
        const {id} = req.params;
        const revActId = await reviewActivityId(id);
        revActId ?
            res.send(revActId) :
            res.send("no se econtro review en la actividad")
    }
    catch(error){
        console.log(error)
    }
});

//lo mismo que arriba pero este para ver todos los review de un usuario en especifico
router.get("/user/:id", async (req,res) => {
    try{
        const {id} = req.params;
        const revActId = await reviewUserId(id);
        revActId ?
            res.send(revActId) :
            res.send("no se econtro review en el user")
    }
    catch(error){
        console.log(error)
    }
});

//modificar review id
router.put('/:id', async (req, res,) => {
    try{
    let id = req.params.id;
    let activity  = req.body;
    console.log(activity)
    
        const rew = await reviewUpdate(id,activity);
        res.status(200).json(rew);
    } catch (error) {
        res.send(error)
    } 
    
})


module.exports = router;
