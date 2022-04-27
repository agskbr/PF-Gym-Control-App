const { Router } = require('express');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const activity = require ('./Routes/Activity')
const recipes = require ('./Routes/Recipes')
const user = require ('./Routes/User')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
 

router.use('/activity', activity)
router.use('/recipes', recipes)
router.use('/user', user)

module.exports = router;
