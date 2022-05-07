import React from "react";
import s from "./MyActivities.module.css";
import {BsFillArrowDownCircleFill} from 'react-icons/bs'
import CreateReview from '../CreateReview/CreateReview'

export default function MyActivities() {
  const ordenes = [
    {
      id: 1,
      ordenCompra: "0001",
      estado:"completa",
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
              <th>Id</th>
              <th>Orden de compra N°</th>
              <th>Estado</th>
              <th>Comprobante</th>
              <th>Descargar</th>
            </tr>
         </thead>
         <tbody>
           {ordenes.map((orden)=>(
             <tr>
               <td>{orden.id}</td>
               <td>{orden.ordenCompra}</td>
               <td>{orden.estado}</td>
               <td>{orden.comprobante}</td>
               <td>{orden.descargar}</td>
             </tr>
           ))}
         </tbody>
        </table>
      </div>
      <CreateReview/>
    </div>
  );
}
