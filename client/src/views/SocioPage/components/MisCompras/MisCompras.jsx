import React, { useEffect } from 'react';
import s from './MisCompras.module.css'
import {HiDocumentSearch} from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersByUser} from '../../../../store/actions/actions-orders';
import { getUserById } from '../../../../store/actions/actions-user';
import OrderDetail from './OrderDetail/OrderDetail';


export default function MisCompras() {

  const dispatch = useDispatch();
 const {uid} = useSelector((state) => state.login.user); //saco el uid el usuario
 //const uid = "dd829b3f14d94959982221a7ba36"
  //console.log("uid", uid)
  const {id} = useSelector((state)=> state.users.user); 
  //console.log("usuario", id)

  const allOrders = useSelector((state)=> state.pgym.orders)
  //console.log("oredn2", allOrders)


  useEffect(()=>{
    dispatch(getUserById(uid))
  },[dispatch, uid])
  
  useEffect(()=>{
    dispatch(getAllOrdersByUser(id))
  },[dispatch, id])


  return (
    <div className={s.comprasContainer}>
      <div className={s.comprasTitle}>
        {/* <h4 className={s.comprasNameSeccion}></h4> */}
      </div>
      <div className={s.comprasCardLayout}>
      <table className={s.containerTable}>
         <thead className={s.encabezado}>
          <tr className={s.tableRow}>
              <th className={s.columnas}> Orden de compra N°</th>
              <th className={s.columnas}> Fecha de compra </th>
              <th className={s.columnas}> Estado </th>
              <th className={s.columnas}> Importe </th>
              <th className={s.columnas}> ver detalle </th>
              {/* <th className={s.columnas}>Descargar</th> */}
            </tr>
         </thead>
         <tbody>
           {allOrders?.map((orden)=>(
             <tr key={orden.id} className={s.tableRow}>
               <td  className={s.filas}>{orden.id}</td>
               <td  className={s.filas}>{orden.updatedAt.slice(0,10)}</td>
               <td  className={s.filas}>{orden.state}</td>
               <td  className={s.filas}> $ {orden.totalPrice}</td>
              <td  className={s.filas}> 
                  <HiDocumentSearch
                  onClick={() => {
                    document.getElementById("orderDetailDialog").showModal();
                    }}
                  /> 

                <OrderDetail
                  orderId={orden.id}
                /> 
              </td>
             </tr>
           ))}
         </tbody>
        </table>
       </div>  
       
    </div>
  )
}