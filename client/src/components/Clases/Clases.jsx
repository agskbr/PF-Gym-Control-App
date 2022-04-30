import style from "./clases.module.css";
import Activities  from "../Activities/Activities";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	getActivity,
	getActivityById,
	filterByDay,
    filterByHour
} from "../../store/actions"


const Clases = () => {

return (

    <div className={style.container}>
        
        <div className={style.info}>
            <p>+</p>
            <p>de 10 actividades</p>
            <p>con los mejores profesionales</p>

            <button>Reserva tu clase ahora</button>
        
            <div className={style.donWait}> 
            No esperes mas
            </div>
        </div>
        
        <div className={style.clases}>
          {/*   <Activities /> */}
        </div>

    </div>

    )

}

export default Clases;