import React from 'react';
import style from "./Card.module.css";


export default function Card({image, name, diets}){
    return(
        <div className= {style.div}>
        <div className= {style.Card}>
            <h3 className= {style.name}>{name}</h3>
            <img className= {style.imagen} src={image} alt="" width="200px" height="200px"/>
            <h5>{diets ? diets : <h5>Sin especificar</h5>}</h5>
        </div>
        </div>
    )
}