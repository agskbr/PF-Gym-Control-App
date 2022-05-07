import style from './checkout.module.css';
import { useDispatch, useSelector } from "react-redux";
import CartItem from '../CartItem/CartItem';

//Import para validar usuario --- checkear firebase
/* import {useAuth0} from "@auth0/auth0-react" */

/** Reducer para limpiar carrito
/* import { clearCart } from "../../store/reducer/reducerCart.js"; */

//Rutas para hacer el post a Mercado Pago
/* import { POST_MERCADOPAGO, USER_LOAD } from "../../constantes"; */


export default function Checkout(activity) {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const {cart} = state.cart;
    const cartCheckOut = useSelector(state => state.cart);
    const totalCart = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const products = {orderBody: cartCheckOut};

    // Validacion de usuario
    /* const userState = useSelector(state => state.user[0]) */
    async function checkOut(products){
        console.log("checkout")
        //Busco ID de usuario de firebase
        /* let id = localStorage.getItem('idUser'); */
        let id = '1';
        if (id){
            
            //Envio la data para conseguir ID de carrito
            /* let pushProduct = await axios.post(USER_LOAD + id + '/cart', products); */

            /* let idCart = pushProduct.data[0]; */

            /* await axios.get(USER_LOAD + idCart.id + '/cart'); */
            /* let check = {state:'Processing', totalPrice: totalCart}
            await axios.put('/orders/checkout/' + idCart.id, check); */
            
           /*  let email = {
                user: {
                    name: userState?.name,
                    lastname: userState?.lastname,
                    email: userState?.email
                },
                info: {
                    orderId: idCart,
                    totalPrice: totalCheckOut
                }
            }
            let resEmail = await axios.post('sendEmail/orderCreated', email) */
           /*  let cartMercadoPago = products.orderBody;
            let mercadoPagoRes = await axios.post(POST_MERCADOPAGO , cartMercadoPago)
            window.open(mercadoPagoRes.data, '_blank')
            localStorage.removeItem('shopCart')
            dispatch(clearCart());
            dispatch(totalCart(0)); */
            

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
                        <CartItem key={index} data={item}/>
                    ))
                    }
                </div>
                <div className={style.total}>
                    <h4>Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}</h4>
                </div>
                <div className={style.address}>
                    <p>
                    Direccion de envio:
                    </p>
                    <button>Editar Direccion</button>
                </div>
                <div className={style.dispatchContainer} >
                    <button onClick={e => checkOut(products,totalCart)} >Pagar</button>
                    <p>(al presionar el boton sera redireccionado a la pagina de Mercado Pago para finalizar la compra)</p>
                </div>
            </div>
          </div>
        )

        // sino retornar:
       /*  (
            <div className={style.container}>
                <h2>Registrate para continuar con la compra</h2>
                //boton de logueo/resgistro
            </div>
        ) */
        
    }


