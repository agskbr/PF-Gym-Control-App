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
      <table className={s.containerTable}>
         <thead className={s.encabezado}>
          <tr className={s.tableRow}>
              <th className={s.columnas}>Id</th>
              <th className={s.columnas}>Orden de compra N°</th>
              <th className={s.columnas}>Estado</th>
              <th className={s.columnas}>Comprobante</th>
              <th className={s.columnas}>Descargar</th>
            </tr>
         </thead>
         <tbody>
           {ordenes.map((orden)=>(
             <tr className={s.tableRow}>
               <td className={s.filas}>{orden.id}</td>
               <td className={s.filas}>{orden.ordenCompra}</td>
               <td className={s.filas}>{orden.estado}</td>
               <td className={s.filas}>{orden.comprobante}</td>
               <td className={s.filas}>{orden.descargar}</td>
             </tr>
           ))}
         </tbody>
        </table>
       </div>  
    </div>
  )
}
