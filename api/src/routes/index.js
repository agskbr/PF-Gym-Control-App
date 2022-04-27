const { Router } = require('express');
const Activity = require('../models/Activity');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
 
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
