const {OrderLine} = require('../../db')

//crear linea de ordenLine con (unitPrice, subTotal, quantity, orderId, activityId,diaHoraId)
const createOrderline = async(unitPrice, subtotal, quantity, orderId, activityId,diaHoraId) =>{
    try {
        const orderline = await OrderLine.findOne({
            where: {
                orderId: orderId,
                diaHoraId:diaHoraId
            },
        })
        if(!orderline){
            const newOrderline = await OrderLine.create({
                unitPrice,
                subtotal,
                quantity,
                orderId,
                activityId,
                diaHoraId
            })
            return newOrderline
        }else{
            return false
        }
    }catch (error) {
        return(error)
    }
}

//obetener todas las lineas de orden de una orden en especifico con orderId
const orderlineByOrderId = async(orderId) =>{
    try {
        const orderlineId = await OrderLine.findAll({
            where:{
                orderId: orderId
            }
        })
        return orderlineId
    } catch (error) {
        return(error)
    }
}

//obtener todas las orderLine con el ActivityId
const orderlineByActivityId = async(activityId) =>{
    try {
        const orderlineActId = await OrderLine.findAll({
            where:{
                activityId: activityId
            }
        })
        return orderlineActId
    } catch (error) {
        return(error)
    }
}

module.exports = {
    createOrderline,
    orderlineByOrderId,
    orderlineByActivityId
}