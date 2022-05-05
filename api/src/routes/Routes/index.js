const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const activity = require ('./Activity')
const recipes = require ('./Recipes')
const user = require ('./User')
const trainer = require ('./Trainer')
const mercadopago = require('./Mercadopago')
const review = require('./Review')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const router = Router();


router.use('/activity', activity)
router.use('/recipes', recipes)
router.use('/user', user)
router.use('/trainer', trainer)
router.use('/mercadopago', mercadopago)
router.use('/review', review)

module.exports = router;
