const { Router } = require('express');
const router = Router();
const{ 
    allDiaHora,
    createDiaHora,
    diaHoraId,
    horaDiaDelete,
    horaDiaDelete2,
    horaDiaUpd,
    updateHoraDia,
    removeUserHoraDia
} = require('../Controllers/DiaHora');


router.get("/", async (req, res) => {
    const diaHora = await allDiaHora();
    diaHora
    ? res.status(200).send(diaHora)
    : res.status(404).send("HoraDia no encontrado");
});


// router.get("/", async (req, res) => {
//     const horaDiaUser = await allHoraDiaUser();
//     horaDiaUser ? res.status(200).send(horaDiaUser)
//     : res.status(404).send("No encontrado");
// })

// router.post("/", async (req, res) => {
//     try {
//         const {day, hour, capacity, activityId} = req.body
//         const diaHora = await createDiaHora(day, hour, capacity, activityId)
//         if(diaHora) {
//             return res.send("DiaHora creado");
//         } else {
//             return res.send("DiaHora no creado");
//         }
//     } catch (error) {
//         console.log(error)
//     }
// });

router.post("/", async (req, res) => {
    try {
        const {day, hour, capacity, activityId} = req.body
        const diaHora = await createDiaHora(day, hour, capacity, activityId)
        return res.send (diaHora)
    } catch (error) {
        console.log(error)
    }
}
)

router.get("/:id", async (req, res) => {
    const {id} = req.params
    const diaHora = await diaHoraId(id)
    diaHora ? res.status(200).send(diaHora)
    : res.status(404).send("No se encontro");
});


router.delete("/:id", async (req, res) => {
    const {id} = req.params
    try {
        await horaDiaDelete2(id)
        res.status(200).json("HoraDia Eliminado");
    } catch (error) {
        console.log(error)
    }
});

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


