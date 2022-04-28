import React from "react";
import style from "./CustomModal.module.css";

export default function CustomModal() {
  return (
    <dialog className={style.dialogContainer} id="dialogId">
      <div className={style.headerDialog}>
        <button
          onClick={() => document.getElementById("dialogId").close()}
          className={style.closeBtn}
        >
          x
        </button>
      </div>
      <h4>Crear una nueva actividad</h4>
      <div className={style.contentDialog}>
        <input className={style.customInput} type="text" placeholder="Nombre" />
        <textarea
          className={style.customTextArea}
          name="description"
          placeholder="Descripcion"
        ></textarea>
        <input className={style.customInput} type="text" placeholder="Price" />
        <input className={style.customInput} type="text" placeholder="Image" />
        <input className={style.customInput} type="text" placeholder="Dia" />
        <input
          className={style.customInput}
          type="text"
          placeholder="Horario"
        />
        <input
          className={style.customInput}
          type="text"
          placeholder="Capacidad"
        />
      </div>
      <button
        onClick={() => {
          //Despachar la accion para crear actividad
          document.getElementById("dialogId").close();
        }}
        className={style.createBtn}
      >
        Crear
      </button>
    </dialog>
  );
}
