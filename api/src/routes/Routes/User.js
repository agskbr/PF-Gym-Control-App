const {Router} = require ('express');
const router = Router();
const getDetailsUser = require('../Controllers/User')


router.get("/users/:id", async (req, res) => {
    const { id } = req.params;
    if (id) {
        const userId = await getDetailsUser(id)
        ? res.status(200).send(userId)
        : res.status(404).send("Perro no encontrado");
    }
});

module.exports = router;