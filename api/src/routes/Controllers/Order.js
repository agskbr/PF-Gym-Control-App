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
//             {//
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

//obtener todas las ordenes+Users de la base de datos
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

//obtener orden de un ID especifico (orderId)
const orderFilterId = async (id) => {
    try {
        const orderFilter = await Order.findOne({
            where: {
                id: id,
            },
        })
        return orderFilter
    } catch (error) {
        console.log(error);
    }
}

//actualizar estado de una order de un Id especificado
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

//obtener ordenes de usuario sea el estado que sea de esa orden
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

//obtener cart+productos de un usuario
const orderCartUserId = async (userId) => {
    try {
        let order = await Order.findOne({
            where: {
                userId: userId,
                state: "Cart"
            },
            include: [{
                model: Activity,
            }]
        })
        return order
    } catch (error) {
        return error
    }
}

//ver si el usuario tiene un cart en caso de no tener ninguno crear la orden en state:Cart
const findOrCreateCart = async (userId) => {
    try {
        const order = await Order.findOrCreate({
            where: {
                userId: userId,
                state: "Cart"
            },
        })
        return order
    } catch (error) {
        return(error)
    }
}

//eliminar Orden de id recibido
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
//
const orderStatus = async (state) => {
    try{
    const orders = await Order.findAll({
    where: {
      state: state,
    },
    include: [
      {
        model: User,
      },
    ],
  });
  return orders;
}catch(error){
    return(error)
}
}

const orderStatusUserId = async (state, userId) => {
    try{
    const orders = await Order.findAll({
    where: {
      state: state,
      userId : userId
    },
  });
  return orders;
}catch(error){
    return(error)
}
}

/* //actualizar estado de una order de un Id especificado
const orderUpdatePrecioTotal = async (precioOrderLine, id) => {
    try {
        const orderUpd = await Order.update(
            {
                precioTotal: precioOrderLine,
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

} */


module.exports = {
    allOrder,
    orderFilterId,
    orderUpdate,
    orderUserId,
    findOrCreateCart,
    deleteOrder,
    orderCartUserId,
    orderStatus,
    orderStatusUserId
}