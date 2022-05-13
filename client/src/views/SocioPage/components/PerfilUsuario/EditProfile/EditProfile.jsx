import React, { useEffect, useState } from 'react'
import s from './EditProfile.module.css'
import { useDispatch, useSelector } from "react-redux";
import { getUserByEmail, createNewUser } from '../../../../../store/actions/index';

export default function EditProfile() {
    const dispatch= useDispatch();
    const { user } = useSelector((state) => state.login); //mail-id state login
    const email= user.email //para traerme el usuario x mail
    //console.log("email", email)
    const allUsers = useSelector((state)=>state.pgym.users)
    console.log("yan", allUsers)
    //const usuario = allUsers.find((u)=> u.email === email)
    //console.log("ACA", usuario)
    const [data, setData]= useState({
        nombre: user.displayName,
        email: user.email,
        telefono: "",

    })

    useEffect((email)=>{
        if(email){
            dispatch(getUserByEmail(email))
        }
    },[dispatch, email])

    /*inputs*/
    const handleChange = (e) => {
        setData({
          ...data,
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
        <form className={s.CreateReaviewForm} /* onSubmit={handleUpDate} */>
            <h2>COMPLETAAAAAAAAAAAAAAAAAAAA TU PERFIL</h2>
            <div>
                <label htmlFor="">Nombre : </label>
                <input 
                    type="text"
                    className={s.perfilInput}
                    name="nombre"
                    defaultValue={user.displayName || ""}
                />
            </div>
            <div>
                <label htmlFor="">Email: </label>
                <input
                    type="text"
                    className={s.perfilInput}
                    name="email"
                    defaultValue={user.email || ""}
                />
            </div>  
            <div>
                <label htmlFor="">Teléfono: </label>
                <input 
                    type="text"
                    className={s.perfilInput}
                    name="telefono"
                    onChange={handleChange}
                    value={data.telefono} /*ver*/
                />
            </div>
            <h3>Cambiar contraseña</h3>
            <div>
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
            </div>
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
