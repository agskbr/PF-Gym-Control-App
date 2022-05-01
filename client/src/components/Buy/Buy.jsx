import style from "./buy.module.css"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActivityById } from '../../store/actions';
import { useParams } from "react-router-dom";


export default function Buy() {

    const dispatch = useDispatch();
	let { id } = useParams();
	useEffect(() => {
		dispatch(getActivityById(id));
	}, [dispatch]);



    
        
    
    const {
		id: idActivity,
		name,
		description,
		video,
		image,
		price,
		day,
		hour,
		capacity,
        trainers,
	} = useSelector((state) => state.detail);


        
        return (
            <div className={style.background}>

                <div className={style.container}>
                    <div className={style.name}>{name}</div>
                    <img className={style.image} src={image} ></img>
                    <div className={style.description}>{description}</div>
                    {/* {
                        day?.map((day) => {
                            return (
                                <div className={style.day}>
                                    <div className={style.day}>{` ${day}`}</div>
                                </div>
                            )
                        }
                        )
                    } */}

                <div className={style.day}>Dias:{` ${day} `}</div>
                <div className={style.hour}>Horarios:{` ${hour} `}</div>
                <div className={style.price}>Precio:{` $${price} `}</div>
                <div className={style.capacity}>Capacidad:{` ${capacity} lugares disponibles `}</div>
                <div className={style.trainers}><p>{`Coachs: `}</p>

                        {
                            trainers?.map((trainer) => {
                                return (
                                        <div className={style.trainer}>{`${trainer.name}`}</div>
                                )
                            } 
                            )
                        }


                </div>

                <div className={style.botonera}>
                    <button className={style.elbo}>Buy plan</button>
                    <button className={style.elbo}>Add to cart</button>
                </div>
                
                    
            
                    
            
                </div >

            </div >
        );
}
    