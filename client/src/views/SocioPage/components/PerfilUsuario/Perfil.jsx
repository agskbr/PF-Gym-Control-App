import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyAccount } from "../../../../store/actions/actions-login";
import style from "./Perfil.module.css";
import EditProfile from "./EditProfile/EditProfile";

export default function Perfil() {
  const { user } = useSelector((state) => state.login);
  //console.log("user logeado", user)

  const dispatch = useDispatch()

  /* const [verify, setVerify] = useState(user.emailVerified) */
/* 
  let verified = !verify ? 
    <div>
      <p className={style.notVerified}>Email no verificado</p>
      <button onClick={() => {
        dispatch(verifyAccount())
    
        }} className={style.verify}>Verifica tu correo electrónico
      </button>
    </div> : ''
 */

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
        {/*   {verified} */}
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
