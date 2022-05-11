import style from "./activity.module.css";


export default function Activity({ id, name, description, video,  image, price, day, hour, capacity, diaHoras, updateAt}) {
    

    return (

        <div className={style.card}>

            <div className={style.image}> 
            <div className={style.name}>{name}</div>
            
            <img src={image} className={style.imagen} alt="esto es una imagen"/>
            {
                diaHoras.map(day => (
                <span className={style.day} key={updateAt}>{`${day.day}`}</span>
                )
                )
            }
            <div className={style.price}>{`Precio: $${price}`}</div>
            
            </div>

        </div >
    );
    }


