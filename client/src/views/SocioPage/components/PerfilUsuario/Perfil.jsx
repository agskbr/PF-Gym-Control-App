import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { verifyAccount } from "../../../../store/actions/actions-login";
import style from "./Perfil.module.css";
import EditProfile from "./EditProfile/EditProfile";
import {getUsers, createNewUser, getUserById} from '../../../../store/actions/actions-user'
import swal from "sweetalert";

export default function Perfil() {
  const dispatch = useDispatch()
  
  const currentUser = useSelector((state) => state.login.user);
  //console.log("user logeado", currentUser)
  //const uid = currentUser.uid;
  const uid = "7d5241ddde3d429a80705f32f7ba"
  //console.log("UID", uid)
  const usuarios = useSelector((state)=> state.users.users)
  //console.log("33", usuarios)

 const usuario = usuarios.find((user)=> user.uid === uid);
 //console.log("YO", usuario)
   const [input, setInput]= useState({
     uid: currentUser.uid,
     nombre:currentUser.displayName,
     email: currentUser.email,
     telefono:""
   })

   const handleChange = (e) => {
     e.preventDefault();
     setInput({
       ...input,
       [e.target.name]: e.target.value,
     });
   }

   const handleSubmit = (e) => {
     e.preventDefault();
     dispatch(createNewUser(input))
     swal({
      title: "Create profile",
      icon: "success",
      position: "center",
      timer: 2000,
     })
   }

  
  useEffect(()=>{
    dispatch(getUsers())
  },[dispatch])

  return (
    
    <div className={style.principalContainer}>
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
              <p>Nombre: {usuario.name} </p>
              <p>Email: {usuario.email}</p>
                {/*  {verified}  */}
              <p>Teléfono: {usuario.phoneNumber}</p>
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
        ):(
          <div className={style.perfilUser}>
            <div className={style.perfilUserName}>
              <div className={style.userImg}>
                <img
                  alt="user"
                  src={  currentUser.photoURL ? currentUser.photoURL: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"}
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
                <button 
                  type="submit"
                > 
                  Confirmar Datos 
                </button>
              </form>
            </div>
          </div>
        )
      }
    </div>
  );
}
