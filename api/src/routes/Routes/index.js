const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const activity = require ('./Activity')
const recipes = require ('./Recipes')
const user = require ('./User')
const trainer = require ('./Trainer')
const mercadopago = require('./Mercadopago')
const review = require('./Review')
const order = require('./Order')
const email = require('./Email')
const orderline = require('./OrderLine')
const horaDia = require("./HoraDia")

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const router = Router();


router.use('/activity', activity)
router.use('/recipes', recipes)
router.use('/user', user)
router.use('/trainer', trainer)
router.use('/mercadopago', mercadopago)
router.use('/review', review)
router.use('/order', order)
router.use('/email', email)
router.use('/orderline', orderline)
router.use("/horaDia",horaDia)

module.exports = router;
