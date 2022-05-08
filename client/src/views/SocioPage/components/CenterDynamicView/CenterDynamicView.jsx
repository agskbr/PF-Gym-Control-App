import React from "react";
import MyActivities from "../MyActivities/MyActivities";
import style from "./CenterDynamicView.module.css";

export default function CenterDynamicView({ itemSelected, contentOfCard }) {
  return (
    <div className={style.centerDynamicContainer}>

      <div>
        <h1>{itemSelected}</h1>
      </div>
      <div>{itemSelected === "Actividades" ? <MyActivities/>: "hola"}</div>
    </div>
  );
}
