import React from "react";
import style from "./CustomItemSideBar.module.css";

export default function CustomItemSideBar({ onClick, name }) {
  return (
    <button onClick={onClick} className={style.itemBtn}>
      <div className={style.itemOfSideBar}>
        <span>{name}</span>
      </div>
    </button>
  );
}
