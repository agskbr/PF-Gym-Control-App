const router = require('express').Router();
const {createOrderline, orderlineByOrderId, orderlineByActivityId} = require('../Controllers/Orderline.js')

//PASO 4 - para checkout/guardar carrito nuevo
//paso 3 y 4 dentro de un forEach para recorrer la array de OrderList
//crear una linea de orden
router.post('/', async (req, res,) => {
    try {
        const { unitprice, subtotal, quantity, orderId, activityId } = req.body
        const orderline = await createOrderline(unitprice, subtotal, quantity, orderId, activityId);
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
        console.log(error)
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
        console.log(error)
    }
})



module.exports = router