const { Router } = require('express');
const router = Router();
const{ 
    allHoraDia,
    allHoraDiaUser,
    horaDiaCreate,
    horaDiaId,
    horaDiaIdUser,
    horaDiaDelete,
    horaDiaDelete2,
    horaDiaUpd,
    updateHoraDia,
    removeUserHoraDia
} = require('../Controllers/HoraDia');

//obtengo todos los dias-horas y sus actividades
router.get("/", async (req, res) => {
    const horasDia = await allHoraDia();
    horasDia ? res.status(200).send(horasDia)
    : res.status(404).send("HoraDia no encontrado");
});

//obtener todos los dias de un usuario 
router.get("/user/:id", async (req, res) => {
    const { id } = req.params;
    const horaDiaUser = await allHoraDiaUser(id);
    horaDiaUser ? res.status(200).send(horaDiaUser)
    : res.status(404).send("No encontrado");
})

//crear un dia 
router.post("/create", async (req, res) => {
    try {
        const {days, hour, capacity, activities} = req.body
        const horaDia = await horaDiaCreate(days,hour,capacity,activities)
        return res.send(horaDia)
    } catch (error) {
        console.log(error)
    }
});

//obtener un horaDia por un Id
router.get("/:id", async (req, res) => {
    const {id} = req.params
    const horaDia = await horaDiaId(id)
    horaDia ? res.status(200).send(horaDia)
    : res.status(404).send("No se encontro");
});

//eliminar diaHora especifica :diaHoraId
router.delete("/:id", async (req, res) => {
    const {id} = req.params
    try {
        await horaDiaDelete2(id)
        res.status(200).json("HoraDia Eliminado");
    } catch (error) {
        console.log(error)
    }
});

//modificar diaHora especifica :diaHoraId
router.put('/:id', async (req, res,)=> {
    let {id} = req.params
    let horaDia = req.body;
    try {
        const horaDia_Upd = horaDiaUpd(id,horaDia);
        res.status(200).json(horaDia_Upd);  
    } catch (error) {
        console.log(error)
    }
});


module.exports = router;


