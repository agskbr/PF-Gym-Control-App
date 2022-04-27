const {Router} = require ('express');
const router = Router();
const getDetailsUser = require('../Controllers/User')


router.get("/users/:dni", async (req, res) => {
    const { dni } = req.params;
    if (dni) {
        const userDni = await getDetailsUser(dni)
        ? res.status(200).send(userDni)
        : res.status(404).send("usuario no encontrado");
    }
});

module.exports = router;