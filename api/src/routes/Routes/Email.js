const router = require("express").Router();
const { Activity, Review, User, Order } = require("../../db");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
//const {USER_MAIL, USER_PASS} = process.env;

//turn on less security app
// transporter = dependiendo de si se usa smt, necesitas crear una conexion
//se puede usar mailtrap
// declarando la siguient function
//TRANSPORT responsable de enviar mails

let mailtransporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: "",
        pass: "",
    },
})

let details = {
    from: "",
    to: "",
    subject: "testing the nodemaier",
    text: " testing the first sender"
}

mailtransporter.sendMail(details, (err) => {
    if(err){
        console.log("it has an error", err)
    }else{
        console.log("email sent!")
    }
})

// const createTrans = () => {  
    //service : "gmail"
    //auth:{
        //user:"pones un mail"
        //passw:""
    //}

// })



//const sendMail = async () =>{
    //---- basicamente es el mail //
    //con from: (el mail que puse arriba en user)
    // to: si son varios correos los pongo en array
    // subject:
    //html --> cuerpo del correo <b> Hola mundo </b>


//}

//mailtransporter.sendMail(details,(err) =>{
//     if(err){
//         console.log("it has an error", err)
//     }else{
//         console.log("email sent")
//     }
// })

//exportar funcion ----
//puedo chequearlo con postman

//nodemailer-express-handlebars to generate html emails.