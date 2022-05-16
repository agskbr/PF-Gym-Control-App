const { Router } = require('express');
const router = Router();

const {
    createdCodigo,
    allDescuento,
    getCodigo,
    descuentoUpd
} = require('../Controllers/Descuento');


//crear un descuento
router.post("/", async (req,res, next) => {
    try {
        const { descuento , codigo } = req.body
        const descuentoCreado = await createdCodigo(descuento ,codigo);
        if (descuentoCreado) {
            return res.send(descuentoCreado);
        }
        res.send("descuento creado");
    } catch(err){
        next(err);
    }
})

//obtener todos los descuentos
router.get ('/all', async (req, res,) => {
    const codigos = await allDescuento();
    if(codigos){
        res.status(200).json(codigos);
    }else res.status(404).send("error get allDescuento");
})

//obtener un descuento en particular con su codigo
router.get('/:codigo', async (req, res,) => {
    const { codigo } = req.params;
    const codigoObtenido = await getCodigo(codigo);
    if(codigoObtenido){
        res.status(200).json(codigoObtenido);
    }else res.status(404).send("error get codigo");
})

//editar el codigo obtenido por su ID
router.put('/:id', async (req, res, next) => {
    let {id} = req.params
    let descuento = req.body;
    try {
        descuentoUpd(id,descuento);
        res.status(200).send("descuento realizado");
    } catch (error) {
        res.status(404).send("error modificar descuento")
    } 
})


module.exports = router;