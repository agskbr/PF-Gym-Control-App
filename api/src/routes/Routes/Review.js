const router = require('express').Router();
const {
    createReview,
    reviewActivityId,
    reviewUserId
} = require('../Controllers/Review');


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


//actividad espepcifica para una actividad
router.get("/activity/:id", async (req,res) => {
    try{
        const {id} = req.params;
        const revActId = await reviewActivityId(id);
        revActId ?
            res.send(revActId) :
            res.send(revActId);
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
            res.send("no se econtro review en la actividad")
    }
    catch(error){
        console.log(error)
    }
});

//todas las review de todas las actividades, no se si seria necesario esta ruta
// o esta hecha aun 
/* router.get("/activity ", async (req,res) => {
    try{
        let reviews = await Review.findAll({
            include: {
                model: User,
                attributes: ["name"]
            }
        })
        return res.send(reviews) 
        }
    catch(error){
        console.log(error)
    }
}); */


module.exports = router;
