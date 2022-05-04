import s from "./cart.module.css";
import { useReducer } from "react";
import { cartInitialState, cartReducer } from "../../store/reducer-cart";
import { useDispatch } from "react-redux";


export default function Cart() {
   
    const [state, dispatch] = useReducer(cartReducer, cartInitialState);
    const [cart] = state;
    
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
