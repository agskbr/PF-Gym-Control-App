import style from "./SocioPage.module.css";
import SideBar from "./components/Sidebar/SideBar";
import CenterDynamicView from "./components/CenterDynamicView/CenterDynamicView";
import { useEffect, useState } from "react";
import { getActivity } from "../../store/actions/index";
import { getOrderlineByOrderid, getAllOrdersByUser } from "../../store/actions/actions-orders";
import { useSelector } from "react-redux";
import { getUserById } from "../../store/actions/actions-user";
import { useDispatch } from "react-redux";


export default function SocioPage() {
  const [itemSelected, setItemSelected] = useState("Mi Perfil");



  return (
    <div className={style.principalContainer}>
      <SideBar itemSelected={itemSelected} setItemSelected={setItemSelected} />
      <div className={style.centerViewContainer}>
        <CenterDynamicView itemSelected={itemSelected} />
      </div>
    </div>
  );
}
