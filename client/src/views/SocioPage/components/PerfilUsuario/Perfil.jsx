import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyAccount } from "../../../../store/actions/actions-login";
import style from "./Perfil.module.css";
import EditProfile from "./EditProfile/EditProfile";
import {
  createNewUser,
  getUserById,
} from "../../../../store/actions/actions-user";
import {
  completeOrder,
  setOrderStatus,
} from "../../../../store/actions/actions-orders";
import swal from "sweetalert";
import { useLocation } from "react-router-dom";

export default function Perfil() {
  // const { search } = useLocation();
  const queryString = window.location.search;
  console.log(queryString);
  const query = new URLSearchParams(queryString);
  const status = query.get("status");

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.login.user);
  const {uid} = useSelector((state) => state.login.user);
  const usuario = useSelector((state)=> state.users.user)//
  const orders = useSelector((state) => state.pgym.orders);
  //console.log("usuario", usuario)
  const [statusOrder, setStatusOrder] = useState("");

  const [input, setInput] = useState({});

  useEffect(() => {
    setInput({
      ...usuario,
    });
  }, [usuario]);

  useEffect(() => {
    if (uid) {
      dispatch(getUserById(uid));
    }
  }, [dispatch, uid]);

  useEffect(() => {
    validateUser();
    dispatch(setOrderStatus(statusOrder));
  }, [dispatch, statusOrder]);

  const handleChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createNewUser(input));
    swal({
      title: "Create profile",
      icon: "success",
      position: "center",
      timer: 2000,
    });
  };

  const validateUser = () => {
    console.log(status);
    setStatusOrder(status);
  };

  // const completeStatusOrder = () => {
  //   if (statusOrder === "approved") {
  //     completeOrder(orders[0].id);
  //   }
  // };

  const [verify, setVerify] = useState(currentUser.emailVerified);

  let verified = !verify ? (
    <div>
      <p className={style.notVerified}>Email no verificado</p>
      <button
        onClick={() => {
          dispatch(verifyAccount());
        }}
        className={style.verify}
      >
        Verifica tu correo electrónico
      </button>
    </div>
  ) : (
    ""
  );

  // function validateUser() {
  //   const orderId = orders[0].id;
  //   console.log(orderId);
  //   console.log(query);

  //   console.log(status);
  //   if (status === "approved") {
  //     completeOrder(orderId);
  //   }
  // }

  return (
    <div className={style.perfilContainer}>
      {
        usuario? (
          <div className={style.perfilUser}>
            <div className={style.perfilUserName}>
              <div className={style.userImg}>
                <img
                   alt="user"
                  src={
                    currentUser.photoURL
                      ? currentUser.photoURL
                      : "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"
                  }
                />
              </div>
              <p>Nombre: {usuario.name } </p>
              <p>Apellido: {usuario.lastName}</p>
              <p>Email: {usuario.email}</p>
                 {verified} 
              <p>Teléfono: {usuario.phoneNumber}</p>
              <button
                className={style.perfilAddBtn}
                onClick={() => {
                document.getElementById("editProfileDialog").showModal();
                }}
              >
                {" "}
                Actualizar Datos{" "}
              </button>
            </div>
          <EditProfile />
        </div>
      ) : (
        <div className={style.perfilUser}>
          <div className={style.perfilUserName}>
            <div className={style.userImg}>
              <img
                alt="user"
                src={
                  currentUser.photoURL
                    ? currentUser.photoURL
                    : "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"
                }
              />
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="">Nombre : </label>
                <input
                  type="text"
                  className
                  name="nombre"
                  defaultValue={currentUser.displayName || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="">Email: </label>
                <input
                  type="text"
                  className
                  name="email"
                  defaultValue={currentUser.email || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="">Teléfono: </label>
                <input
                  type="text"
                  className
                  name="telefono"
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Confirmar Datos</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
