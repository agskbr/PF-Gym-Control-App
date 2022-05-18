import React, { useEffect, useState } from 'react'
import s from './EditProfile.module.css'
import { useDispatch, useSelector } from "react-redux";
import { editUser} from '../../../../../store/actions/actions-user';
import logo from '../../../../../assets/logo.png'

//me traigo los users logueados para poder la imagen??
export default function EditProfile() {

    const actual = useSelector((state)=> state.users.user)
    // const {uid} = useSelector((state)=> state.login.user )
    
    const dispatch = useDispatch();
    
    const [user, setUser]= useState({
        name: "",
        lastName:"",
        phoneNumber: "",
        image: "",
    })
    
    useEffect(()=>{
       setUser({
           name: actual.name,
           lastName: actual.lastName,
           phoneNumber: actual.phoneNumber,
        //    image: actual.image
       })
    },[actual])

    /*inputs*/
    const handleChange = (e) => {
        e.preventDefault()
        setUser({
          ...user,
          [e.target.name]: e.target.value,
        });
      };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editUser(actual.id, user))
        document.getElementById("editProfileDialog").close()
    }
  return (
    <dialog id="editProfileDialog" style={{ border: "none", height: "80vh"}}>
        <div className={s.editPerfilContainer}>
            <div className={s.createReviewHeader}>
                <div style={{ justifyContent: "flex-end", display: "flex" }}>
                    <button
                    onClick={() => document.getElementById("editProfileDialog").close()}
                    className={s.editPerfilAddBtn}
                    >
                    x
                    </button>
                </div>
                <img src={logo} alt={logo} width="90"/>
            
            </div>
            <h6 className={s.editProfileForm}>Actualizar Perfil</h6>
            <form className={s.editProfileForm} onSubmit={handleSubmit} >
                <div>
                    <label htmlFor="">Nombre : </label>
                    <input 
                        type="text"
                        className={s.perfilInput}
                        name="name"
                        value={user.name ?? ""}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="">Apellido : </label>
                    <input 
                        type="text"
                        className={s.perfilInput}
                        name="lastName"
                        value={user.lastName ?? ""}
                        onChange={handleChange}
                    />
                </div>
                {/* <div> */}
                    {/* <label htmlFor="">Email: </label>
                    <input
                        type="text"
                        className={s.perfilInput}
                        name="email"
                        defaultValue={actual.email || ""}
                    />
                </div>   */}
                <div>
                    <label htmlFor="">Teléfono: </label>
                    <input 
                        type="text"
                        className={s.perfilInput}
                        name="phoneNumber"
                        onChange={handleChange}
                        value={user.phoneNumber ?? ""} 
                    />
                </div>
                <div>
                <button 
                        className={s.editPerfilAddBtn} 
                        type="submit"
                    >
                        Actualizar
                    </button>
                </div>
            </form>
        </div>
    </dialog>
    
  )
}
