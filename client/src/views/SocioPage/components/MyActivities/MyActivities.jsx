import React, { useEffect, useState} from "react";
import "./style.css"
import s from "./MyActivities.module.css";
//import CreateReview from '../CreateReview/CreateReview'
import { useDispatch, useSelector } from "react-redux";
import Activity from './Activity/Activity';
import {getUserById } from '../../../../store/actions/actions-user';
import {getAllOrdersByUser} from '../../../../store/actions/actions-orders';
import { getActivity } from "../../../../store/actions";
//import {FaHandPointRight} from 'react-icons/fa'
//import CreateReaview from "../CreateReview/CreateReview";
import { postReview, getReviewsByUser } from '../../../../store/actions/actions-review.js';
import Swal from "sweetalert";
import logo from '../../../../assets/logo.png';
import {FaStar} from 'react-icons/fa';


const colors = {
  orange: "#eb4e27",
  grey: "#a9a9a9",
  
}


export default function MyActivities() {

  const [classForm, setClassForm] = useState("hide")

  const dispatch = useDispatch();
  const {uid} = useSelector((state)=> state.login.user )
  const {id} = useSelector((state)=> state.users.user); 
  
  //console.log()
 // const allActivities = useSelector((state)=> state.pgym.allActivities);
  const allOrders = useSelector((state)=> state.pgym.orders); //ordenes de compra --> id orden (18)
  //console.log("orders", allOrders)
  const ordersFilter = allOrders.filter((order) => order.state === "Complete")
  console.log("filtradas", ordersFilter)
  
  const actividades = []
  ordersFilter.forEach((e)=> actividades.push(e.activities))
  console.log("fil", actividades)
  
  const actividades2 =[]
  actividades.forEach((a) => {actividades2.push(a) })
   console.log("2", actividades2)
  
   const actividades3 = []
   actividades2.forEach((el)=> el.map((a)=> actividades3.push(a)) )

   console.log("3", actividades3)
    

  //const ultima = allOrders[allOrders.length-2] //
  //console.log("ultima", ultima)

  /** */
  const allReviewUser = useSelector((state)=>state.review.reviews);
  console.log(("allReviewUser", allReviewUser))
  
  

  const stars= Array(5).fill(0);
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue]= useState(undefined);
    const [ input, setInput]= useState({
        rating: "",
        description:"",
        activityId: "", 
        userId: id, //le seteo por defecto un id q este en base de datos para q funcione x ahora!!
    })

    const handleClick = value => { //rating
      setCurrentValue(value)
      setInput({
          ...input,
          rating:value
      })
  };

  const handleMouseOver = value => {
    setHoverValue(value)
};
const handleMouseLeave = ()=>{
    setHoverValue(undefined)
};
   
const handleChange = (e)=>{ //textarea>> description
  setInput({
      ...input,
      description: e.target.value
  })
}

const handleSelect = (e) => {
  setInput({
    ...input,
    activityId: e.target.value
  })
}


const handleMostrar = (e)=> {
  if(classForm === "hide") setClassForm("show")
  if(classForm === "show") setClassForm("hide")
}


const handleSubmit = (e) => { //button
  if(!input.description || !input.rating ){
      e.preventDefault()
      Swal({
          title:"Complete todos los campos.",
          icon: "warning",
          position:"bottom",
          timer: 2000,
          
      });
  }/* else if (allReviewUser.find((r)=>r.activityId === input.activityId)) {
          e.preventDefault()
          alert("ya realizaste una review de esta clase")
          setClassForm("hide")
  } */else{
      e.preventDefault()
      dispatch(postReview(input))
      console.log("input", input)
      setInput({
          rating: " ",
          description:" ",
          activityId: " ",
          userId: " "
      })
      Swal({
          title:"Reseña enviada correctamente",
          buttons:"aceptar",
          icon:"success",
          /* position: "center", */
          timer: 2000,
          toast: true,
          position:"top-end",
      })
  }
  setClassForm("hide")
}

useEffect(()=>{
  
  dispatch(getReviewsByUser(id))
},[dispatch, id])

  useEffect(()=>{
    dispatch(getActivity())
  },[dispatch])
   
  useEffect(()=> {
    dispatch(getUserById(uid))
  },[dispatch, uid])

  useEffect(()=> {
    dispatch(getAllOrdersByUser(id))
  },[dispatch, id])




  return (

    <div className={s.containerActividades}>
      <div className={s.actividadesEncabezado}>
          <h1>Mis actividades</h1>
         {
           actividades3?(
            <div>
            {
                    actividades3.map((a)=>(
                          
                      <>
                      <div className={s.myActivitiesContainer}>
                        <div className={s.myActivitiesCard}>
                          <p>{a.name}</p>
                          <img src={a.image} alt={a.name} />
                          <button 
                            onClick={handleMostrar}
                            className={s.myActivitiesBtn}    
                            >mostrar</button>
                          </div>  
                      </div>

                      </>
                    ))
             } 
             </div>
           ) : <p> No tenes compras confirmadas... <br />¿Que estas esperando?</p> 
         }
           
      </div>
       
   
      <div    className={classForm} >
                        <div className={s.createReviewContainer}>
                          <div className={s.createReviewHeader}>
                            <img 
                                src={logo} 
                                style={{ width: 85, objectFit: "cover", justifyContent: "center"}}
                                alt="logo"
                            />
                            <h3 className={s.createReviewTitle}>Power Gym</h3>
                            <h4 className={s.createReviewh4}>¿Estas conforme con nuestro servicio? Dejanos tu opinion</h4>
                          </div>
                            <form className={s.CreateReaviewForm} onSubmit>
                                <div style={styles.stars}>
                                    {
                                        stars.map((_, index)=> {
                                            return (
                                                <FaStar
                                                    key={index}
                                                    size={24}
                                                    style={{
                                                        marginRight:10,
                                                        cursor: "pointer"
                                                    }}
                                                    color={( hoverValue || currentValue) > index ? colors.orange : colors.grey}
                                                    onClick={()=> handleClick(index + 1)}
                                                    onMouseOver={()=> handleMouseOver(index + 1)}
                                                    onMouseLeave= {handleMouseLeave}
                                                />
                                            )
                                        })
                                    }
                                </div>
                                <select 
                                  name="activityId" 
                                  id="activityId"
                                  key="activityId"
                                  onClick={handleSelect}
                                  className={s.CreateReaviewSelect}
                                >
                                  <option value="">Tu Actividad</option>
                                  {
                                    actividades3.map((a)=>(
                                      <option key={a.id} value={a.id}  > {a.name}</option>
                                    ))
                                  }
                                

                                </select>
                                <div>
                                    <textarea
                                      placeholder='Dejanos tu comentario'
                                      style={styles.textarea}
                                      onChange={handleChange}
                                      cols={40}
                                    />
                                </div>
                                <div>
                                  <button 
                                    style={styles.button}
                                    onClick={(e)=> handleSubmit(e)}
                                    className={s.myActivitiesBtn}
                                  >
                                    Enviar
                                  </button>
                                </div>   
                            </form>
                        </div>
                      </div>
    </div>
      
  )
}

const styles = {
  container: {
      display:"flex",
      flexDirection: "column",
      alignItems:"center"
  },
  textarea: {
      border: "1px solid #a9a9a9",
      borderRadius: 5,
      with:300,
      margin: "20px 0",
      minHeight: 100,
      padding:10
  },
  button:{
      border: "1px solid #a9a9a9",
      borderRadius: 5,
      with:300,
      padding:10
  },

  /*  #review:{
    display:none
  }  */
}


