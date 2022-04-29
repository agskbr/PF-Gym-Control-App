const { Router } = require('express');
const { Activity } = require('../../db');
const router = Router();
const { activitysDbInfo } = require('../Controllers/Activity');

// const Activity = require('../../models/Activity');



router.post("/", async (req,res) => {
    try{
        const { name, description, video, image, price, day, hour, capacity } = req.body
        
        const actividad = await Activity.findOne({
            where: {
                name: name,
            },
        })

        if (!actividad) {
            const newAct = await Activity.create({
                name,
                description,
                video,
                image,
                price,
                day,
                hour,
                capacity
            }) 
            res.send (newAct)
        }else return res.send(actividad)
    } catch(err){
        console.log(err)
    }
})


router.get("/", async (req,res) => {
    // ME GUARDO EL NAME QUE ME LLEGA POR QUERY PARA USARLO CUANDO LO NECESITE
    const {name} = req.query;
    try {
        const allCards = await activitysDbInfo();
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

//--------- ver si esta ok esta ruta --------------------- falta activar el contolador getActivityInfo desde controllers
//esperando a unir con json
router.get ('/:id', async (req, res,) => {
    const id = req.params.id;
    const allActivities = await activitysDbInfo();
    if(id){
        const activity = await allActivities.filter(el => el.id.toString() === id);
        activity.length
        ? res.status(200).json(activity)
        : res.status(404).send("Activity not found, try another one.");
    }
    })

module.exports = router;
