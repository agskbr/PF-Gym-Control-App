const {
    Order,
    User,
    Activity
} = require('../../db');



// const orederUpdate = async (state, totalPrice, id) => {
//     try {
//         const orderUpd = await Order.update(
//             {
//                 state: state,
//                 totalPrice: totalPrice,
//             },
//             {
//                 where:
//                 {
//                     id: id
//                 }
//             }
//         )
//         return orderUpd;
//     } catch (error) {
//         console.log(error);
//     }
// }

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

const orderUserId = async (userId) => {
    try {
        let reviews = await Order.findAll({
            where: {
                userId: userId,
            },
        })
        return reviews 
    } catch (error) {
        return error
    }
}
const createOrder = async (totalPrice, state, userId) => {
    try {
        const order = await Order.findOne({
            where: {
                userId: userId,
            },
        })
        if (!order) {
            const newOrder = await Order.create({
                totalPrice,
                state,
                userId
            })
            return newOrder
        }else{
            return false
        }
    } catch (error) {
        return(error)
    }
}

const deleteOrder = async (id) => {
    try {
        await Order.destroy({   
            where: {                                            
                id : id,
            }
        })
    } catch (error) {
        return error
    }
}


module.exports = {
    allOrder,
    orderFilterId,
    orderUpdate,
    orderUserId,
    createOrder,
    deleteOrder
}