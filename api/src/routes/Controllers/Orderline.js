const {OrderLine} = require('../../db')

const createOrderline = async(unitprice, subtotal, quantity, orderId, activityId) =>{
    try {
        const orderline = await OrderLine.findOne({
            where: {
                orderId: orderId,
                activityId:activityId
            },
        })
        if(!orderline){
            const newOrderline = await OrderLine.create({
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
        const orderlineId = await OrderLine.findAll({
            where:{
                orderId: orderId
            }
        })
        return orderlineId
    } catch (error) {
        console.log(error)
    }
}

const orderlineByActivityId = async(activityId) =>{
    try {
        const orderlineActId = await OrderLine.findAll({
            where:{
                activityId: activityId
            }
        })
        return orderlineActId
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createOrderline,
    orderlineByOrderId,
    orderlineByActivityId
}