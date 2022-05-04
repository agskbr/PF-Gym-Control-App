const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const activity = require ('./Activity')
const recipes = require ('./Recipes')
const user = require ('./User')
const trainer = require ('./Trainer')
const review = require('./Review');
const email = require ('./Email')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const router = Router();


router.use('/activity', activity)
router.use('/recipes', recipes)
router.use('/user', user)
router.use('/trainer', trainer)
router.use('/reviews', review)
router.use('/email', email)

module.exports = router;
