import React, { useEffect } from "react";
import s from "./MyActivities.module.css";
import CreateReview from '../CreateReview/CreateReview'
import { useDispatch, useSelector } from "react-redux";
import Activity from './Activity/Activity';
import {getUserById } from '../../../../store/actions/actions-user';
import {getAllOrdersByUser} from '../../../../store/actions/actions-orders';
import {FaHandPointRight} from 'react-icons/fa'



export default function MyActivities() {
  const dispatch = useDispatch();
  const {uid} = useSelector((state)=> state.login.user )
  const {id} = useSelector((state)=> state.users.user); 
  //console.log()

  const allOrders = useSelector((state)=> state.pgym.orders); //ordenes de compra --> id orden (18)
  console.log("orders", allOrders)
   
  useEffect(()=> {
    dispatch(getUserById(uid))
  },[dispatch, uid])

  useEffect(()=> {
    dispatch(getAllOrdersByUser(id))
  },[dispatch, id])

 

  


  return (
    <div className={s.userPrincipalContainer}>
       <div className={s.userTitleAndAddBtn}>
        <h4 className={s.myActivitiesTitle}>
         Queremos conocer tu opinion  <FaHandPointRight/>
        </h4>
        <button
          onClick={() => {
            document.getElementById("reviewDialog").showModal();
          }}
          className={s.userAddBtn}
        >
          {" "}
          Click aqui {" "}
        </button>
        
      </div>
      
        <div>
          <h1>Tus Actividades: </h1>
          
          <Activity/>

       {/*    {
             allOrders?.map((orden)=>(
               <Activity
               key={orden.id}
               orderId={orden.id}
               />
             ))
            
          } */}
         
        </div>
       
      <CreateReview/>
    </div>
  );
}
