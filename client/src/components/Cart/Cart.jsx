import s from "./cart.module.css";



export default function Cart() {
    return (
        <div className={s.container}>
            <div className={s.title}>
                <h1>Cart</h1>
            </div>
            <div className={s.cart}>
                <div className={s.cartItem}>
                </div>
            </div>
        </div>
    );
}
