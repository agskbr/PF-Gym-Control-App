const { Router } = require('express');
const router = Router();
const { horaDiaCreate } = require("../Controllers/HoraDia");
const {
    allActivity,
    activityId,
    createActivity,
    activityUpd,
    deleteActivity,
    activityDeleteTrainer,
    activityAddTrainer,
    activityName
} = require('../Controllers/Activity');
//editar diaHora de una actividad en especifico
//obtener activity+diaHora
//eliminar dia de una actividad



//crear actividad+[NameTrainer]+[idDiasCreados] array de los Id de dias creados ejemplo: [Id1,Id2,Id3]
//se actualizo la ruta, ahora necesita recibir los nombre de los trainers por un array y
//los nombres de los ID de los dias creados (sin relaciona a ninguna actividad) por un array
router.post("/", async (req,res, next) => {
    try{
        const { name, description, video, image, price, trainers, diaHoraId } = req.body

        /* const idhd = []
        const queries = [];
        horaDiaCapc.forEach((el) => {
            queries.push(horaDiaCreate(el.day, el.hour, el.capacity));
                Promise.all(queries) 
                    .then((queryResults) => {
                        queryResults.forEach((queryResult) => {
                            let response = queryResult.dataValues
                            idhd.push(response.id)
                        })
                    })
                    .then(() => response)
                    .catch((err) => console.log(err));
        })
        console.log(idhd)
        }catch (err) {
            console.log(err)
        } */
        /* horaDiaCapc.map(async (el) => {
            const respuesta = await horaDiaCreate(el.day, el.hour, el.capacity)
            idhd.push(respuesta.dataValues.id)
            console.log(respuesta.dataValues.id)
        }) */
        //console.log(idhd)
        const activity_Name = await createActivity(name, description, video, image, price, trainers, diaHoraId);
        if (activity_Name) {
            return res.send(activity_Name);
        }
        res.send("actividad No creada");
    } catch(err){
        next(err);
    }
})


//obtener todas las actividades+trainer+DiaHora
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


//obtener actividad especifica +trainer+horaDia por activityId
router.get ('/:id', async (req, res,) => {
    const id = req.params.id;
    const activity_Id = await activityId(id);
    if(activity_Id){
        /*const activity = await allActivities.filter(el => el.id.toString() === id);
        activity.length ?*/
        res.status(200).json(activity_Id);
    }else res.status(404).send("Activity not found, try another one.");
})


//editar solamente la Actividad por activityId
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



//eliminar actividad por activityId
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await deleteActivity(id)
        res.status(200).send('deleted activity!!')
    } catch (error) {
        console.log(error);
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
