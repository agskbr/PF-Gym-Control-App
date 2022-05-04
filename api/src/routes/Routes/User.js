const { User, } = require("../../db");
const { Router } = require('express');
const router = Router();
const {
    
    getAllUsers,
    filterUserEmail,
    userCreate,
    userUpd,
    userId
} = require('../Controllers/User');




// router.post("/", async (req,res) =>{
//     try{
//         const {name,lastName,email,age,phoneNumber,password,dni,image} = req.body
//         const usuarioEmail = await filterUserEmail(email)
//         if (!usuarioEmail) {
//             const user_Create = await userCreate(name,lastName,email,age,phoneNumber,password,dni,image)
//             return res.send(user_Create)
//         } else return res.send(usuarioEmail);
//     }catch(err){
//         res.send(err);
//     }
// })


router.post("/", async (req, res) =>{

    try {
        const {name, lastName, email, phoneNumber, password, image} = req.body
        const user_Create = await userCreate (name, lastName, email, phoneNumber, password, image)
        return res.send(user_Create)
        
    } catch (error) {
        console.log(error)
        
    }

})



router.get("/", async (req, res) => {
    const users = await getAllUsers();
    users ? res.status(200).send(users)
    : res.status(404).send("Usuario no encontrado");
});



router.get("/:id", async (req, res) => {
    const id  = req.params.id
        const user_Id = await userId(id);
        if(user_Id){
            res.status(200).json(user_Id)
        }
        else res.status(404).send("Usuario no encontrado");
    
});



router.put('/:id', async (req, res, next) => {
    let {id} = req.params
    let user = req.body;
    try {
        const user_Upd = userUpd(id,user);
        res.status(200).json(user_Upd);
    } catch (error) {
        next(error);
    } 
})

module.exports = router;
