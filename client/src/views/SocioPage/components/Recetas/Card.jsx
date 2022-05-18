import React from 'react';
import style from "./Card.module.css";
import {BsReceipt} from 'react-icons/bs';

// const navigate = useNavigate();


export default function Card({image, title, diets, sourceUrl}){
    return(
        <div className= {style.div}>
            

        <div className= {style.Card}>
            <div className={style.imageContainer}>
                <img className= {style.imagen} src={image} alt="" width="200px" height="200px"/>
            </div>
            <div className={style.textContainer}>
                <p className={style.name}>{title}</p>
                <p className={style.categories}>{diets ? diets : <p>Sin especificar</p>}</p>
                <a href={sourceUrl} target="_blank" className={style.detalle}> Detail<BsReceipt/></a>
            </div>
            
        </div>
            

            
        </div>
    )
}