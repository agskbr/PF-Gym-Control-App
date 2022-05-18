const { Router } = require('express');
const router = Router();
const { orderlineByOrderId } = require("../Controllers/Orderline");
const { orderFilterId } = require("../Controllers/Order");
const { getUserId2 } = require("../Controllers/User");
const{ 
    allHoraDia,
    allHoraDiaUser,
    horaDiaCreate,
    horaDiaId,
    horaDiaDelete,
    horaDiaUpd,
    deleteHoraDiaActivity,
    diahoraActivity,
    deleteHoraDiaUser,
    añadirDia
} = require('../Controllers/DiaHora');


//PASO 2 - para cancelar order
//sumar stock para ordenes canceladas
router.put('/addStock', async (req, res,)=> {
    let { orderId } = req.body;
    try {
        const orderline = await orderlineByOrderId(orderId);
        // console.log(orderline)
        const order = await orderFilterId(orderId)
        //console.log(order.userId)
        const user = await getUserId2(order.userId)
        //console.log(user)
        await orderline.forEach(async element => {
            const diaHora = await horaDiaId(element.diaHoraId);
            console.log(`La capacidad actual es: ${diaHora.capacity}`)
            var stock = diaHora.capacity + element.quantity;
            diaHora.capacity = stock
            console.log(`Y ahora es: ${diaHora.capacity}`)
            await diaHora.save();
            const resp = await deleteHoraDiaUser(order.userId, element.diaHoraId)
            resp ? 
            console.log(`Relación del diaHora (id: ${diaHora.id}) con el usuario ${user.name} ${user.lastName} eliminada`) :
            console.log('Relacion no eliminada')
        });
        res.send("stock restaurado y relaciones eliminadas")
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
        console.log(`La capacidad actual es ${diaHora.capacity}`)
        var stock = diaHora.capacity - quantity;
        diaHora.capacity = stock
        console.log(`Y ahora es ${diaHora.capacity}`)
        await diaHora.save();
        res.send("Capacidad del diaHora restada exitosamente");
    } catch (error) {
        return(error)
    }
});

//añador una relacion de diaHora a una actividad
router.post("/activity", async (req,res, next) => {
    try{
        const { activityId, diaHoraId } = req.body
        const activity_Name = await añadirDia(activityId, diaHoraId);
        if (activity_Name) {
            return res.send(activity_Name);
        }
        res.send("actividad No creada");
    } catch(err){
        next(err);
    }
})


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
        return(error)
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
        return(error)
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
        return(error)
    }
});


module.exports = router;


