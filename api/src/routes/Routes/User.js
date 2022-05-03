const { User } = require("../../db");
const { Router } = require('express');
const router = Router();
const {
    getUserDni,
    getAllUsers,
    filterUserEmail,
    userCreate
} = require('../Controllers/User');




router.post("/", async (req,res) =>{
    try{
        const {name,lastName,email,age,phoneNumber,password,dni,image} = req.body
        const usuarioEmail = await filterUserEmail(email)
        if (!usuarioEmail) {
            const user_Create = await userCreate(name,lastName,email,age,phoneNumber,password,dni,image)
            return res.send(user_Create)
        } else return res.send(usuarioEmail);
    }catch(err){
        res.send(err);
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
        const userDni = await getUserDni(dni)
        userDni ? res.status(200).send(userDni)
        : res.status(404).send("Usuario no encontrado");
    }
});




module.exports = router;
