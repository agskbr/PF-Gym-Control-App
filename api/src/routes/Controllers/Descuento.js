const {
    Descuento
} = require('../../db');


const createdCodigo = async (descuento ,codigo) => {
    try {
        const descuentoEncontrado = await Descuento.findOne({
            where: {
                codigo: codigo,
            }
        })
        if (!descuentoEncontrado) {
            const newDescuento = await Descuento.create({
                codigo,
                descuento
            })
            return newDescuento
        }
        return descuentoEncontrado
    } catch (err) {
        return(err);
    }
}

const allDescuento = async () => {
    try {
        return await Descuento.findAll({
            include:""
        })
    } catch (err) {
        return(err);
    }
}


const getCodigo = async (codigo) => {
    try {
        return await Descuento.findOne({
            where: {
                codigo: codigo
            }
        })
    } catch (err) {
        return(err);
    }
}

const descuentoUpd = async (id,descuento) => {
    try {
        return await Descuento.update(descuento,{   
            where: {
                id: id
            }
        })
    } catch (error) {
        return(error)
    }
}


module.exports = {
    createdCodigo,
    allDescuento,
    getCodigo,
    descuentoUpd
}