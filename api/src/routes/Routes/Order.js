const router = require('express').Router()
const { orderlineByOrderId } = require("../Controllers/Orderline");
const {
    allOrder,
    orderFilterId,
    orderUpdate,
    orderUserId,
    findOrCreateCart,
    orderCartUserId,
    deleteOrder
} = require("../Controllers/Order");

//order/carrito ---------------------------------------------------------------------------
//buscar o Crear orden-carrito / 

//Buscar o crear orden/carrito
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

//Obtener la Cart + Products de un usuario
router.get("/cart/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const cartUser = await orderCartUserId(userId)
        const orderLineCart = await orderlineByOrderId(cartUser.id)
        
        /* .then((order) => {
        Orderline.findAll({
            where: {
            orderId: order.id,
            },
        }).then((orderlines) => {
            const orderLinePlusProduct = {
            product: order.products,
            orderlines: orderlines,
            orderId: order.id,
            };
            res.send(orderLinePlusProduct);
        });
        })
        .catch((err) => {
            res.send({ data: err }).status(400);
        }); */
        res.send(orderLineCart)
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