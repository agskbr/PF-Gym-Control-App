const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



const activity = require ('./Activity')
const recipes = require ('./Recipes')
const user = require ('./User')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const router = Router();


router.use('/activity', activity)
router.use('/recipes', recipes)
router.use('/user', user)

module.exports = router;
