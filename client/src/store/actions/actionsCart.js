import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../constantes";


import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_ALL_FROM_CART,
  REMOVE_ONE_FROM_CART,
  TOTAL_CART,
  ADD_ORDER_LINE,
} from "../actions-type";






export function clearCart(){
  console.log(" action cleanCart");
  return {
    type: CLEAR_CART,
  };
}




  export function addToCart(payload) {
    
    return async function (dispatch) {
      try {
        const product = await axios.get(`${BASE_URL}/activity/` + payload);
        
        dispatch({
          type: "ADD_TO_CART",
          payload: product.data,
          
        });
      } catch (err) {
        console.log(err);
      }
    };
  }


  export function addOrderLine(payload){
    return async function(dispatch){
      try {
        const orderline = await axios.post(`${BASE_URL}/orderline`, payload);
        dispatch({
          type: "ADD_ORDER_LINE",
          payload: orderline.data,
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  
  export const removeFromCart = (name, all = false) =>
    all
      ? { type: REMOVE_ALL_FROM_CART, payload: name }
      : { type: REMOVE_ONE_FROM_CART, payload: name };
  
