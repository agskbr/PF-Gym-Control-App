const router = require('express').Router()
const {
    allOrder,
    orderFilterId,
    orderUpdate,
    orderUserId,
    createOrder,
    deleteOrder
} = require("../Controllers/Order");

//para orden
//hacer ruta para traer todas las ordenes de un usuario en especifico
//crear orden

// finalizar compra
//revisar



//crear orden
router.post("/", async (req,res) => {
    try {
        const { totalPrice, state, userId} = req.body
        const order = await createOrder(totalPrice,state, userId);
        if(order){
            return res.send("Order created");
        }else{
            return res.send("Order not created")  
        }
    } catch(err){
        console.log(err)
    }

})

//obtener ordenes de un usuario específico
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
// //modificar estado orden 
// router.put("/checkout/:id", async (req, res) => {
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


// modificar orden id: num Order
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

//eliminar orden

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