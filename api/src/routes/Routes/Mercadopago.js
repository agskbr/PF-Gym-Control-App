const Router = require('express')
const router = Router()

// -------------------------- MERCADOPAGO ----------------------------------- //

// SDK de Mercado Pago
const mercadopago = require('mercadopago');
// Agrega credenciales

router.post("/", (req, res, next) => {
    // Crea un objeto de preferencia
    const products = req.body
    //console.log(products)
    mercadopago.configure({
      access_token: 'APP_USR-4956501168084278-050317-2dacf17c8364126a0177a1ef5846ee9e-1117263864'
    });
  const url = "http://localhost:3000"
  //http://localhost:3000
  //https://pf-gym-final.vercel.app

    let preference = {
      items: [],
      back_urls: {
        success: `${url}/sociodashboard`, // /home
        failure: `${url}/sociodashboard`,
        pendind: `${url}/sociodashboard`,
      },
      auto_return: "all",
    };
  
    const addPreference = products.forEach((el) => {
      preference.items.push({
        title: el.name,
        unit_price: parseInt(el.price),
        quantity: parseInt(el.count)
      })
    })
  
    mercadopago.preferences.create(preference)
      .then((response) => {
        // console.log(response)
        res.send(response.body.init_point)
      }).catch((error) => {
        return(error)
      });
  })
  
  module.exports = router;