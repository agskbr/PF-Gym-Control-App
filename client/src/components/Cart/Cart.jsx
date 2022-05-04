import s from "./cart.module.css";
import { useReducer } from "react";
import { cartInitialState, cartReducer } from "../../store/reducer-cart";
import { useDispatch } from "react-redux";
import ProductItem from "../ProductItem/ProductItem";
import { addToCart } from "../../store/actions-cart";
import { useEffect } from "react";


addToCart(data)


export default function Cart(data) {

    useEffect(() => {
        dispatch(addToCart());
    }, [dispatch]);


    const {
        id,
        name,
        image,
        price,
        capacity,
    } = data;
   
    const [state, dispatch] = useReducer(cartReducer, cartInitialState);
    const [cart] = state;

    return (
        <div className={s.container}>
            <div className={s.title}>
                Cart
            </div>
            <div className={s.cart}>
                <div className={s.cartItem}>
                    <ProductItem data={data} addToCart={addToCart}/>
                </div>
            </div>
        </div>
    );
}
