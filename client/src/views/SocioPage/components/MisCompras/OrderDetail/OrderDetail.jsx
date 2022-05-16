import React, { useEffect } from 'react'
import s from './OrderDetail.module.css'
import { getOrderlineByOrderid } from '../../../../../store/actions/actions-orders';
import {getActivity} from '../../../../../store/actions/index'
//import {getActivity} from '../../../../../store/actions/index'
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../../../../assets/logo.png';
import {AiFillCloseCircle} from 'react-icons/ai';
import axios from 'axios';
import { BASE_URL } from "../../../../../store/constantes";


export default function OrderDetail({orderId}) {

   // console.log("orderId", orderId)
   
  const dispatch = useDispatch();

  const activities = useSelector((state)=> state.pgym.activities)   /// [{id:1, name:"yoga"}, {}, {}]
   console.log("activ", activities)
    const orderlines = useSelector((state)=> state.pgym.orderlines)  // [{activId1}, {activId2}]
  console.log("orderline", orderlines)

    useEffect(()=>{
      if(orderId){
        dispatch(getOrderlineByOrderid(orderId))
      }
    },[dispatch, orderId])

    useEffect(()=> {
      dispatch(getActivity())
    },[dispatch])

    async function obtenerActividad(id){
      try {
        const {data} = await axios.get(`${BASE_URL}/activity/${id}`); 
        console.log("data2", data.name)
        return data.name
      } catch (error) {
        console.log(error)
      }
      
    }

  return (

    <dialog 
        id="orderDetailDialog" style={{ border: "none", height: "70vh"}}
        className={s.orederDetailContainer}
    >

    
      <div className=''>
        <div style={{ justifyContent: "flex-end", display: "flex" }}>
            <AiFillCloseCircle
              onClick={() => document.getElementById("orderDetailDialog").close()}
              style={{color: '#fe4f22', fontSize: '20px'}}
            />
         
        </div>
        <div>
          <img 
            src={logo} 
            alt="logo" 
            style={{ width: 60, objectFit: "cover", justifyContent: "center"}} 
          />
        </div>
        <div className={s.comprasTitle}>
          <h4 className={s.comprasNameSeccion}>Detalle de Compra </h4>
        </div>
        <div className={s.comprasCardLayout}>
        <table className={s.orderContainerTable}>
          <thead className={s.encabezado}>
            <tr className={s.tableRow}>
                <th className={s.columnas}>Actividad</th>
                <th className={s.columnas}>Cantidad</th>
                <th className={s.columnas}>Precio </th>
            </tr>
          </thead>
          <tbody>
              {
                  orderlines?.map((o)=> {

                    /* const  {name} = activities?.find((a)=> a.id === o.activityId)  */
                    //console.log("name", acti)
                    /* const name = obtenerActividad(o.activityId)  */
                    
                      return (
                        <tr key={o.id} >
                          <td  className={s.filas}>{}</td>
                          <td  className={s.filas}>{o.quantity}</td>
                          <td  className={s.filas}> $ {o.unitPrice}</td>
                        </tr>
                      )
                    
                  })

              } 
          </tbody>
          </table>
        </div>  
      </div>
    </dialog>
  )
}
