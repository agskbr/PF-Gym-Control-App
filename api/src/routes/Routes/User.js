const User = require("../../db");
const {Router} = require ('express');
const router = Router();
const getDetailsUser = require('../Controllers/User');
const getAllUsers = require("../Controllers/User");



router.get("/", async (req, res) => {
    const userId = await getAllUsers()
    ? res.status(200).send(userId)
    : res.status(404).send("Usuario no encontrado");
});

router.post("/", async (req,res) =>{
    try{
        const {id, name, lastName, email, age, phoneNumber, password, dni, isUser, notifications, image } = req.body
        const newUser = await User.create({id, name, lastName, email, age, phoneNumber, password, dni, isUser, notifications, image})
        res.send(newUser)
    } catch(err){
        console.log(err)
    }
} )

router.get("/dni", async (req, res) => {
    const { dni } = req.params;
    if (dni) {
        const userDni = await getDetailsUser(dni)
        ? res.status(200).send(userDni)
        : res.status(404).send("Usuario no encontrado");
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    if (id) {
        const userId = await getDetailsUser(id)
        ? res.status(200).send(userId)
        : res.status(404).send("Usuario no encontrado");
    }
});


module.exports = router;
