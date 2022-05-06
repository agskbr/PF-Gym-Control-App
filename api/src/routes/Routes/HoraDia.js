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


router.get("/", async (req, res) => {
    const horasDia = await allHoraDia();
    horasDia ? res.status(200).send(horasDia)
    : res.status(404).send("HoraDia no encontrado");
});


router.get("/", async (req, res) => {
    const horaDiaUser = await allHoraDiaUser();
    horaDiaUser ? res.status(200).send(horaDiaUser)
    : res.status(404).send("No encontrado");
})

router.post("/", async (req, res) => {
    try {
        const {days,hour, capacity, availability, activities} = req.body
        const horaDia = await horaDiaCreate(days,hour,capacity,availability,activities)
        return res.send(horaDia)
    } catch (error) {
        console.log(error)
    }
});

router.get("/:id", async (req, res) => {
    const {id} = req.params
    const horaDia = await horaDiaId(id)
    horaDia ? res.status(200).send(horaDia)
    : res.status(404).send("No se encontro");
});

router.get("/:id", async (req, res) => {
    const {id} = req.params
    const horaDiaUser = await horaDiaIdUser(id)
    horaDiaUser ? res.status(200).send(horaDiaUser)
    : res.status(404).send("No se encontro usuario");
});

router.delete("/:id", async (req, res) => {
    const {id} = req.params
    try {
        await horaDiaDelete(id)
        res.status(200).json("HoraDia Eliminado");
    } catch (error) {
        console.log(error)
    }
});

