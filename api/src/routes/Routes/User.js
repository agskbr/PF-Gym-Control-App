const User = require("../../models/User");
const {Router} = require ('express');
const router = Router();
const getDetailsUser = require ('../Controllers/User')




router.post("/", async (req,res) =>{
    try{
        const {id, name, lastname, email, age, phoneNumber, password, dni, iUser, notifications, image } = req.body
        const newUser = await User.create ({id, name, lastname, email, age, phoneNumber, password, dni, iUser, notifications, image})
        res.send (newUser)
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
        : res.status(404).send("Perro no encontrado");
    }
});


module.exports = router;
