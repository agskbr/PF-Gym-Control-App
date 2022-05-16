import axios from "axios";
import { 
  RECEIVED_POST,
  GET_ALL_ORDERS, 
  GET_ALL_ORDERS_BY_USER, 
  GET_ORDERLINE_BY_ORDER_ID 
} from "../actions-type/index";
import { BASE_URL } from "../constantes";

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
      const {data} = await axios.get(`${BASE_URL}/order/user/${id}`)
      return dispatch({
        type:GET_ALL_ORDERS_BY_USER,
        payload: data
      })
    } catch (error) {
      console.log("ordersByUser",error)
    }
  }
}

const getOrderlineByOrderid = (orderId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`${BASE_URL}/orderline/${orderId}`)
     // console.log("data", data)
      return dispatch({
        type: GET_ORDERLINE_BY_ORDER_ID,
        payload: data
      })
    } catch (error) {
      console.log("orderlineByOrderid", error)
    }
  }
}


export { 
  getAllOrders,
  getAllOrdersByUser,
  getOrderlineByOrderid
};
