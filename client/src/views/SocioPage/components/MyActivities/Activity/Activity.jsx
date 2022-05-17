import React, { useEffect, useState } from 'react';
//import s from './Activity.module.css';
import {getOrderlineByOrderid} from '../../../../../store/actions/actions-orders'
import { useDispatch, useSelector } from 'react-redux';
import { getActivity } from "../../../../../store/actions";
import CreateReview from '../../CreateReview/CreateReview'


export default function Activity ({orderId}) {//imagen, nombre de la activ
//console.log("ya", orderId) 

 const dispatch = useDispatch()

 const orderlines = useSelector((state)=> state.pgym.orderlines) //items x compra
 //console.log("oredelines", orderlines)

  const [orderLine, setOrderLine] = useState([])

  //console.log("11", orderLine)
  //const [activity, setActivity] = useState([])

  const allActivities = useSelector((state)=> state.pgym.allActivities);
  console.log("actividades", allActivities)

  const newAct = allActivities.map((e) =>{
    return ({
      name: e.name,
      image:e.image, 
      id:e.id
    })

  })
 // console.log("nombre", newAct) 

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
       <button
            onClick={() => {
              document.getElementById("reviewDialog").showModal();
            }}
             /* className={} */
        >
               {" "}
               Click aqui {" "}
        </button> 
    {
          orderLine.map((orden)=>{
            const {name, image} = newAct?.find((a)=> a.id === orden.activityId)
            console.log("img", name, image) 
            return(
               <div key={orden.id}>
                <img src={image} alt= {name}/>
                <p>{name}</p>
              </div> 
            )

          })
        }
        <CreateReview/>

    </div>

  )
}
