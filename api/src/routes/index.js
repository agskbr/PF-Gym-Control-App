const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/users/:id", async (req, res) => {
    const { id } = req.params;
    if (id) {
        const userId = await getDetailsUser()
        ? res.status(200).send(userId)
        : res.status(404).send("Perro no encontrado");
    }
});

module.exports = router;
