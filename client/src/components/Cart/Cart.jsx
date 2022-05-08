import s from "./cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../CartItem/CartItem";
import { addToCart, removeFromCart, clearCart } from "../../store/actions/actionsCart";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";




export default function Cart(activity) {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const {cart, products} = state.cart;
    

    return (
       
        <div className={s.container}>
         
            <div className={s.title}>
                Cart
            </div>
            <div className={s.cartContainer} >
                <div className={s.cartItem}>
                    {
                        cart?.map((item, index) => (
                        <CartItem key={index} data={item} removeFromCart={()=> dispatch(removeFromCart(item.id))}/>
                    ))
                    }
                </div>
                {/* <button onClick={()=> dispatch(clearCart)}>limpiar carrito</button> */}
            </div>

            <div className={s.cartFinal} >
            </div>

            <div className={s.total}>
                <h4>Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}</h4>
            </div>
                
            <Link to="/checkout">    
                <div className={s.dispatchContainer} >
                    <button>Finalizar la compra</button>
                </div>
            </Link>

        </div>
    );
}
