const {Orderline} = require('../../db')

const createOrderline = async(unitprice, subtotal, quantity, orderId, activityId) =>{
    try {
        const orderline = await Orderline.findOne({
            where: {
                orderId: orderId,
                activityId:activityId
            },
        })
        if(!orderline){
            const newOrderline = await Orderline.create({
                unitprice,
                subtotal,
                quantity,
                orderId,
                activityId
            })
            return newOrderline
        }else{
            return false
        }
    }catch (error) {
        console.log(error)
    }
}

const orderlineByOrderId = async(orderId) =>{
    try {
        const orderlineId = await Orderline.findAll({
            where:{
                orderId: orderId
            }
        })
        return orderlineId
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createOrderline,
    orderlineByOrderId
}