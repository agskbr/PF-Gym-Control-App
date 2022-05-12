import React, { useState } from "react";
import CustomItemSideBar from "../CustomItemSideBar/CustomItemSideBar";
import logoUser from "../../../../assets/logo.png";
import {
  requestUserLogin,
  userSignOut,
} from "../../../../store/actions/actions-login";
import { Link } from "react-router-dom";
import style from "./SideBar.module.css";
import {
  FaUsers,
  FaDumbbell,
  FaClipboard,
  FaArrowCircleLeft,
  FaPercent,
} from "react-icons/fa";
import { useDispatch } from "react-redux";

export default function SideBar({ setTypeOfCardView }) {
  const dispatch = useDispatch();
  const [selected, setSeletected] = useState("Usuarios");
  return (
    <div className={style.sideBarContainer}>
      <div className={style.headerSideBar}>
        <div className={style.gymLogo}>
          <img src={logoUser} alt="User" />
        </div>
        <div className={style.nameGym}>
          <span>Power Gym</span>
        </div>
      </div>
      <div className={style.separator}></div>
      <div className={style.contentSideBar}>
        <CustomItemSideBar
          icon={<FaUsers size={20} />}
          selected={selected}
          name="Usuarios"
          onClick={() => {
            setSeletected("Usuarios");
            setTypeOfCardView("Usuarios");
          }}
        />
        <CustomItemSideBar
          icon={<FaDumbbell size={20} />}
          selected={selected}
          onClick={() => {
            setSeletected("Clases");
            setTypeOfCardView("Clases");
          }}
          name="Clases"
        />
        <CustomItemSideBar
          icon={<FaClipboard size={20} />}
          name="Instructores"
          selected={selected}
          onClick={() => {
            setSeletected("Instructores");
            setTypeOfCardView("Instructores");
          }}
        />
        <CustomItemSideBar
          icon={<FaPercent size={20} />}
          name="Ofertas"
          selected={selected}
          onClick={() => {
            setSeletected("Ofertas");
            setTypeOfCardView("Ofertas");
          }}
        />
        <Link
          onClick={() => {
            dispatch(requestUserLogin());
            dispatch(userSignOut());
          }}
          className={style.link}
          to={"/"}
        >
          <CustomItemSideBar
            icon={<FaArrowCircleLeft size={20} />}
            name="LogOut"
          />
        </Link>
      </div>
    </div>
  );
}
