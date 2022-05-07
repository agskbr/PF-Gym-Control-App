import axios from "axios";
import { useDispatch, useSelector } from "react-redux";


import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_ALL_FROM_CART,
  REMOVE_ONE_FROM_CART,
  TOTAL_CART,
} from "../actions-type";



const base_url = "https://pfgymapp-2.herokuapp.com";

function calculateTotalCart(state){
  let total = 0;
  if(state){
      state.map(e => {
          let subTotal = Number(e.price) * Number(e.count);
          return total += subTotal;
      })
  }
  return total;
}
export function totalCart(state){
  return async function(dispatch){
      dispatch({
          type: 'TOTAL_CART',
          payload: calculateTotalCart(state)
      })
  }
}

  export function addToCart(payload) {
    
    return async function (dispatch) {
      try {
        const product = await axios.get(`${base_url}/activity/` + payload);
        
        dispatch({
          type: "ADD_TO_CART",
          payload: product.data,
          
        });
      } catch (err) {
        console.log(err);
      }
    };
  }

  
  export const removeFromCart = (id, all = false) =>
    all
      ? { type: REMOVE_ALL_FROM_CART, payload: id }
      : { type: REMOVE_ONE_FROM_CART, payload: id };
  
  export function clearCart(){
    console.log("estoy despachando CLEAR_CART")
        return function(dispatch){
            dispatch({
                type: CLEAR_CART,
                payload: []
            })
        }
    }