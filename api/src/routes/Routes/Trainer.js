const { Trainer } = require("../../db");
const { Router } = require('express');
const router = Router();
const {trainersDbInfo} = require('../Controllers/Trainer')



router.get("/", async (req, res) => {
    const trainers = await trainersDbInfo();
    trainers 
    ? res.status(200).send(trainers)
    : res.status(404).send("Usuario no encontrado");
});


router.get ('/:id', async (req, res,) => {
    const id = req.params.id;
    const allTrainers = await trainersDbInfo();
    if(id){
        const trainer = await allTrainers.filter(el => el.id.toString() === id);
        trainer.length
        ? res.status(200).json(trainer)
        : res.status(404).send("Trainer not found, try another one.");
    }
    })

router.delete ('/:id', async (req, res) => {    
    const {id} = req.params;   
     try {
       await Trainer.destroy({   
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
