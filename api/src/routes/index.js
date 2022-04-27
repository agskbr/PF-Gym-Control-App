const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const { getCards} = require('../controllers/Cards-Controllers/controllers')
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/cards', getCards)


module.exports = router;
