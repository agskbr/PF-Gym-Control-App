import React from "react";
import { useSelector } from "react-redux";
import style from "./Perfil.module.css";
import EditProfile from "./EditProfile/EditProfile";

export default function Perfil() {
  const { user } = useSelector((state) => state.login);
  console.log("usuarios", user)

  return (
    <div className={style.principalContainer}>
      <div className={style.perfilUser}>
        <div className={style.perfilUserName}>
          <div className={style.userImg}>
            <img
              alt="user"
              src={
                user.photoURL
                  ? user.photoURL
                  : "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"
              }
            />
          </div>
          <p>Nombre: {user.displayName ? user.displayName : "Cargando.."} </p>
          <p>Email: {user.email ? user.email : "Cargando.."}</p>
          <p>
            Teléfono: {user.phoneNumber ? user.phoneNumber : "No hay número"}
          </p>
          <button
            onClick={() => {
              document.getElementById("editProfileDialog").showModal();
            }}
          >
            {" "}
          Actualizar Datos{" "}
          </button>
        </div>
        <EditProfile/>
      </div>
      
    </div>
  );
}
