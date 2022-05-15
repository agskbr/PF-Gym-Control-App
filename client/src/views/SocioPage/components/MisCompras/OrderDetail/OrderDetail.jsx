import React, { useEffect } from 'react'
import s from './OrderDetail'
import { getOrderlineByOrderid } from '../../../../../store/actions/actions-orders';
import {getActivity} from '../../../../../store/actions/index'
//import {getActivity} from '../../../../../store/actions/index'
import { useDispatch, useSelector } from 'react-redux';

export default function OrderDetail({orderId}) {

    //console.log("orderId", orderId)
   
    const dispatch = useDispatch();

   const activities = useSelector((state)=> state.pgym.activities)   /// [{id:1, name:"yoga"}, {}, {}]
    console.log("activ", activities)
    const orderlines = useSelector((state)=> state.pgym.orderlines)  // [{activId1}, {activId2}]
   console.log("orderline", orderlines)

   //

    useEffect(()=>{

      if(orderId){
        dispatch(getOrderlineByOrderid(orderId))
      }
        dispatch(getActivity())
    },[dispatch, orderId])


  return (

    <dialog 
        id="orderDetailDialog" style={{ border: "none", height: "80vh"}}
    >

    
    <div className={s.comprasContainer}>
    <div style={{ justifyContent: "flex-end", display: "flex" }}>
                    <button
                    onClick={() => document.getElementById("orderDetailDialog").close()}
                    >
                    x
                    </button>
                </div>
      <div className={s.comprasTitle}>
        <h4 className={s.comprasNameSeccion}>Detalle de Compra </h4>
      </div>
      <div className={s.comprasCardLayout}>
      <table className={s.containerTable}>
         <thead className={s.encabezado}>
          <tr className={s.tableRow}>
              <th className={s.columnas}>Actividad</th>
              <th className={s.columnas}>Cantidad</th>
              <th className={s.columnas}>Precio </th>
            </tr>
         </thead>
         <tbody>
            {
                orderlines?.map((o)=>(
                <tr key={o.id} >
                <td  className={s.filas}>{o.activityId}</td>
                <td  className={s.filas}>{o.quantity}</td>
                <td  className={s.filas}> $ {o.unitPrice}</td>
                </tr>
                ))
            } 
         </tbody>
        </table>
       </div>  
    </div>
    </dialog>
  )
}
