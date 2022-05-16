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


export function getAllDescuento() {
    return async function () {
        try {
            const descuentos = await axios.get(`${BASE_URL}/descuento/all`);
            return descuentos;
        } catch (err) {
            console.log(err);
        }
    };
}

export function addDescuento(descuento) {
    const descuentoToCreate = {
        codigo: descuento.codigo,
        descuento: descuento.descuento
    };
    return async function () {
        try {
            const descuentoCreado = await axios.post(`${BASE_URL}/descuento/`, descuentoToCreate);
            return descuentoCreado;
        } catch (err) {
            console.log(err);
        }
    };
}

export function modDescuento(descuento, id) {
    const descuentoToUpdate = {
        codigo: descuento.codigo,
        descuento: descuento.descuento
    };
    return async function () {
        try {
            const descuentoModificado = await axios.put(`${BASE_URL}/descuento/`+ id , descuentoToUpdate);
            return descuentoModificado;
        } catch (err) {
            console.log(err);
        }
    };
}
