const router = require("..");
const User = require("../../models/User");

router.get("/users/:id", async (req, res) => {
    const { id } = req.params;
    if (id) {
        const userId = await getDetailsUser(id)
        ? res.status(200).send(userId)
        : res.status(404).send("Perro no encontrado");
    }
});


router.post("/user", async (req,res) =>{
    try{
        const {id, name, lastname, email, age, phoneNumber, password, dni, iUser, notifications, image } = req.body
        const newUser = await User.create ({id, name, lastname, email, age, phoneNumber, password, dni, iUser, notifications, image})
        res.send (newUser)
    } catch(err){
        console.log(err)
    }
} )