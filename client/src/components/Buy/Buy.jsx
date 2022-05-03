import style from "./buy.module.css"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActivityById } from '../../store/actions';
import { useParams } from "react-router-dom";
import Nav from "../Nav/nav";
import { Link } from 'react-router-dom';


export default function Buy() {

    const dispatch = useDispatch();
	let { id } = useParams();
	useEffect(() => {
		dispatch(getActivityById(id));
	}, [dispatch]);

    
    const {
		id: activityId,
		name,
		description,
		image,
		price,
		day,
		hour,
		capacity,
        trainers,
	} = useSelector((state) => state.detail);


        
        return (
            <div className={style.background}>
               <Nav />
                <div className={style.container}>
                     
                    <div className={style.name}>{name}</div>
                     <div className={style.flipContainer}>
                        <div className={style.card}>
                            <img src={image} alt="img" className={style.front}></img>
                            <div className={style.back}>{description}</div>
                        </div>
                    </div> 
                    
                <div className={style.day}>Dias:{` ${day} `}</div>
                <div className={style.hour}>Horarios:{` ${hour} `}</div>
                <div className={style.price}>Precio:{` $${price} `}</div>
                <div className={style.capacity}>Capacidad:{` ${capacity} lugares disponibles `}</div>
                <div className={style.trainers}><p>{`Coachs: `}</p>

                        {
                            trainers?.map((trainer) => {
                                return (
                                        <div className={style.trainer} key={trainer.image}>{`${trainer.name}`}</div>
                                )
                            } 
                            )
                        }


                </div>

                <div className={style.botonera}>

                    <button className={style.elbo}>Buy plan</button>

                    <Link to={"/"}>
                        <button className={style.elbo} >Add to cart</button>
                    </Link>

                </div>
                
                    
            
                    
            
                </div >

            </div >
        );
}
    