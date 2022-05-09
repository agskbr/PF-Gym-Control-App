import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  userSignOut,
  validateUserIsLogged,
} from "../../../../store/actions/actions-login";
import style from "./Perfil.module.css";
import { Link } from "react-router-dom";

export default function Perfil() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.login);
  console.log(user.photoURL);
  useEffect(() => {
    dispatch(validateUserIsLogged());
  }, [dispatch]);

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className={style.principalContainer}>
      <div className={style.perfilUser}>
        <div className={style.perfilUserName}>
          <div className={style.userImg}>
            <img
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
