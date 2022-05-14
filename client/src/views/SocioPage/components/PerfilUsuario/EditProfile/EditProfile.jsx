import React, { useEffect, useState } from 'react'
import s from './EditProfile.module.css'
import { useDispatch, useSelector } from "react-redux";
import { getUserById, createNewUser } from '../../../../../store/actions/actions-user';

export default function EditProfile() {

    //me traigo del estado local del login el usuario
    const currentUser = useSelector((state) => state.login.user); //mail-id state login
    console.log("currentU", currentUser)
    const id = currentUser.uid
    console.log("ID", id)

    const dispatch = useDispatch();
    
    const [user, setUser]= useState({
        nombre: currentUser.displayName,
        email: currentUser.email,
        telefono: "",

    })

    useEffect((id)=>{
       /* dispatch(getUserById(id)) */
    },[dispatch])

    /*inputs*/
    const handleChange = (e) => {
        setUser({
          ...user,
          [e.target.name]: e.target.value,
        });
      };
  return (
    <dialog id="editProfileDialog" style={{ border: "none", height: "80vh"}}>
    <div className={s.Container}>
        <div className={s.createReviewHeader}>
            <div style={{ justifyContent: "flex-end", display: "flex" }}>
                <button
                onClick={() => document.getElementById("editProfileDialog").close()}
                className={s.createReviewBoton}
                >
                x
                </button>
            </div>
           
        </div>
        <h6>Actualizar Perfil</h6>
        <form className={s.CreateReaviewForm} >
            <h2>COMPLETAAAAAAAAAAAAAAAAAAAA TU PERFIL</h2>
            <div>
                <label htmlFor="">Nombre : </label>
                <input 
                    type="text"
                    className={s.perfilInput}
                    name="nombre"
                    defaultValue={currentUser.displayName || ""}
                />
            </div>
            <div>
                <label htmlFor="">Email: </label>
                <input
                    type="text"
                    className={s.perfilInput}
                    name="email"
                    defaultValue={currentUser.email || ""}
                />
            </div>  
            <div>
                <label htmlFor="">Teléfono: </label>
                <input 
                    type="text"
                    className={s.perfilInput}
                    name="telefono"
                    onChange={handleChange}
                    value={user.telefono} /*ver*/
                />
            </div>
            <h3>Cambiar contraseña</h3>
           {/*  <div>
                <label htmlFor="">Contraseña actual: </label>
                <input type="" />
            </div>
            <div>
                <label htmlFor="">Nueva contraseña: </label>
                <input type="" />
            </div>
            <div>
                <label htmlFor="">reingresar contraseña: </label>
                <input type="" />
            </div>*/}
            <div> 
            <button 
                   /*  style={s.button} */
                   /*  onClick={} */
                    className={s.createReviewBoton} 
                >
                    Actualizar
                </button>
            </div>

               
              
        </form>
    </div>
</dialog>
    
  )
}
