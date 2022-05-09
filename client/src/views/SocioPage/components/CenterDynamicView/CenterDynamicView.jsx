import React from "react";
import MyActivities from "../MyActivities/MyActivities";
import style from "./CenterDynamicView.module.css";
import Recetas from "../Recetas/Recetas";
import MisCompras from "../MisCompras/MisCompras"
import PerfilUsuario from '../PerfilUsuario/Perfil';

export default function CenterDynamicView({ itemSelected, contentOfCard }) {
  return (
    <div className={style.centerDynamicContainer}>

      <div>
        <h1>{itemSelected}</h1>
      </div>
      <div>{itemSelected === "Actividades" ? <MyActivities/>
            : itemSelected === "Recetas" ? <Recetas/> 
            : itemSelected === "Compras" ? <MisCompras/>
            : itemSelected === "Mi Perfil" ? <PerfilUsuario/>
            : "Bienvenido a tu panel de usuario"}</div>
    </div>
  );
}
