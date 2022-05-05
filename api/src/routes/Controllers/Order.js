const {
    Order,
    User,
    Activity
} = require('../../db');



const orederUpdate = async (state, totalPrice, id) => {
    try {
        const orderUpd = await Order.update(
            {
                state: state,
                totalPrice: totalPrice,
            },
            {
                where:
                {
                    id: id
                }
            }
        )
        return orderUpd;
    } catch (error) {
        console.log(error);
    }
}

const allOrder = async () => {
    try {
        const allOrder = await Order.findAll({
            include: [{model: User}], 
        })
        console.log(allOrder)
        return allOrder;
    } catch (error) {
        console.log(error);
    }
}

const orderFilterId = async (id) => {
    try {
        const orderFilter = await Order.findAll({
            where: {
                id: id,
            },
        })
        return orderFilter
    } catch (error) {
        console.log(error);
    }
}

const orderUpdate = async (state, id) => {
    try {
        const orderUpd = await Order.update(
            {
                state: state,
            },
            {
                where:
                {
                    id: id
                }
            }
        )
        return orderUpd;
    } catch (error) {
        console.log(error);
    }

} 
module.exports = {
    orederUpdate,
    allOrder,
    orderFilterId,
    orderUpdate
}