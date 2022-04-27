const { Router } = require('express');
const Activity = require('../models/Activity');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//-------------------faltaria relacionar la actividad que estoy creando a quien??? calendario?? 
router.post("/activity", async (req,res) => {
    try{
        const{ name, description, video, image, price, day, hour, capacity } = req.body
        const newAct = await Activity.create({name, description, video, image, price, day, hour, capacity }) 
        //tengo que agregar la nueva actividad al calendario (??
        res.send (newAct)
    
    } catch(err){
        res.send(err)
    }
})


module.exports = router;
