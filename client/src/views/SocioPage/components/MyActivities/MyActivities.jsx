import React, { useEffect } from "react";
import s from "./MyActivities.module.css";
import {BsFillArrowDownCircleFill} from 'react-icons/bs'
import CreateReview from '../CreateReview/CreateReview'
import { getActivity } from "../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";

export default function MyActivities() {
  const dispatch = useDispatch();
  const actividades= useSelector((state)=> state.pgym.allActivities);
  //console.log("soy actividades", actividades)
  const myActiv = actividades.find((a)=> a.name === "BodyCombat");
  console.log("MY", myActiv);

  const ordenes = [
    {
      id: 1,
      imagen:"",
      fecha: "15/05/2022",
      clase:"Yoga",
      comprobante:"pdf",
      descargar: <BsFillArrowDownCircleFill/>
    },
    {
      id: 2,
      ordenCompra: "0002",
      estado:"completa",
      comprobante:"pdf",
      descargar: <BsFillArrowDownCircleFill/>
    },
    {
      id: 3,
      ordenCompra: "0003",
      estado:"cancelada",
      comprobante:"pdf",
      descargar: <BsFillArrowDownCircleFill/>
    },
    
  ]

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
      <div className={s.userCardLayout}>
        <table>
         <thead>
          <tr>
              <th>Avtividad</th>
              <th>Imagen</th>
              <th>Horario</th>
              <th>Dia</th>
              <th>Renovar Suscripcion</th>
            </tr>
         </thead>
         <tbody>
             <tr>
               <td>{}</td>
               <td>{}</td>
               <td>{}</td>
               <td>{}</td>
               <td></td>

             </tr>
           
         </tbody>
        </table>
      </div> 
      <CreateReview/>
    </div>
  );
}
