import style from './checkout.module.css';
import { useDispatch, useSelector } from "react-redux";
import CartItem from '../CartItem/CartItem';
import { validateUserIsLogged } from "../../store/actions/actions-login";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { BASE_URL, POST_MERCADOPAGO } from '../../store/constantes';
import { clearCart } from '../../store/actions/actionsCart';
import { removeFromCart } from '../../store/actions/actionsCart';


/** Reducer para limpiar carrito
/* import { clearCart } from "../../store/reducer/reducerCart.js"; */

//Rutas para hacer el post a Mercado Pago
/* import { POST_MERCADOPAGO, USER_LOAD } from "../../constantes"; */


export default function Checkout(activity) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.login);
    useEffect(() => {
        dispatch(validateUserIsLogged());
      }, [dispatch]);
      useEffect(() => {
        if(!user) {
          navigate("/login")
        }
      }, [user, navigate]);


    const state = useSelector(state => state);
    const {cart} = state.cart;
    const cartCheckOut = useSelector(state => state.cart.order);
    const totalCart = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const products = {orderBody: cartCheckOut.cart};
    const name = "pepito";  
    const lastname = "carabajal";

    

    // Validacion de usuario
    /* const userState = useSelector(state => state.user[0]) */
    async function checkOut(products){
        console.log("checkout")
        //Busco ID de usuario de firebase
        let id = user.uid;
        
        if (id){
            
            //Envio la data para conseguir ID de carrito
            /* let pushProduct = await axios.post(USER_LOAD + id + '/cart', products); */

            /* let idCart = pushProduct.data[0]; */

            let idCart = Math.random(0,1000000);
           
            /* await axios.get(USER_LOAD + idCart.id + '/cart'); */
            /* let check = {state:'Processing', totalPrice: totalCart}
            await axios.put('/orders/checkout/' + idCart.id, check); */


            //!  ACTIVAR ENVIO DE EMAIL
            let check = {state:'Processing', totalPrice: totalCart}
            await axios.post(BASE_URL + '/order/', check);
                                                //userID
            let email = {
                user: {
                    name: name,
                    lastname: lastname,
                    email: user?.email
                },
                info: {
                    orderId: idCart,
                    totalPrice: totalCart
                }
            }
            let resEmail = await axios.post(BASE_URL +'/email/orderCreated', email)
            //! --------------------------------------------------------

//name
//price
//count 


            
            let mercadoPagoRes = await axios.post( POST_MERCADOPAGO , cartCheckOut)
            /* window.open(mercadoPagoRes.data) */
            window.location.href = mercadoPagoRes.data;
            dispatch(clearCart());
           
            

        } else {
            alert("algo salio mal!")
        }
    }

       //Hacer verificacion isAuthenticated y en caso de ser afirmativo retornar:
        return (
        <div className={style.container}>
            <div className={style.checkOut}>
                <div className={style.title}>Checkout</div>
                <div className={style.products}>
                {
                        cart?.map((item, index) => (
                        <CartItem key={index} data={item} removeFromCart={()=> dispatch(removeFromCart(item.name))}/>
                    ))
                    }
                </div>
                <div className={style.total}>
                    <h4>Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}</h4>
                </div>
                <div className={style.address}>
                    <p>
                    Email: {user.email}
                    </p>
                    <button>Editar Email</button>
                </div>
                <div className={style.dispatchContainer} >
                    <button onClick={e => checkOut(products,totalCart)} >Pagar</button>
                    <p>(al presionar el boton sera redireccionado a la pagina de Mercado Pago para finalizar la compra)</p>
                </div>
            </div>
          </div>
        )

    }



