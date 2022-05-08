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
          <table>
           <thead>
            <tr>
                <th>Actividad</th>
                <th>Dias</th>
                <th>Horario</th>
                <th>Renovar Suscripcion</th>
              </tr>
           </thead>
           <tbody>
               <tr>
                 <td>{myActiv.name}</td>
                 <td>{myActiv.day[0]}</td>
                 <td>{myActiv.hour[0]}</td>
                 <td>
                   <BsFillCheckCircleFill/>
                 </td>
               </tr>
               <tr>
                 <td>{yoga.name}</td>
                 <td>{yoga.day[0]}</td>
                 <td>{yoga.hour[0]}</td>
                 <td>
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
