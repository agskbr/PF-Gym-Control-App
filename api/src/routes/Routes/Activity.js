const { Router } = require('express');
const Activity = require('../models/Activity');

router.post("/activity", async (req,res) => {
    try{
        const{ name, description, video, image, price, day, hour, capacity } = req.body
        const newAct = await Activity.create({name, description, video, image, price, day, hour, capacity }) 
        res.send (newAct)
    
    } catch(err){
        console.log(err)
    }
})

module.exports = router;
