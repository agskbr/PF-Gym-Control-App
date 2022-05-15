import axios from "axios";
import { RECEIVED_POST, GET_ALL_ORDERS } from "../actions-type/index";
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

export { getAllOrders };
