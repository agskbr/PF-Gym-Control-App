import "./style.css"
import style from './newClases.module.css';
import Search from "../Search/search";
import Paginado from "../Paginado/paginado"
import Filtrado from "../Filtrado/filtrado"
import NewActivity from '../NewActivity/NewActivity';
import Detail from '../Detail/Detail';
import PowerChat from '../../components/ChatBot/ChatBot'
import { getDescuento, getAllDescuentos } from "../../store/actions/actions-descuentos";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	getActivity,
    getActivityById,
} from "../../store/actions"


const Clases = () => {

const dispatch = useDispatch();
const allActivities = useSelector((state) => state.pgym.allActivities);
let [detailClass, setDetailClass] = useState("detail-closed");
let [botClass, setBotClass] = useState("bot-closed");




useEffect(() => {
    dispatch(getActivity());
}, [dispatch]);

const handleActivityClick = (id) => {
    let activityId = id.target.id;

    function isNumeric(val) {
        return /^-?\d+$/.test(val);
    }
        if (isNumeric(activityId)) {
        dispatch(getActivityById(activityId));
        }
    
}


function handleDetailClick () {
    if (detailClass === 'detail-closed') setDetailClass('detail-open')
    if (detailClass === 'detail-open') setDetailClass('detail-closed')
  }


useEffect(() => {
    window.addEventListener("click", handleActivityClick);
  }, []);


/* dispatch (getAllDescuentos()); */

function handleBotClick () {
    if (botClass === 'bot-closed') setBotClass('bot-open')
    if (botClass === 'bot-open') setBotClass('bot-closed')
}

return (

    <div className={style.container}>
        
        <div className={style.clasesContainer} onClick={handleDetailClick}>

            {
                allActivities?.map((activity) => (
                    <NewActivity key={activity.image} className={style.activity} id={activity.id} {...activity} /* onClick={()=> getActivityById(activity.id)} */ />
                ))
            }


        </div>
            <div className={detailClass}>
                <Detail />
                <div id='close' className={style.buttonCloseDetail} onClick={handleDetailClick}></div>
            </div>

            <div className={botClass}>
                <PowerChat />
            </div>
            <div className={style.bot} onClick={handleBotClick} >
                BOT
            </div>

    </div>

    )

}

export default Clases;