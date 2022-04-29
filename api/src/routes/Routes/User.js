const { User } = require("../../db");
const { Router } = require('express');
const router = Router();
const { getDetailsUser, getAllUsers } = require('../Controllers/User');




router.post("/", async (req,res) =>{
    try{
        const {name,lastName,email,age,phoneNumber,password,dni,image} = req.body
        
        const usuario = await User.findOne({
            where: {
                email: email,
            },
        })

        if (!usuario) {
            newUser = await User.create({
                name: name,
                lastName: lastName,
                dni: dni,
                email: email,
                age: age,
                phoneNumber: phoneNumber,
                password: password,
                image: image,
            })
            console.log("usuario creado")
            return res.send(newUser)
        } else return res.send(usuario);
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

router.get("/", async (req, res) => {
    const users = await getAllUsers();
    users ? res.status(200).send(users)
    : res.status(404).send("Usuario no encontrado");
});

router.get("/:dni", async (req, res) => {
    const { dni } = req.params;
    if (dni) {
        const userDni = await getDetailsUser(dni)
        userDni ? res.status(200).send(userDni)
        : res.status(404).send("Usuario no encontrado");
    }
});


module.exports = router;
