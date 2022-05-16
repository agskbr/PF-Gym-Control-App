import style from "./SocioPage.module.css";
import SideBar from "./components/Sidebar/SideBar";
import CenterDynamicView from "./components/CenterDynamicView/CenterDynamicView";
import { useState } from "react";


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
