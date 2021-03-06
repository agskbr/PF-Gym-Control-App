const router = require('express').Router()
const { orderlineByOrderId} = require("../Controllers/Orderline");
const {
    allOrder,
    orderFilterId,
    orderUpdate,
    orderUserId,
    findOrCreateCart,
    orderCartUserId,
    deleteOrder,
    orderStatus,
    orderStatusUserId,
} = require("../Controllers/Order");


//order/carrito -------------------------------------------------------------------------------------------------------------

//obtener todas las ordenes en un estado especifico 
router.get("/find/:state", async (req, res) => {   //example: http://localhost:3001/order/find/Complete
    try {
        const state=req.params.state;
        return(state)
        const orders = await orderStatus(state)
        if (orders) return res.json(orders);
    } catch (err) {
        return res.send({ data: err }).status(400);
    }
})

//obtener todas las ordenes de un estado específico de un usuario específico
router.get("/find/:state/:userId", async (req, res) => {   //example: http://localhost:3001/order/find/Cart/2
    try {
        const state=req.params.state;
        const userId = req.params.userId;
        const orders = await orderStatusUserId(state, userId)
        if (orders) return res.json(orders);
    } catch (err) {
        return res.send({ data: err }).status(400);
    }
})

//PASO 1 - para checkout 
//PASO 1 - guardar nuevo carrito -> paso 2 en OrderLine
//eliminar/vaciar carrito cuando el cliente se arrepiente y quiere vaciar carrito, si ya esta guardado lo elimina y sino
//elimina el carrito vacio
router.delete("/cart/:idUser", async (req, res) => {
    try {
        const { idUser } = req.params;
        const orderUs = await findOrCreateCart(idUser)
        await orderUs[0].destroy();
        const newOrder = await findOrCreateCart(idUser)
        res.status(200).send({ newOrderId: newOrder[0].id });
    } catch (error) {
        return res.status(400).send({ data: error });
    }
});

//PASO 2 - para checking -> "Created"
//modificar estado de orden de una orden especifica orderId y state ejm:{"state":"Complete"}
router.put("/checkout", async (req, res, next) => {
    const { state, orderId } = req.body; // 'Cart', 'Created', 'Processing', 'Canceled', 'Complete'
    //id de la order
    try {
        const orderUpd = await orderUpdate(state, orderId)
        if (orderUpd) {
            return res.status(202).send("Element updated");
        }
        return res.status(400).send("Order not found!");
    } catch (error) {
        res.send(error)
    }
})

//PASO 5 -> para checkout
//paso 3 esta en diaHora y el 4 en orderLine
//paso 3, 4 y 5 seria dentro de un forEach por cada orderLine
//suma el valor recibido del subtotal de la linea de orden al valor total de
router.put("/sumaTotal", async (req, res) => {
    const { orderId, subtotal } = req.body; // 'Cart', 'Created', 'Processing', 'Canceled', 'Complete'
    //id de la order
    try {
        const order = await orderFilterId(orderId)
        order.totalPrice = Number(order.totalPrice) + Number(subtotal);
        await order.save()
        console.log("ordenTotalPrice" , order.totalPrice)
        res.send("Precio Total de la orden modificada exitósamente");
    } catch (error) {
        res.send(error)
    }
    
})


//PASO 1 - para cancelar orden -> "Canceled"
//paso 2 en DiaHora
//cambio estado a cancelado.
router.put("/canceled/:orderId", async (req, res, next) => {
    const { orderId } = req.params;//id de la order
    const state = "Canceled";
    try {
        const orderUpd = await orderUpdate(state, orderId)
        if (orderUpd) {
            return res.status(202).send("Order Canceled");
        }
        return res.status(400).send("Order not found!");
    } catch (error) {
        res.send(error)
    }
})


//Buscar o crear carrito
router.post("/cart", async (req,res) => {
    try {
        const { userId } = req.body;
        const order = await findOrCreateCart(userId);
        if(order){
            return res.send(order); //devuelve un array con un objeto y un boleano si fue o no creado ej: [{objeto},boolean]
        }else{
            return res.send(order)  
        }
    } catch(err){
        return(err)
    }
})

//Obtener el Cart + Activity de un usuario
router.get("/cart/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const orderCartUser = await orderCartUserId(userId)
        const orderLineCart = await orderlineByOrderId(orderCartUser.id)
        const orderLinePlusProduct = {
            orderId: orderCartUser.id,
            activities: orderCartUser.activities,
            orderlines: orderLineCart,
            };
        res.send(orderLinePlusProduct)
    } catch (error) {
        res.send(error)
    }
});


//funciones basicas
//AllOrder / obtener ordenes por userId / obtener orden por Orderid/ Modificar via OrdenId / eliminar ordenId/ -------------------------------------------------------------------------------

//AllOrder
router.get("/", async (req, res, next) => {
    try {
        const all_Order = await allOrder();
        res.send(all_Order);
    } catch (error) {
        res.status(400).send({ data: error });
    }
});

//obtener todas las ordenes por userId 
router.get("/user/:id", async (req,res) => {
    try{
        const {id} = req.params;
        const orderUser = await orderUserId(id);
        orderUser ?
            res.send(orderUser) :
            res.send("order of user not found")
    }
    catch(error){
        return(error)
    }
})
// //modificar estado orden 
// router.put("/:id", async (req, res) => {
//     const { state, totalPrice } = req.body;
//     const { id } = req.params;
//     try {
//         const order = await orederUpdate(state, totalPrice, id);
//         if (order) {
//             return res.send("Elemento actualizado");
//         }
//         res.status(400).send("Orden no encontrada");
//     } catch (error) {
//         return res.status(400).send({ data: error })
//     }
// });


//AllOrder
router.get("/", async (req, res, next) => {
    try {
        const all_Order = await allOrder();
        res.send(all_Order);
    } catch (error) {
        res.status(400).send({ data: error });
    }
});


//obtener orden por id
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const order_Filter = await orderFilterId(id);
        if (order_Filter) {
            return res.status(200).json(order_Filter);
        }
        return res.status(400).send("orden no encotrada");    
    } catch (error) {
        res.status(400).send({ data: error });
    }
});


// modifica estado de la orden por orderId
router.put("/:id", async (req, res, next) => {
    const { state } = req.body;
    const { id } = req.params;
    try {
        const order_upd = await orderUpdate(state,id)
        if (order_upd) {
            return res.status(202).send("Elemento actualizado");
        }
            return res.status(400).send("Orden no encontrada");
    } catch (error) {
        res.status(400).send(error);
    }
});

//eliminar orden orderId
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await deleteOrder(id)
        res.status(200).send('Order deleted!!')
    } catch (error) {
        return(error);
    }
});


module.exports = router;