const { Router } = require('express');
const { Activity, Trainer } = require('../../db');
const router = Router();
const { activitysDbInfo, } = require('../Controllers/Activity');


router.post("/", async (req,res, next) => {
    try{
        const { name, description, video, image, price, day, hour, capacity, trainers } = req.body
        
            const newAct = await Activity.create({
                name,
                description,
                video,
                image,
                price,
                day,
                hour,
                capacity,
                
            }); 

        const trainerDb = await Trainer.findAll({
            where: {
                name: trainers,}
        });
        await newAct.addTrainers(trainerDb);              
        return res.status(200).send(newAct); 
        
    } catch(err){
        next(err);
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

    router.put('/:id', async (req, res, next) => {
        let {id} = req.params
        let activity = req.body;
        try {
            let act = await Activity.update(activity, {   
                    where: {
                        id: id
                    }
            })
            return res.status(200).json({cambiado: true})
        
        } catch (error) {
            next(error);
        } 
    })

router.delete ('/:id', async (req, res) => {    
const {id} = req.params;   
try {
    await Activity.destroy({   
        where: {                                            
            id : id,
        }
    })
    res.status(200).send('deleted activity!!') 
} catch (error) {
    console.log(error);
}
}) 

module.exports = router;
