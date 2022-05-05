import style from "./clases.module.css";
import Activities  from "../Activities/Activities";
import Search from "../Search/search";
import Paginado from "../Paginado/paginado"
import Filtrado from "../Filtrado/filtrado"

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	getActivity,
} from "../../store/actions"


const Clases = () => {

const dispatch = useDispatch();
const allActivities = useSelector((state) => state.pgym.page);


useEffect(() => {
    dispatch(getActivity());
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
            <div className={style.navBar}>
                    <Search />
                    <Filtrado />
            </div>
            
            <Activities allActivities={allActivities}/>
            <div className={style.paginado}>
                <Paginado />
            </div>
        </div>

    </div>

    )

}

export default Clases;