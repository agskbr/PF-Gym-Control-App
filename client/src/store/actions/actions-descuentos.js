import axios from "axios";
import { BASE_URL } from "../constantes";

import {
  ADD_DESCUENTO,
  GET_DESCUENTO,
  MOD_DESCUENTO,
  GET_ALL_DESCUENTOS,
} from "../actions-type";
import swal from "sweetalert";

export function getDescuento(codigoDescuento) {
  return async function(dispatch) {
    try {
      const descuento = await axios.get(
        `${BASE_URL}/descuento/` + codigoDescuento
      );
      return dispatch({
        type: GET_DESCUENTO,
        payload: descuento.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getAllDescuentos() {
  return async function(dispatch) {
    try {
      const descuentos = await axios.get(`${BASE_URL}/descuento/all`);
      return dispatch({
        type: GET_ALL_DESCUENTOS,
        payload: descuentos.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function addDescuento(descuento) {
  const descuentoToCreate = {
    codigo: descuento.codigo,
    descuento: descuento.descuento,
  };
  return async function(dispatch) {
    try {
      const descuentoCreado = await axios.post(
        `${BASE_URL}/descuento/`,
        descuentoToCreate
      );
      dispatch(getAllDescuentos());
      swal({
        title: "Descuento creado correctamente",
        icon: "success",
        buttons: "Aceptar",
      });
      return descuentoCreado;
    } catch (err) {
      console.log(err);
      swal({
        title: "ALgo salió mal al crear el descuento",
        icon: "error",
        buttons: "Aceptar",
      });
    }
  };
}

export function modDescuento(descuento, id) {
  const descuentoToUpdate = {
    codigo: descuento.codigo,
    descuento: descuento.descuento,
  };
  return async function(dispatch) {
    try {
      const descuentoModificado = await axios.put(
        `${BASE_URL}/descuento/` + id,
        descuentoToUpdate
      );
      swal({
        title: "Descuento editado correctamente",
        icon: "success",
        buttons: "Aceptar",
      });
      dispatch(getAllDescuentos())
      return descuentoModificado;
    } catch (err) {
      console.log(err);
      swal({
        title: "Algo salió mal al editar el descuento",
        icon: "error",
        buttons: "Aceptar",
      });
    }
  };
}
