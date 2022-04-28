import React from "react";
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
        <div className={style.itemOfSideBar}>
          <span>Usuarios</span>
        </div>
        <div className={style.itemOfSideBar}>
          <span>Clases</span>
        </div>
        <div className={style.itemOfSideBar}>
          <span>Instructores</span>
        </div>
      </div>
    </div>
  );
}
