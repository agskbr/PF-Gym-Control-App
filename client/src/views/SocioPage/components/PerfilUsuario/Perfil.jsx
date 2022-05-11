import React from "react";
import { useSelector } from "react-redux";
import style from "./Perfil.module.css";

export default function Perfil() {
  const { user } = useSelector((state) => state.login);

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
        </div>
        {/*  <Link to={"/sociodashboard"}>
          <button>Volver</button>
        </Link> */}
        {/*  <button onClick={() => dispatch(userSignOut())}>SignOut</button> */}
      </div>
    </div>
  );
}
