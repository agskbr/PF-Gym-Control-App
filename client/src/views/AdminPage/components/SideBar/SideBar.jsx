import React from "react";
import CustomItemSideBar from "../CustomItemSideBar/CustomItemSideBar";
import logoUser from "../../../../assets/user.png";
import style from "./SideBar.module.css";
import { FaUsers, FaDumbbell, FaClipboard } from "react-icons/fa";

export default function SideBar() {
  return (
    <div className={style.sideBarContainer}>
      <div className={style.headerSideBar}>
        <div className={style.gymLogo}>
          <img src={logoUser} alt="User" />
        </div>
        <div className={style.nameGym}>
          <span>Nombre Gimnasio</span>
        </div>
      </div>
      <div className={style.separator}></div>
      <div className={style.contentSideBar}>
        <CustomItemSideBar icon={<FaUsers size={20} />} name="Usuarios" />
        <CustomItemSideBar
          icon={<FaDumbbell size={20} />}
          onClick={() => console.log("Change AdminCardView")}
          name="Clases"
        />
        <CustomItemSideBar
          icon={<FaClipboard size={20} />}
          name="Instructores"
        />
      </div>
    </div>
  );
}
