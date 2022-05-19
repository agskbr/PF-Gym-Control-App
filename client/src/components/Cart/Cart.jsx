import "./style.css";
import s from "./cart.module.css";
import axios from "axios";
import { BASE_URL } from "../../store/constantes";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../CartItem/CartItem";
import { useState } from "react";
import swal from "sweetalert";
import {
  addToCart,
  removeFromCart,
  clearCart,
  orderLinefuntion,
  set_discount,
} from "../../store/actions/actionsCart";
// import { getIdUser } from "../../store/actions/index";
// import { useEffect } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Cart(activity) {
  const state = useSelector((state) => state);
  const orderLine = useSelector((state) => state.cart.orderLine);
  const orderLineId = useSelector((state) => state.cart.newOrederLineId);
  const discountCode = useSelector(
    (state) => state.descuentos.descuentos[0]?.codigo
  );
  const porcentajeDescuento = useSelector(
    (state) => state.descuentos.descuentos[0]?.descuento
  );
  const dispatch = useDispatch();
  const { cart, products } = state.cart;
  const { user } = state.login;
  const [validarClass, setValidarClass] = useState("validar-red");
  const [total, setTotal] = useState(0);
  const [inputDiscount, setInputDiscount] = useState("");
  const [disable, setDisable] = useState(false);

  const alldiscounts = useSelector((state) => state.descuentos.descuentos);

  const oneDiscount = alldiscounts.filter((e) => e.name === inputDiscount);
  

  const porcentajefinal = (100 - porcentajeDescuento ) / 100;
  console.log("porcentajefinal", porcentajefinal)


  //console.log ("all discounts", alldiscounts);



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

      await orderLine.forEach((element) => {
        const infoPaso3 = {
          diaHoraId: element.diaHoraId,
          quantity: element.quantity,
        };
      
        axios.put(`${BASE_URL}/diahora/subtractStock`, infoPaso3);
        const infoPaso4 = {
          userId: data2.data.id,
          diaHoraId: element.diaHoraId,
          unitprice: element.unitprice,
          subtotal: element.subtotal,
          quantity: element.quantity,
          orderId: info.orderId,
          activityId: element.activityId,
        };
        
        axios.post(`${BASE_URL}/orderLine/checkout`, infoPaso4);
        const infoPaso5 = {
          orderId: info.orderId,
          subtotal: element.subtotal,
        };
     
        console.log(" SUBTOTAL", element.subtotal)
        axios.put(`${BASE_URL}/order/sumaTotal`, infoPaso5);
        const infoPaso6 = {
          idUser:data2.data.id,
          idActivity: element.activityId
        }
       
        //console.log(element.activityId)
        axios.post(`${BASE_URL}/review/create`,infoPaso6);
      });
      dispatch(orderLinefuntion(data));
      console.log(data)
    } catch (err) {
      console.log(err);
    }
  }

  async function guardar(user) {
    try {
      const data2 = await axios.get(`${BASE_URL}/user/${user.uid}`);
      const data3 = await axios.delete(
        `${BASE_URL}/order/cart/${data2.data.id}`
      );
      //console.log(data3.data.newOrderId)
      await orderLine.forEach((element) => {
        const cartPaso2 = {
          userId: data2.data.id,
          diaHoraId: element.diaHoraId,
          unitprice: element.unitprice,
          subtotal: element.subtotal,
          quantity: element.quantity,
          orderId: data3.data.newOrderId,
          activityId: element.activityId,
        };
        //console.log(cartPaso2)
        axios.post(`${BASE_URL}/orderline/cart`, cartPaso2);
        //console.log(response)
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function vaciarCarrito(orderId) {
    console.log(orderId);
    await axios.delete(`${BASE_URL}/order/${orderId}`);
    dispatch(clearCart());
  }

  const totalCart = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const finalTotalCart = totalCart * porcentajefinal;
/*   console.log("finalTotalCart", finalTotalCart) */

  const getValueInput = () => {
    let inputValue = document.getElementById("descuento").value;
    setInputDiscount(inputValue);
    if ( inputValue == discountCode) {
      console.log("one discount", oneDiscount);
      setValidarClass("validar-green");
      setTotal(totalCart - (totalCart * porcentajefinal));
      dispatch(set_discount(porcentajefinal));
      setDisable(true);
    } else {
      if (validarClass === "validar-red-moved") {
        setValidarClass("validar-red");
      } else {
        setValidarClass("validar-red-moved");
      }
    }
  };


  const alertaVaciarCarro = () => {
    swal({
      title: "¿Estás seguro?",
      text: "Si vacias el carrito, no podrás recuperarlo!",
      icon: "warning",
      buttons: ["Cancelar", "Vaciar"],
      dangerMode: true,
    }).then((Vaciar) => {
      if (Vaciar) {
        dispatch(clearCart());
        vaciarCarrito(orderLineId);
        swal({
          title: "Carrito vaciado",
          text: "Tu carrito ha sido vaciado",
          icon: "success",
        });
      }
    });
  };

  const alertaGuardarCarro = () => {
    swal({
      title: "Carrito guardado",
      text:
        "El carrito se guardará para que puedas usarlo en cualquier momento",
      icon: "success",
      button: "Ok",
    }).then((response) => {
      if (response) {
        guardar(user);
      }
    });
  };


  return (
    <div className={s.container}>
      <div className={s.title}>Carrito de compras</div>
      <div className={s.cartContainer}>
        <div className={s.cartItem}>
          {cart?.map((item, index) => (
            <CartItem
              key={index}
              data={item}
              removeFromCart={() => dispatch(removeFromCart(item.dayHourId))}
            />
          ))}
        </div>
        <button className={s.cleanCart} onClick={() => alertaVaciarCarro()}>
          Vaciar Carrito
        </button>
        <button
          className={s.cleanCart}
          onClick={() => {
            alertaGuardarCarro();
          }}
        >
          Guardar
        </button>
      </div>

      <div className={s.cartFinal}></div>

      <div className={s.descuento}>
        Codigo de descuento: <br />
        <input type="text" id="descuento" />
      </div>
      <button disable={disable} className={validarClass} onClick={getValueInput}>
        Validar
      </button>

      <div className={s.total}>
        <h4>Total: ${totalCart}</h4>
      </div>

      <Link to="/checkout">
        <div className={s.dispatchContainer}>
          <button className={s.dispatch} onClick={() => checkout(user)}>
            Finalizar la compra
          </button>
        </div>
      </Link>
    </div>
  );
}
