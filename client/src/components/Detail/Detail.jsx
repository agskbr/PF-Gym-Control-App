import style from './detail.module.css'

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActivityById } from '../../store/actions';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { addToCart } from "../../store/actions/actionsCart";


export default function Detail() {
        const state = useSelector(state => state);
        const dispatch = useDispatch();
        const detail = useSelector((state) => state.pgym.detail? state.pgym.detail: null);
        const [time, setTime] = useState("");
        
        function getOptionSelected(){
            let selectInput = document.getElementById("select");
            setTime(selectInput.value);
            console.log(time);
    
        }

    return (
                <div className={style.containerOpen}>
                    <div className={style.infoTitle}>{detail?.name}</div>
                    <div className={style.container}>
                        <div className={style.imageContainer}>
                            <img src={detail?.image} alt="activity" className={style.image} />
                        </div>
                        <div className={style.info}>
                            
                            <div className={style.infoDescription}>{detail?.description}</div>
                            <div className={style.infoPrice}>Precio ${detail?.price}.00</div>
                            <select className={style.horarios} id="select" onClick={()=> getOptionSelected()}> 
                            {
                                detail.diaHoras?.map(day => ( <option className={style.day} key={day.day}>{` ${day.day} ${day.hour}`}</option>))
                            }
                            </select>
                        </div>
                        <button className={style.elbo} onClick={() => dispatch(addToCart(state.pgym.detail.id))} >Add to cart</button>
                    </div> 
                </div>

    )
}