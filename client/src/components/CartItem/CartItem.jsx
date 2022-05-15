import style from './cartItem.module.css';

const CartItem = ({data, removeFromCart, info}) => {
   const {
         id,
            name,
            image,
            price,
            day,
            hour,
            capacity,
            quantity
   } = data;



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
                <button onClick={() => removeFromCart(name)}></button>
                {/* <button onClick={() => removeFromCart(id, true)}>del all</button> */}
            </div>
        </div>
    );
}

export default CartItem;