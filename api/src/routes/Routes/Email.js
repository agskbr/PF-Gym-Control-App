const router = require("express").Router();
const { Activity, Review, User, Order } = require("../../db");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
//const {USER_MAIL, USER_PASS} = process.env;
const UserMail = "gymcontrol12@gmail.com"
const Pass = "Proyectofinal2022"
//turn on less security app
// transporter = dependiendo de si se usa smt, necesitas crear una conexion
//se puede usar mailtrap
// declarando la siguient function
//TRANSPORT responsable de enviar mails




router.post('/:emailType', async (req,res) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: UserMail,
            pass: Pass,
        },

    })

    const emailType = req.params.emailType;
    let mailOptions;
    console.log(req.body.user.email)

    if (emailType === "welcome") {
        mailOptions = {
          from: UserMail,
          to: req.body.user.email,
          subject: "Bienvenid@",
          html:
            `<div id="container" style="width: 100%; font-family: sans-serif; font-weight: normal; ">
                    <div style="width: 100%; max-width: 700px; margin: auto; ">
                        <div style="background-color: #eb4e27; text-align: center; padding: 0.7rem 0;">
                            <h1 style="color: white; font-family: sans-serif; font-weight: normal;">Gym Control</h1>
                         </div>
                
              <div style="text-align: center; padding: 0 0.72rem; padding-top: 2.5rem;background-color: rgba(253,237,233,.98);">
              <p style="color: black; margin-bottom: 1.4rem; font-size: 1rem;">&iexcl;
                                        Bienvenid@   ` +
            req.body.user.name +
            `  ` +
            req.body.user.lastname +
            `  !
            <hr>
            <p style= "color: #eb4e27;" >
            Gracias por contar con nosotr@s!</p>
            <hr>
            <small>En caso de cualquier inquietud, por favor contactanos en: gymcontrol12@gmail.com</small>`,
        };
    }
    else if (emailType === "forgotPassword") {
        mailOptions = {
          from: UserMail,
          to: req.body.user.email,
          subject: "Link para restaurar contraseña",
          html:
            `<div id="container" style="width: 100%; font-family: sans-serif; font-weight: normal; ">
            <div style="width: 100%; max-width: 700px; margin: auto; ">
                <div style="background-color: #eb4e27; text-align: center; padding: 0.7rem 0;">
                    <h1 style="color: white; font-family: sans-serif; font-weight: normal;">Gym Control</h1>
                 </div>
                
              <div style="text-align: center; padding: 0 0.72rem; padding-top: 2.5rem; background-color: rgba(253,237,233,.98)">
              <p style="color: #4f5154; margin-bottom: 1.4rem; font-size: 1rem;">&iexcl;
                                        Hola   ` +
            req.body.user.name +
            `  ` +
            req.body.user.lastname +
            `  !` +
            `Este es su enlace para la recuperación de contraseña, recuerde que es de un solo uso` +
            `http://localhost:3000/users/forgotPassword/?` +
            req.body.user.emailHashed +
            ` ` +
            `No compartir este link
            <hr>
            <p>
            Gracias por contar con nosotr@s!</p>
            <hr>
            <small>En caso de cualquier inquietud, por favor contactanos en: gymcontrol12@gmail.com</small>`,
        };
      } else if (emailType === "orderCreated") {
        const { user, info } = req.body;
        mailOptions = {
          from: UserMail,
          to: user.email,
          subject: "Estado de orden",
          html: `<div id="container" style="width: 100%; font-family: sans-serif; font-weight: normal; ">
          <div style="width: 100%; max-width: 700px; margin: auto; ">
              <div style="background-color: #eb4e27; text-align: center; padding: 0.7rem 0;">
                  <h1 style="color: white; font-family: sans-serif; font-weight: normal;">Gym Control</h1>
               </div>
          
          <div style="text-align: center; padding: 0 0.72rem; padding-top: 2.5rem; background-color: rgba(253,237,233,.98)">
          <p style="color: #4f5154; margin-bottom: 1.4rem; font-size: 1rem;">&iexcl;
          Hola ${user.name}  ${user.lastname}  !
          <h3>Tu orden fue creada con éxito </h3>
          Order N° ${info.orderId}
          <hr>
                 
          <h3>Precio total: ${info.totalPrice}</h3>
          <hr>
          <p> Si deseas ver los detalles de tu orden, por favor regrese a nuestra página!! </p>
          <p>
          Gracias por contar con nosotr@s</p>
          <hr>
          <small>En caso de cualquier inquietud, por favor contactanos en: gymcontrol12@gmail.com</small>
          `,
        };
      } else if (emailType === "orderComplete") {
        const { user, info } = req.body;
        mailOptions = {
          from: UserMail,
          to: user.email,
          subject: "Confirmación de compra",
          html: `<div id="container" style="width: 100%; font-family: sans-serif; font-weight: normal; ">
          <div style="width: 100%; max-width: 700px; margin: auto; ">
              <div style="background-color: #eb4e27; text-align: center; padding: 0.7rem 0;">
                  <h1 style="color: white; font-family: sans-serif; font-weight: normal;">Gym Control</h1>
               </div>
          <div style="text-align: center; padding: 0 0.72rem; padding-top: 2.5rem; background-color:rgba(253,237,233,.98)">
          <p style="color: #4f5154; margin-bottom: 1.4rem; font-size: 1rem;">&iexcl;
          Hola ${user.name}  ${user.lastname}  !
          <h3>Tu orden fue pagada con éxito </h3>
          Order N° ${info.orderId}
          <hr>
                 
          <h3>Precio total: ${info.totalPrice}</h3>
          <hr>
          <p> Si deseas ver los detalles de tu orden, por favor regrese a nuestra página!! </p>
          <p>
          Gracias por tu compra!</p>
          <hr>
          <small>En caso de cualquier inquietud, por favor contactanos en: gymcontrol12@gmail.com</small>
          `,
        };
      }






    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          res.send(err.message);
        } else {
          //console.log('HOLA', mailOptions)
          res.send("email has been send");
        }
    })  






});

module.exports = router
   
  



// let mailtransporter = nodemailer.createTransport({
//     service:"gmail",
//     auth:{
//         user: "nannini.eug@gmail.com",
//         pass: "",
//     },
// })

// let details = {
//     from: "",
//     to: "",
//     subject: "testing the nodemaier",
//     text: " testing the first sender"
// }

// mailtransporter.sendMail(details, (err) => {
//     if(err){
//         console.log("it has an error", err)
//     }else{
//         console.log("email sent!")
//     }
// })

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