import React, { useEffect } from 'react';
//import s from './Activity.module.css';
import {getOrderlineByOrderid} from '../../../../../store/actions/actions-orders'
import { useDispatch, useSelector } from 'react-redux';
import { getActivity } from "../../../../../store/actions";

export default function Activity ({orderId}) {//imagen, fehca y hora, nombre d ela activ, instructor
//console.log("ya", orderId)

 const dispatch = useDispatch()

 const orderlines = useSelector((state)=> state.pgym.orderlines) //items x compra
  //console.log("oredelines", orderlines)

  const actividades = useSelector((state)=> state.pgym.allActivities);
  //console.log("actividades", actividades)
    
   useEffect(()=> {
    dispatch(getOrderlineByOrderid(orderId))
  },[dispatch, orderId])

 useEffect(()=>{
    dispatch(getActivity())
  },[dispatch])

  return (

    <div>
      <h2>hola</h2>
     {/*  {
        orderlines?.map((orden)=>{
          
          const {image, name} = actividades?.find((a)=> a.id === orden.activityId)
          console.log("img", image) 
          
          return (
            
            <image key={orden.id} src={image} alt={name}/>
          
          )
          
          
        })
      } */}
        
    </div>
  )
}
