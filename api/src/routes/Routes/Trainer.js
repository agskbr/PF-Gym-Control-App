const { Router } = require('express');
const router = Router();
const {
  allTrainers,
  trainerId,
  trainerDelete,
  trainerCreated
} = require('../Controllers/Trainer');



router.get("/", async (req, res) => {
    const trainers = await allTrainers();
    trainers 
    ? res.status(200).send(trainers)
    : res.status(404).send("Usuario no encontrado");
});



router.get ('/:id', async (req, res,) => {
    const id = req.params.id;
    const trainer_id = await trainerId(id);
    if(trainer_id){
        /* const trainer = await allTrainers.filter(el => el.id.toString() === id);
        trainer.length ? */
      res.status(200).json(trainer_id);
    }else res.status(404).send("Trainer not found, try another one.");
})




router.delete ('/:id', async (req, res) => {    
  const {id} = req.params;   
  try {
    await trainerDelete(id);
    res.status(200).send('deleted activity!!') 
  }catch (error) {
    return(error);
  }
}) 



router.post('/', async (req, res, next) => {
  const {
    name,
    image,
    specialty,
    experience,
    Activity
  } = req.body;
  try {
    const trainer_Create = await trainerCreated(name,image,specialty,experience,Activity)
    trainer_Create ?
      res.status(200).send("Coach created successfully!!!") :
      res.status(400).send("Coach not created")
  }
  catch(error){
    next (error)
  }

})



module.exports = router;
