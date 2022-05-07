import React from "react";
import style from "./CenterDynamicView.module.css";
export default function CenterDynamicView({ itemSelected, contentOfCard }) {
  return (
    <div className={style.centerDynamicContainer}>
      <div>
        <h1>{itemSelected}</h1>
      </div>
      <div>{contentOfCard}</div>
    </div>
  );
}
