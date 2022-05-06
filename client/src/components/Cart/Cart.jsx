import s from "./cart.module.css";
import { useReducer } from "react";
import { cartInitialState, cartReducer } from "../../store/reducer/cartReducer";
import { useDispatch } from "react-redux";
import ProductItem from "../productItem/productItem";
import { addToCart } from "../../store/actions-cart";
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
                    <ProductItem data={data} /* addToCart={addToCart} *//>
                </div>
            </div>
        </div>
    );
}
