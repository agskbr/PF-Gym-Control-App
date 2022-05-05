const router = require('express').Router()
const {
    orederUpdate,
    allOrder,
    orderFilterId,
    orderUpdate} = require("../Controllers/Order");

//hacer ruta para traer todas las ordenes de un usuario en especifico


// finalizar compra
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