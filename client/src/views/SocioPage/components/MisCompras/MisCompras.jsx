import React from 'react';
import s from './MisCompras.module.css'
import {BsFillArrowDownCircleFill} from 'react-icons/bs'

export default function MisCompras() {

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
    <div className={s.comprasContainer}>
      <div className={s.comprasTitle}>
        {/* <h4 className={s.comprasNameSeccion}></h4> */}
      </div>
      <div className={s.comprasCardLayout}>
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
    </div>
  )
}
