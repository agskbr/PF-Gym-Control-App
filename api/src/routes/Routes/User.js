const { Router } = require('express');
const router = Router();
const {
    getUserDni,
    getAllUsers,
    filterUserEmail,
    userCreate
} = require('../Controllers/User');



//obtener usuario por email
router.get("/:email", async (req,res) =>{
    try{
        const {email} = req.params
        const usuarioEmail = await filterUserEmail(email)
        if (!usuarioEmail) {
            res.send("no se encontro usuario por email")
        } else res.send(usuarioEmail);
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
