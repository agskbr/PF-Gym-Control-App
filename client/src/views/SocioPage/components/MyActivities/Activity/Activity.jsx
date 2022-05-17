import React, { useEffect, useState } from 'react';
//import s from './Activity.module.css';
import {getOrderlineByOrderid} from '../../../../../store/actions/actions-orders'
import { useDispatch, useSelector } from 'react-redux';
import { getActivity } from "../../../../../store/actions";

export default function Activity ({orderId}) {//imagen, nombre de la activ
console.log("ya", orderId) 

 const dispatch = useDispatch()

 const orderlines = useSelector((state)=> state.pgym.orderlines) //items x compra
 console.log("oredelines", orderlines)
 const [orderLine, setOrderLine] = useState([])
//  const newOrd = orderlines.map((e) => e.activityId) //aca me trae solo el activityId de la orderId que llega como props.
//  console.log("activityID", newOrd)



  const actividades = useSelector((state)=> state.pgym.allActivities);
  console.log("actividades", actividades)
  const newAct = actividades.map((e) =>{
    return ({
      name: e.name,
      image:e.image, 
      id:e.id
    })
    
  })
  console.log("nombre", newAct) 



   useEffect(() =>{
     if(orderlines.length){
       setOrderLine([...orderlines])
     }

   },[orderlines]) 


   useEffect(()=> {
    dispatch(getOrderlineByOrderid(orderId))
  },[dispatch, orderId])


 useEffect(()=>{
   if(orderId){
    dispatch(getActivity())
  }
  },[dispatch, orderId])

  return (
    <div>
      {
            orderLine.map((orden)=>{
            
              
              const {name} = newAct?.find((a)=> a.id === orden.activityId)
              console.log("img",name) 
              return(
                <div key={orden.id}>
                  {/* <img src={image} alt= {name}/> */}
                  <p>{name}</p>
                </div>
              )
            
            })
          }

    </div>

  )
}
