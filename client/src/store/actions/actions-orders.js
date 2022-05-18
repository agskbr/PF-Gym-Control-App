import axios from "axios";
import swal from "sweetalert";
import {
  RECEIVED_POST,
  GET_ALL_ORDERS,
  GET_ALL_ORDERS_BY_USER,
  GET_ORDERLINE_BY_ORDER_ID,
  SET_ORDER_STATUS
} from "../actions-type/index";
import { BASE_URL } from "../constantes";

const setOrderStatus = (payload) => {
  console.log(payload)
  return { type: SET_ORDER_STATUS, payload: payload };  
}


const getAllOrders = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/order`);

      dispatch({ type: GET_ALL_ORDERS, payload: data });
      dispatch({ type: RECEIVED_POST });
    } catch (error) {
      console.log(error);
    }
  };
};

const getAllOrdersByUser = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/order/user/${id}`);
      return dispatch({
        type: GET_ALL_ORDERS_BY_USER,
        payload: data,
      });
    } catch (error) {
      console.log("ordersByUser", error);
    }
  };
};

const cancelOrder = (orderId, userId) => {
  return async (dispatch) => {
    try {
      const value = await swal({
        title: "¿Seguro quieres cancelar esta orden?",
        buttons: {
          cancel: "No estoy seguro",
          catch: {
            text: "Si, estoy seguro",
            value: "Borrar",
          },
        },
      });
      if (value) {
        await axios.put(`${BASE_URL}/order/canceled/${orderId}`);
        swal({
          title: "Orden cancelada correctamente",
          icon: "success",
          buttons: "Aceptar",
        });
        const clearPaso2 = {
          orderId,
        };
        await axios.put(`${BASE_URL}/diahora/addStock`, clearPaso2);
        const orderlines = await axios.get(`${BASE_URL}/orderline/${orderId}`);
        console.log(orderlines);
        await orderlines.data.forEach((orderline) => {
          axios.delete(
            `${BASE_URL}/review/delete/${userId}/${orderline.activityId}`
          );
        });
        dispatch(getAllOrders());
      }
    } catch (error) {
      console.log(error);
      swal({
        title: "Algo salió mal al cancelar la orden",
        icon: "error",
        buttons: "Aceptar",
      });
    }
  };
};

const completeOrder = async (orderId) => {
  console.log(`entre a la accion y el orderId es: ${orderId}`)
  await axios.put(`${BASE_URL}/order/${orderId}`, {state:"Complete"});
}

const cancelOrder2 = async (orderId) => {
  await axios.put(`${BASE_URL}/order/canceled/${orderId}`);
  await axios.put(`${BASE_URL}/diahora/addStock`, {orderId:orderId});
}

const getOrderlineByOrderid = (orderId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/orderline/${orderId}`);
      // console.log("data", data)
      return dispatch({
        type: GET_ORDERLINE_BY_ORDER_ID,
        payload: data,
      });
    } catch (error) {
      console.log("orderlineByOrderid", error);
    }
  };
};

export { getAllOrders, getAllOrdersByUser, getOrderlineByOrderid, cancelOrder,completeOrder, setOrderStatus, cancelOrder2 };
