import s from "./cart.module.css";
import { useReducer } from "react";
import { cartInitialState, cartReducer } from "../../store/reducer/cartReducer";
import { useDispatch } from "react-redux";

import { addToCart } from "../../store/actions/actionsCart";
import { useEffect } from "react";





export default function Cart(data) {

    


    /* const [state, dispatch] = useReducer(cartReducer, cartInitialState); */
    
   /*  useEffect(() => {
        dispatch(addToCart());
    }, [dispatch]); */

    return (
        <div className={s.container}>
            <div className={s.title}>
                Cart
            </div>
            <div className={s.cart}>
                <div className={s.cartItem}>
                 
                </div>
            </div>
        </div>
    );
}
