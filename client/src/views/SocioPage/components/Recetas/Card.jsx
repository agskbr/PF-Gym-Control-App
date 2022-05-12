import React from 'react';
import style from "./Card.module.css";


export default function Card({image, title, diets}){
    return(
        <div className= {style.div}>
        <div className= {style.Card}>
            <div className={style.imageContainer}>
                <img className= {style.imagen} src={image} alt="" width="200px" height="200px"/>
            </div>
            <div className={style.textContainer}>
                <p className={style.name}>{title}</p>
                <p className={style.categories}>{diets ? diets : <p>Sin especificar</p>}</p>
            </div>
            
        </div>
        </div>
    )
}