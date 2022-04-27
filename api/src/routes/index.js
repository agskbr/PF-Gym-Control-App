const { Router } = require('express');
const router = Router();

const recipes = require ('./Routes/Recipes')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipes', recipes)

module.exports = router;
