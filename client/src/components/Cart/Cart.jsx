import s from "./cart.module.css";
import axios from "axios";
import { BASE_URL } from "../../store/constantes";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../CartItem/CartItem";
import {
  addToCart,
  removeFromCart,
  clearCart,
} from "../../store/actions/actionsCart";
// import { getIdUser } from "../../store/actions/index";
// import { useEffect } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Cart(activity) {
  const state = useSelector((state) => state);
  const orderLine = useSelector((state)=>state.cart.orderLine)
  const dispatch = useDispatch();
  const { cart, products } = state.cart;
  const { user } = state.login;

  //console.log(orderLine)
  /* 
  activityId: 5
  diaHoraId: 21
  quantity: 1
  subtotal: 200
  unitprice: 200 */

  async function checkout(user) {
    try {
      //console.log(user);
      const data2 = await axios.get(`${BASE_URL}/user/${user.uid}`);
      const { data } = await axios.delete(
        `${BASE_URL}/order/cart/${data2.data.id}`
      );
      //console.log(data);
      const info = { orderId: data.newOrderId, state: "Created" };
      await axios.put(`${BASE_URL}/order/checkout`, info);

      await orderLine.forEach(element => {
        const infoPaso3 = {
          diaHoraId: element.diaHoraId,
          quantity: element.quantity
        }
        const infoPaso4 = { 
          userId:data2.data.id,
          diaHoraId:element.diaHoraId,
          unitprice:element.unitprice,
          subtotal:element.subtotal,
          quantity:element.quantity, 
          orderId:info.orderId, 
          activityId:element.activityId
        }
        const infoPaso5 = {
          orderId:info.orderId,
          subtotal: element.subtotal
        }
        console.log(infoPaso4)
        axios.put(`${BASE_URL}/diahora/subtractStock`, infoPaso3);
        axios.post(`${BASE_URL}/orderLine/checkout`, infoPaso4);
        axios.put(`${BASE_URL}/order/sumaTotal`, infoPaso5);
      });
      //   {
      //     "diaHoraId":"2",
      //     "quantity":"1"
      // }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={s.container}>
      <div className={s.title}>Cart</div>
      <div className={s.cartContainer}>
        <div className={s.cartItem}>
          {cart?.map((item, index) => (
            <CartItem
              key={index}
              data={item}
              removeFromCart={() => dispatch(removeFromCart(item.name))}
            />
          ))}
        </div>
        <button className={s.cleanCart} onClick={() => dispatch(clearCart())}>
          Vaciar Carrito
        </button>
      </div>

      <div className={s.cartFinal}></div>

      <div className={s.total}>
        <h4>
          Total: $
          {cart.reduce((total, item) => total + item.price * item.quantity, 0)}
        </h4>
      </div>

      <Link to="/checkout">
        <div className={s.dispatchContainer}>
          <button
            onClick={() => {
              checkout(user);
            }}
          >
            Finalizar la compra
          </button>
        </div>
      </Link>
    </div>
  );
}
