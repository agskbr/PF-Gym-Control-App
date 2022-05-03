import React from "react";
import style from "./CustomItemSideBar.module.css";

export default function CustomItemSideBar({ onClick, name, icon }) {
  return (
    <button onClick={onClick} className={style.itemBtn}>
      <div className={style.itemOfSideBar}>
        {icon}
        <span>{name}</span>
      </div>
    </button>
  );
}
