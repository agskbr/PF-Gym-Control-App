import axios from "axios";
import { BASE_URL } from "../constantes";

import {
    ADD_DESCUENTO,
    GET_DESCUENTO,
    MOD_DESCUENTO
} from "../actions-type";



export function getDescuento(codigoDescuento) {
    return async function () {
        try {
            const descuento = await axios.get(`${BASE_URL}/descuento/`+ codigoDescuento);
            return descuento;
        } catch (err) {
            console.log(err);
        }
    };
}


export function addDescuento(payload) {
    return async function (dispatch) {
        const descuentoSend{
            descuento : payload.descuento,


        }
        try {
            const product = await axios.post(`${BASE_URL}/descuento/`, payload);
           
        } catch (err) {
            console.log(err);
        }
    };
}