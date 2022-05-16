const { Router } = require('express');
const router = Router();
const {
    allActivity,
    activityId,
    createActivity,
    activityUpd,
    deleteActivity,
    activityDeleteTrainer,
    activityAddTrainer,
    activityName,
    allActivityDh
} = require('../Controllers/Activity');



//crear actividad+[NameTrainer]+[idDiasCreados] array de los Id de dias creados ejemplo: [Id1,Id2,Id3]
//se actualizo la ruta, ahora necesita recibir los nombre de los trainers por un array y
//los nombres de los ID de los dias creados (sin relaciona a ninguna actividad) por un array
router.post("/", async (req,res, next) => {
    try{
        const { name, description, video, image, price, trainers, diaHoraId } = req.body
        const activity_Name = await createActivity(name, description, video, image, price, trainers, diaHoraId);
        if (activity_Name) {
            return res.send(activity_Name);
        }
        res.send("actividad No creada");
    } catch(err){
        next(err);
    }
})

//obtener activity+diaHora
router.get("/", async (req,res) => {
    // ME GUARDO EL NAME QUE ME LLEGA POR QUERY PARA USARLO CUANDO LO NECESITE
    const {name} = req.query;
    try {
        const allCards = await allActivityDh();
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

//obtener todas las actividades+trainer+DiaHora
router.get ('/all', async (req, res,) => {
    const activity_name = await allActivity();
    if(activity_name){
        res.status(200).json(activity_name);
    }else res.status(404).send("Activity not found, try another one.");
})

//obtener actividad especificada por Nombre ingresado
router.get ('/name/:name', async (req, res,) => {
    const { name } = req.params
    const activity_name = await activityName(name);
    if(activity_name){
        res.send(activity_name);
    }else res.status(404).send("Activity not found, try another one.");
})

//obtener actividad especifica +trainer+horaDia por activityId
router.get ('/:id', async (req, res,) => {
    const id = req.params.id;
    const activity_Id = await activityId(id);
    if(activity_Id){
        res.status(200).json(activity_Id);
    }else res.status(404).send("Activity not found, try another one.");
})


//editar solamente la Actividad por activityId
router.put('/:id', async (req, res, next) => {
    let {id} = req.params
    let activity = req.body;
    try {
        const activity_Upd = await activityUpd(id,activity);
        res.status(200).json(activity_Upd);
    } catch (error) {
        next(error);
    } 
})



//eliminar actividad por activityId
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await deleteActivity(id)
        res.status(200).send('deleted activity!!')
    } catch (error) {
        return(error);
    }
});


//eliminar trainer de la actividad
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

//añadir un trainer a una actividad
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
