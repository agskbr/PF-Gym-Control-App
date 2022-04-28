import React from "react";
import CustomItemSideBar from "../CustomItemSideBar/CustomItemSideBar";
import style from "./SideBar.module.css";

export default function SideBar() {
  return (
    <div className={style.sideBarContainer}>
      <div className={style.headerSideBar}>
        <div className={style.gymLogo}></div>
        <div className={style.nameGym}>
          <span>Nombre Gimnasio</span>
        </div>
      </div>
      <div className={style.separator}></div>
      <div className={style.contentSideBar}>
        <CustomItemSideBar name="Usuarios"/>
        <CustomItemSideBar onClick={() => console.log("Change AdminCardView")} name="Clases"/>
        <CustomItemSideBar name="Instructores"/>
      </div>
    </div>
  );
}
