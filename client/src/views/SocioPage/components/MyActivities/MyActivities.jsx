import React, { useEffect } from "react";
import s from "./MyActivities.module.css";
import CreateReview from '../CreateReview/CreateReview'
import { getActivity } from "../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import {BsFillCheckCircleFill} from 'react-icons/bs'

export default function MyActivities() {
  const dispatch = useDispatch();
  const actividades= useSelector((state)=> state.pgym.allActivities);
  const myActiv = actividades.find((a)=> a.name === "BodyCombat");
  const yoga= actividades.find((a)=> a.name === "Yoga")
  


  useEffect(()=>{
    dispatch(getActivity())
  },[dispatch])

  return (
    <div className={s.userPrincipalContainer}>
      
      <div className={s.userTitleAndAddBtn}>
        <h4 className={s.userNameSeccion}>Mis Actividades</h4>
        <button
          onClick={() => {
            document.getElementById("reviewDialog").showModal();
          }}
          className={s.userAddBtn}
        >
          {" "}
          Dejanos tu opinion{" "}
        </button>
        
      </div>
      {
        myActiv ? (
          <div className={s.userCardLayout}>
          <table className={s.containerTable}>
           <thead className={s.encabezado}>
            <tr className={s.tableRow}>
                <th className={s.columnas}>Actividad</th>
                <th className={s.columnas}>Dias</th>
                <th className={s.columnas}>Horario</th>
                <th className={s.columnas}>Suscripcion</th>
              </tr>
           </thead>
           <tbody>
               <tr className={s.tableRow}>
                 <td className={s.filas}>{myActiv.name}</td>
                 <td className={s.filas}>{myActiv.day[0]}</td>
                 <td className={s.filas}>{myActiv.hour[0]}</td>
                 <td className={s.filas}>
                   <BsFillCheckCircleFill/>
                 </td>
               </tr>
               <tr className={s.tableRow}>
                 <td className={s.filas}>{yoga.name}</td>
                 <td className={s.filas}>{yoga.day[0]}</td>
                 <td className={s.filas}>{yoga.hour[0]}</td>
                 <td className={s.filas}>
                   <BsFillCheckCircleFill/>
                 </td>
               </tr>
             
           </tbody>
          </table>
        </div>
        ): <p>err</p>
      }
      
      <CreateReview/>
    </div>
  );
}
