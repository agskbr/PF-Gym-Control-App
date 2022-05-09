import React from "react";
import style from "./Loader.module.css";
export default function Loader() {
  return (
    <div className={style.loaderContainer}>
      <span className={style.loader}></span>
    </div>
  );
}
