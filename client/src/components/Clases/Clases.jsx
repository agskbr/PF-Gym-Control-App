import style from "./clases.module.css";
import Activities  from "../Activities/Activities";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	getActivity,
	getActivityById,
   /*  getDays,
    getHour, */
	filterByDay,
    filterByHour
} from "../../store/actions"


const Clases = () => {

const dispatch = useDispatch();
const allActivities = useSelector((state) => state.activities);

const days = useSelector((state) => state.days);
const hour = useSelector((state) => state.hour);


useEffect(() => {
    dispatch(getActivity());
    /* dispatch(getDays());
    dispatch(getHour()); */
}, [dispatch]);

return (

    <div className={style.container}>
        
        <div className={style.info}>
            <p>+</p>
            <p>de 10 actividades</p>
            <p>con los mejores profesionales</p>

            <button className={style.elButton}>Reserva tu clase ahora</button>
        
            <div className={style.donWait}> 
            No esperes mas
            </div>
        </div>
        
        <div className={style.clases}>
            <Activities allActivities={allActivities}/>
        </div>

    </div>

    )

}

export default Clases;