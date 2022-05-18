import style from "./cartItem.module.css";
import { setterCountClick } from "../../store/actions/actionsCart";
import { useSelector, useDispatch } from "react-redux";

const CartItem = ({ data, removeFromCart, info }) => {
  const {
    id,
    name,
    image,
    price,
    day,
    hour,
    capacity,
    quantity,
    dayHourId,
  } = data;
  const dispatch = useDispatch();
  const countClick = useSelector((state) => state.pgym.countClick);

  function handleEliminar() {
    console.log("entre al handleEliminar");
    dispatch(setterCountClick(countClick - 1));
    dispatch(removeFromCart(dayHourId));
    console.log(`El countClick es: ${countClick} `);
    // if (countClick < 9) {
    //   setDisable(false);
    //   console.log("entre al if del pointer");
    //   setCursor("pointer");
    //   setBackground();
    // }
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
        <button onClick={() => handleEliminar()}></button>
        {/* <button onClick={() => removeFromCart(id, true)}>del all</button> */}
      </div>
    </div>
  );
};

export default CartItem;
