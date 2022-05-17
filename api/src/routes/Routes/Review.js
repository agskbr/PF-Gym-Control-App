const router = require('express').Router();
const {
    createReview,
    reviewActivityId,
    reviewUserId,
    reviewUpdate,
    allReviews,
    createRelation,
    deleteRelation
} = require('../Controllers/Review');


//todas las review de todas las actividades
router.get('/all', async (req,res) => {
    const all_Reviews = await allReviews();
    res.json(all_Reviews);
});

//crear la relacino en tre usuario y la actividad
router.post('/create', async (req, res) => {
    try {
        const { idUser, idActivity } = req.body
        const response = await createRelation(idUser,idActivity);
        res.json(response)
    } catch (error) {
        res.state(404).send(error)
    }
});

//eliminar la relacion entre usuario y la actividad
router.delete('/delete/:idUser/:idActivity', async (req, res) => {
    try {
        const { idUser, idActivity } = req.params
        console.log(idUser, idActivity)
        const response = await deleteRelation(idUser,idActivity);
        res.json(response)
    } catch (error) {
        res.state(404).send(error)
    }
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
        return(err.detail)
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
        return(error)
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
        return(error)
    }
});

//modificar review id
router.put('/:id', async (req, res,) => {
    try{
    let id = req.params.id;
    let activity  = req.body;
    return(activity)
    
        const rew = await reviewUpdate(id,activity);
        res.status(200).json(rew);
    } catch (error) {
        res.send(error)
    } 
    
})


module.exports = router;
