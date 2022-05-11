const { Router } = require('express');
const router = Router();
const{ 
    allHoraDia,
    allHoraDiaUser,
    horaDiaCreate,
    horaDiaId,
    horaDiaDelete,
    horaDiaUpd,
    deleteHoraDiaActivity
} = require('../Controllers/DiaHora');


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
        const { day, hour, capacity } = req.body
        const horaDia = await horaDiaCreate(day,hour,capacity)
        return res.send(horaDia)
    } catch (error) {
        console.log(error)
    }
});

//eliminar dia especificado de una actividad especificada por idActivity y idDiaHora
router.delete('/activity/:ActivityId/:diaHoraId', async (req, res,)=> {
    const { ActivityId, diaHoraId } = req.params;
    try {
        const horaDia_Upd = deleteHoraDiaActivity(ActivityId,diaHoraId);
        res.send(horaDia_Upd);  
    } catch (error) {
        return(error)
    }
});

//modificar diaHora de una Actividad especifica :diaHoraId
//esta de mas, para eso directamente usar la ruta editar Horadia por IdHoraDia
/* router.put('/activity/:ActivityId/:diaHoraId', async (req, res,)=> {
    let { ActivityId } = req.params;
    let { horaDia } = req.body;
    try {
        const horaDia_Upd = horaDiaActivityUpd(ActivityId,diaHoraId,horaDia);
        res.send(horaDia_Upd);  
    } catch (error) {
        return(error)
    }
}); */


//funciones basicas Obtener todo/ eliminar con Id de diaHora / Modificar Con Id de diaHora---------------------------------------------------

//obtengo todos los dias-horas con sus actividades y usuarios relacionados al dia 
router.get("/", async (req, res) => {
    const horasDia = await allHoraDia();
    horasDia ? res.status(200).send(horasDia)
    : res.status(404).send("HoraDia no encontrado");
});

//obtener un horaDia por un Id
router.get("/:id", async (req, res) => {
    const {id} = req.params
    const horaDia = await horaDiaId(id)
    horaDia ? res.status(200).send(horaDia)
    : res.status(404).send("No se encontro");
});

//eliminar diaHora especifica :diaHoraId de la DB
router.delete("/:id", async (req, res) => {
    const {id} = req.params
    try {
        await horaDiaDelete(id)
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

