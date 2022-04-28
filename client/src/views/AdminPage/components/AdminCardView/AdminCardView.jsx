import React from "react";
import style from "./AdminCardView.module.css";

export default function AdminCardView() {
  return (
    <div className={style.principalContainer}>
      <h4>Actividades</h4>
      <button onClick={() => document.getElementById("dialogId").showModal()} className={style.addButton}>Agregar</button>
      <div className={style.card}>
        <div className={style.headerOfCard}>
          <div className={style.header}>ID</div>
          <div className={style.header}>Nombre</div>
          <div className={style.header}>Descripcion</div>
          <div className={style.header}>Price</div>
          <div className={style.header}>Image</div>
          <div className={style.header}>Dia</div>
          <div className={style.header}>Horario</div>
          <div className={style.header}>Capacidad</div>
        </div>
      </div>
    </div>
  );
}
