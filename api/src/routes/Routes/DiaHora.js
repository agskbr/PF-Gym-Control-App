const { Router } = require('express');
const router = Router();
const { orderlineByOrderId } = require("../Controllers/Orderline");
const { orderFilterId } = require("../Controllers/Order");
const { getUserId } = require("../Controllers/User");
const{ 
    allHoraDia,
    allHoraDiaUser,
    horaDiaCreate,
    horaDiaId,
    horaDiaDelete,
    horaDiaUpd,
    deleteHoraDiaActivity,
    diahoraActivity
} = require('../Controllers/DiaHora');


//PASO 2 - para cancelar order
//sumar stock para ordenes canceladas
router.put('/addStock', async (req, res,)=> {
    let { orderId } = req.body;
    try {
        const orderline = await orderlineByOrderId(orderId);
        /* const order = await orderFilterId(orderId)
        const user = await getUserId(order.userId) */
        await orderline.forEach(async element => {
            const diaHora = await horaDiaId(element.diaHoraId);
            var stock = diaHora.capacity + element.quantity;
            diaHora.capacity = stock
            await diaHora.save();
            /* if (user && diaHora) {
                diaHora.removeUser(user);
            } */
        });
        res.send("stock restaurado")
    } catch (error) {
        res.send(error)
    }
});


//PASO 3 - restar stock para checkout
//paso 3 y 4 seria dentro de un forEach para recorrer todas las OrderLine
//modificar diaHora especifica :diaHoraId
router.put('/subtractStock', async (req, res,)=> {
    let { quantity, diaHoraId } = req.body;
    try {
        const diaHora = await horaDiaId(diaHoraId);
        if (diaHora.capacity < quantity) {
            return res.status(400).send("sin stock disponible");
        }
        var stock = diaHora.capacity - quantity;
        diaHora.capacity = stock
        await diaHora.save();
        res.send(diaHora);
    } catch (error) {
        console.log(error)
    }
});


//obetener los dias de una actividad especifica 
router.get("/activity/:id", async (req, res) => {
    const {id} = req.params
    const horaDia = await diahoraActivity(id)
    horaDia ? res.status(200).send(horaDia)
    : res.status(404).send("No se encontro");
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


