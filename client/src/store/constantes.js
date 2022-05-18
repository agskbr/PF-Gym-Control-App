//! Se exporta solo BASE_URL, en caso de querer al deploy se replaza ESA CONSTANTE por la url del deploy.

export const BASE_URL = "http://localhost:3001"; 
// https://pfgymapp-2.herokuapp.com
//http://localhost:3001
export const USER_LOAD = BASE_URL + 'users/';
export const ORDERS_URL = BASE_URL + 'orders/';
export const POST_MERCADOPAGO = BASE_URL + '/mercadopago/'
