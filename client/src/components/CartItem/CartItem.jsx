import style from './cartItem.module.css';
import swal from 'sweetalert';

const CartItem = ({data, removeFromCart, info}) => {
   const {
         id,
            name,
            image,
            price,
            day,
            hour,
            capacity,
            quantity,
            dayHourId
   } = data;

  function handleClickRemoveFromCart (){
    removeFromCart(dayHourId)
    swal("Se elimino del carrito", "", "error");
  }


    return (
        <div className={style.container}>
            <div className={style.contentContainer}>
                <h4>{name}</h4>
                <h5>{day}</h5>
                <h5>{hour}</h5>
                <h4>${price}.00</h4>
                <h5>x{quantity}</h5>
                <h6>Total: ${price * quantity}.00</h6>
            </div>
            <div className={style.buttonsContainer}>
                <button onClick={handleClickRemoveFromCart}></button>
                {/* <button onClick={() => removeFromCart(id, true)}>del all</button> */}
            </div>
        </div>
    );
}

export default CartItem;