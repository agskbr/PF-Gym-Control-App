const router = require('express').Router();
const { getUserId } = require("../Controllers/User");
const { horaDiaId } = require("../Controllers/DiaHora");
const {createOrderline, orderlineByOrderId, orderlineByActivityId} = require('../Controllers/Orderline.js')

//PASO 4 - para checkout
//Desde el front recorrer el array de orderlist con un forEach y crear una linea de orden por elemento
router.post('/checkout', async (req, res,) => {
    try {
        const {
            userId,
            diaHoraId,
            unitprice,
            subtotal,
            quantity,
            orderId,
            activityId
            //
        } = req.body
        
        const orderline = await createOrderline(unitprice, subtotal, quantity, orderId, activityId,diaHoraId);
        
        await useraddDiaHora(userId,diaHoraId)
        /* const usuario = await getUserId(userId);
        const diahora = await horaDiaId(diaHoraId);
        await diahora.addUsers(usuario) */;

        if (orderline) {
            return res.send("Ordeline created");
        }
        res.send("Orderline ya existente")
    } catch (error) {
        console.log(error)
    }
});

//obtener lineas de orden de una actividad con activityId
router.get('/activity/:activityId', async(req,res) =>{
    try {
        const {activityId} = req.params
        const orderlineActId = await orderlineByActivityId(activityId)
        orderlineActId ?
        res.send(orderlineActId)
        : res.send("No se encontro orderline en la actividad")
    } catch (error) {
        return(error)
    }
})

//obtener lineas de orden de una orden especifica
router.get('/:orderId', async(req,res) =>{
    try {
        const {orderId} = req.params
        const orderlineId = await orderlineByOrderId(orderId)
        orderlineId ?
        res.send(orderlineId)
        : res.send("No se encontro orderline en la orden")
    } catch (error) {
        return(error)
    }
})

//PASO 2 para guardar carrito nuevo
//Desde el front recorrer un array de orderlist y por cada elemento crear/guardar una orderline
router.post('/cart', async (req, res,) => {
    try {
        const {
            userId,
            diaHoraId,
            unitprice,
            subtotal,
            quantity,
            orderId,
            activityId
        } = req.body
        const orderline = await createOrderline(unitprice, subtotal, quantity, orderId, activityId,diaHoraId);
        res.send(orderline)
    } catch (error) {
        return(error)
    }
});

module.exports = router