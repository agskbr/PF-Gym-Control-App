import React from "react";
import style from "./CustomItemSideBar.module.css";

export default function CustomItemSideBar({ onClick, name, icon, selected }) {
  return (
    <button onClick={onClick} className={style.itemBtn}>
      <div
        className={
          selected === name ? style.itemSelectedOfSideBar : style.itemOfSideBar
        }
      >
        {icon}
        <span>{name}</span>
      </div>
    </button>
  );
}
