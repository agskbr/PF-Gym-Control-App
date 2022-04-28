const { Router } = require('express');

const { Activity } = require('../../db');
const router = Router();
const activitysDbInfo  = require ('../Controllers/Activity')

const Activity = require('../../models/Activity');



router.post("/activity", async (req,res) => {
    try{
        const{ name, description, video, image, price, day, hour, capacity } = req.body
        const newAct = await Activity.create({name, description, video, image, price, day, hour, capacity }) 
        res.send (newAct)
    
    } catch(err){
        console.log(err)
    }
})

router.get("/activity", async (req,res) => {
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


module.exports = router;
