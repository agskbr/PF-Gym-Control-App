//linea de orden
//crear

const router = require('express').Router();
const {createOrderline, orderlineByOrderId} = require('../Controllers/Orderline.js')

router.post('/', async (req,res,) =>{
    try {
        const { unitprice, subtotal, quantity, orderId, activityId} = req.body
        const orderline = await createOrderline(unitprice, subtotal, quantity, orderId, activityId);
        if(orderline){
            res.send("Ordeline created");
        }
        res.send("Orderline ya existente")
    } catch(error){
        console.log(error)
    }
});

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