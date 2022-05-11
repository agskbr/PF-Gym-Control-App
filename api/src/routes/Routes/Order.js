const router = require('express').Router()
const { orderlineByOrderId } = require("../Controllers/Orderline");
const {
    allOrder,
    orderFilterId,
    orderUpdate,
    orderUserId,
    findOrCreateCart,
    orderCartUserId,
    deleteOrder,
    orderStatus,
    orderStatusUserId
} = require("../Controllers/Order");
const {
    Orderline,
} = require('../../db');

//falta checkout 
//modificar estado a cancelado volviendo sumando el stock correspondiente



//order/carrito -------------------------------------------------------------------------------------------------------------


//obtener todas las ordenes en un estado especifico 
router.get("/find/:state", async (req, res) => {   //example: http://localhost:3001/order/find/Complete
    try {
      const state=req.params.state;
      console.log(state)
      const orders = await orderStatus(state)
      if (orders) return res.json(orders);
    } catch (err) {
      return res.send({ data: err }).status(400);
    }

})
//obtener todas las ordenes de un estado específico de un usuario específico
router.get("/find/:state/:userId", async (req, res) => {   //example: http://localhost:3001/order/find/Complete/2
    try {
      const state=req.params.state;
      const userId = req.params.userId;
      const orders = await orderStatusUserId(state, userId)
      if (orders) return res.json(orders);
    } catch (err) {
      return res.send({ data: err }).status(400);
    }

})




//eliminar carrito cuando el cliente se arrepiente y quiere vaciar carrito, si ya esta guardado lo elimina y sino
//elimina el carrito vacio
router.delete("/cart/:idUser", async (req, res) => {
    try {
      const { idUser } = req.params;
      const orderUs = await findOrCreateCart(idUser)
      const orderDeleted = await orderUs[0].destroy();
      res.status(200).send("Carrito está vacío");
    } catch (error) {
      return res.status(400).send({ data: error });
    }
    
  });


//modificar estado de orden de una orden especifica orderId y state ejm:{"state":"Complete"}
router.put("/state/:id", async (req, res, next) => {
    const { state } = req.body; // 'Cart', 'Created', 'Processing', 'Canceled', 'Complete'
    const { id } = req.params;
    try {
        const orderUpd = await orderUpdate(state, id)
            if (orderUpd) {
                return res.status(202).send("Element updated");
            }
            return res.status(400).send("Order not found!");
        } catch (error) {
            
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

//Realizar checkout cuardando cambios
// (agregando actividades y modificando cantidades de las orderline)
//en orden ->  precioTotal
//en lineaDeOrden -> Subtotal / Precio unitario / cantidad
//verificar estado de stock
router.put("/checkout/:userId", async (req, res) => {
    const { userId } = req.params;
    const { orderlineId, orderlineQuantity } = req.body; // Se trigerean desde el body los campos de la Orderline
    try {
        const OrderCart = await findOrCreateCart(userId)
        const orderLine = await orderlineByOrderId(OrderCart.id)
        const orderlineToChange = await Orderline.findByPk(orderlineId);






        return orderlineToChange;
    }catch (err) {
        return res.send({ data: err }).status(400);
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
        revActId ?
            res.send(orderUser) :
            res.send("order of user not found")
    }
    catch(error){
        console.log(error)
    }
})

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


// modificar orden orderId
router.put("/:id", async (req, res, next) => {
    const { state } = req.body;
    const { id } = req.params;
    try {
        const order_upd = await orderUpdate(state,id)
        if (order_upd) {
            return res.status(202).send("Elemento actualizado");
        }
            return res.status(400).send("Orden o encontrada");
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
        console.log(error);
    }
});


module.exports = router;