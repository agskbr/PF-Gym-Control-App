import React, { useEffect } from "react";
import s from "./MyActivities.module.css";
import CreateReview from '../CreateReview/CreateReview'
import { getActivity } from "../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Activity from "./Activity/Activity";
import {getUserById } from '../../../../store/actions/actions-user';
import {getAllOrdersByUser, getOrderlineByOrderid} from '../../../../store/actions/actions-orders';



export default function MyActivities() {
  const dispatch = useDispatch();
  const {uid} = useSelector((state)=> state.login.user )
  const {id} = useSelector((state)=> state.users.user); 

  const allOrders = useSelector((state)=> state.pgym.orders); //ordenes de compra --> id orden (18)
  console.log("orders", allOrders)

  const orderlines = useSelector((state)=> state.pgym.orderlines) //items x compra
  console.log("oredelines", orderlines)

  const actividades= useSelector((state)=> state.pgym.allActivities);
 
   
  useEffect(()=> {
    dispatch(getUserById(uid))
  },[dispatch, uid])

  useEffect(()=> {
    dispatch(getAllOrdersByUser(id))
  },[dispatch, id])

 /*  useEffect(()=> {
    dispatch(getOrderlineByOrderid())
  }) */

  useEffect(()=>{
    dispatch(getActivity())
  },[dispatch])


  return (
    <div className={s.userPrincipalContainer}>
       <div className={s.userTitleAndAddBtn}>
        <h4 className={s.myActivitiesTitle}>
          te gustron nuestras clases? dejanos tu oipinion
        </h4>
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
      
        <div>
          <h1></h1>


          <Activity/>
        </div>
       
      <CreateReview/>
    </div>
  );
}
