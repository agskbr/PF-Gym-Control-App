const router = require('express').Router()
const {
    orederUpdate,
    allOrder,
    orderFilterId,
    orderUpdate,
    orderUserId,
    createOrder} = require("../Controllers/Order");

//para orden
//hacer ruta para traer todas las ordenes de un usuario en especifico
//crear orden

// finalizar compra
//revisar

// ruta para finalizar la compra del carrito-------------ADECUARLA A ORDER ... SACADA DE GITHUB
// router.put("/checkout/:id", (req, res) => {
//     const { state, totalPrice } = req.body;
//     const { id } = req.params;
//     Order.update(
//       {
//         state: state,
//         totalPrice: totalPrice,
//       },
//       { where: { id: id } }
//     )
//       .then((value) => {
//         const result = value[0];
//         if (result) {
//           return res.status(202).send("Element updated");
//         }
//         return res.status(400).send("Order not found!");
//       })
//       .catch((err) => {
//         return res.send({ data: err }).status(400);
//       });
//   });

//crear orden
router.post("/", async (req,res) => {
    try {
        const { totalPrice, state, userId} = req.body
        const order = await createOrder(totalPrice,state, userId);
        if(order){
            res.send("Order created");
        }
        res.send("Order not created")
    } catch(err){
        console.log(err.detail)
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




router.put("/checkout/:id", async (req, res) => {
    const { state, totalPrice } = req.body;
    const { id } = req.params;
    try {
        const order = await orederUpdate(state, totalPrice, id);
        if (order) {
            res.send("Elemento actualizado");
        }
        res.status(400).send("Orden no encontrada");
    } catch (error) {
        res.status(400).send({ data: error })
    }
});


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
            res.status(200).json(order_Filter);
        }
        res.status(400).send("orden no encotrada");    
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
            res.status(202).send("Elemento actualizado");
        }
            res.status(400).send("Orden o encontrada");
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;