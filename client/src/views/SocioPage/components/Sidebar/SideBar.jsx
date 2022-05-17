import React, { useState } from "react";
import s from "./SideBar.module.css";
import { AiFillHome } from "react-icons/ai";
import { CgGym } from "react-icons/cg";
import { GiChickenOven } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import { GoSignOut } from "react-icons/go";
import logo from "../../../../assets/logo.png";
import { useDispatch } from "react-redux";
import {
  requestUserLogin,
  userSignOut,
} from "../../../../store/actions/actions-login";
import { useNavigate } from "react-router-dom";

export default function SideBar({ setItemSelected }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const menuItem = [
    {
      icon: <FaUserCircle />,
      name: "Mi Perfil",
      path: "#/miperfil",
    },
    {
      name: "Inicio",
      icon: <AiFillHome />,
      path: "/",
    },
    {
      name: "Actividades",
      icon: <CgGym />,
      path: "#/myActivities",
    },
    {
      name: "Recetas",
      icon: <GiChickenOven />,
      path: "#/Recetas",
    },
    {
      name: "Compras",
      icon: <BsCartFill />,
      path: "#/miscompras",
    },
    {
      name: "Cerrar sesión",
      icon: <GoSignOut />,
      path: "/",
    },
  ];
  return (
    <div className={s.sideBarUserContainer}>
      <div
        style={{ width: isOpen ? "200px" : "55px" }}
        className={s.sideBarUser}
      >
        <div className={s.sideBarLogo}>
          <img src={logo} alt="logo" width={37} onClick={toggle} />
          <h1
            style={{ display: isOpen ? "block" : "none" }}
            className={s.sideBarTitle}
          >
            Gym Control
          </h1>
        </div>
        {menuItem.map((item, index) => (
          <a
            href={item.path}
            onClick={() => {
              if (item.name === "Cerrar sesión") {
                dispatch(requestUserLogin());
                navigate("/", { replace: true });
                return dispatch(userSignOut());
              }
              setItemSelected(item.name);
            }}
            key={index}
            className={s.sideBarLink}
            activeclassname="active"
          >
            <div className={s.sideBarIcon}>{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className={s.sideBarText}
            >
              {item.name}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
