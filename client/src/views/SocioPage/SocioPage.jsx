import style from "./SocioPage.module.css";
import SideBar from "./components/Sidebar/SideBar";
import CenterDynamicView from "./components/CenterDynamicView/CenterDynamicView";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getActivity } from "../../store/actions/index";
import axios from 'axios';
import { BASE_URL } from '../../store/constantes';


export default function SocioPage() {
  const dispatch = useDispatch()
  const [itemSelected, setItemSelected] = useState("Mi Perfil");

 // const {data} = axios.get(`${BASE_URL}/user/${id}`) 

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
