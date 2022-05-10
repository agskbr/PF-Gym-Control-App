const { Router } = require('express');
const router = Router();
const {
    allActivity,
    activityId,
    createActivity,
    activityUpd,
    deleteActivity,
    activityDeleteTrainer,
    activityAddTrainer
} = require('../Controllers/Activity');


// const Activity = require('../../models/Activity');
router.post("/", async (req,res, next) => {
    try{
        const { name, description, video, image, price, trainers } = req.body
        const activityName = createActivity(name, description, video, image, price, trainers);
        if (activityName) {
            res.send("actividad Creada");
        }
        res.send("actividad Creada");
    } catch(err){
        next(err);
    }
})



router.get("/", async (req,res) => {
    // ME GUARDO EL NAME QUE ME LLEGA POR QUERY PARA USARLO CUANDO LO NECESITE
    const {name} = req.query;
    try {
        const allCards = await allActivity();
        if(name){
            const cardsName = allCards.filter(card => card.name.toLowerCase().includes(name.toLowerCase()));
            cardsName.length ? 
            res.status(200).send(cardsName) : 
            res.status(404).send('Esta card no existe');
        }else{
            res.status(200).send(allCards);
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


//obtener actividad por id
router.get ('/:id', async (req, res,) => {
    const id = req.params.id;
    const activity_Id = await activityId(id);
    if(activity_Id){
        /*const activity = await allActivities.filter(el => el.id.toString() === id);
        activity.length ?*/
        res.status(200).json(activity_Id);
    }else res.status(404).send("Activity not found, try another one.");
})


//editar activityId
router.put('/:id', async (req, res, next) => {
    let {id} = req.params
    let activity = req.body;
    try {
        const activity_Upd = activityUpd(id,activity);
        res.status(200).json(activity_Upd);
    } catch (error) {
        next(error);
    } 
})




router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await deleteActivity(id)
        res.status(200).send('deleted activity!!')
    } catch (error) {
        console.log(error);
    }
});


router.delete("/:idActivity/deleteTrainer/:idTrainer", async (req, res, next) => {
    const { idActivity, idTrainer } = req.params;
    try {
        const resp = await activityDeleteTrainer(idActivity, idTrainer)
        resp?
            res.status(200).send(`Se elimino al entrenador de la actividad`) :
            res.status(400).send("error al eliminar entrenador")
    } catch (error) {
        res.send(error);
    }
});


router.post("/:idActivity/addTrainer/:idTrainer", async (req, res, next) => {
    const { idActivity, idTrainer } = req.params;
    try {
        const resp = await activityAddTrainer(idActivity, idTrainer)
        resp?
            res.status(200).send(`Se agrego el entrenador a la actividad`) :
            res.status(400).send("error al agregar entrenador")
    } catch (error) {
        res.send(error);
    }
});




module.exports = router;
