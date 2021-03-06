import style from "./SocioPage.module.css";
import SideBar from "./components/Sidebar/SideBar";
import CenterDynamicView from "./components/CenterDynamicView/CenterDynamicView";
import { useEffect, useState } from "react";
import { getActivity } from "../../store/actions/index";
import { getAllOrdersByUser } from "../../store/actions/actions-orders";
import { useSelector, useDispatch} from "react-redux";
import { getUserById } from "../../store/actions/actions-user";
import { getOrderlineByOrderid } from "../../store/actions/actions-orders";


export default function SocioPage() {
  const dispatch = useDispatch()
  const [itemSelected, setItemSelected] = useState("Mi Perfil");

  const {uid} = useSelector((state)=> state.login.user )
  const {id} = useSelector((state)=> state.users.user); 
  const {orderId} = useSelector((state) => state.pgym.orders)
  const allOrders = useSelector((state)=> state.pgym.orders)
  const allActivities = useSelector((state)=> state.pgym.allActivities);
  // const Order = useSelector((state) => state.pgym.orders[0].activities[0].orderline)
  // console.log("orderL", Order)

 // const {data} = axios.get(`${BASE_URL}/user/${id}`) 

 useEffect(()=>{
  if(orderId){
    dispatch(getOrderlineByOrderid(orderId))
  }
},[dispatch, orderId])
  useEffect(()=> {
   dispatch(getUserById(uid))
  },[dispatch, uid])

  useEffect(()=> {
   dispatch(getAllOrdersByUser(id))
  },[dispatch, id])


  useEffect(()=>{
    dispatch(getActivity())
  },[dispatch])



  return (
    <div className={style.principalContainer}>
      <SideBar itemSelected={itemSelected} setItemSelected={setItemSelected} />
      <div className={style.centerViewContainer}>
        <CenterDynamicView itemSelected={itemSelected} />
      </div>
    </div>
  );
}
