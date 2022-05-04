import style from './productItem.module.css';

export default function ProductItem(data, addToCart) {

    const {
        id,
        name,
        image,
        price,
        capacity,
    } = data;


    return (
        <div className={style.container}>
            product
        </div>
    );
}