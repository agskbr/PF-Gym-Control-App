import React, { useEffect, useState } from 'react'
import s from './EditProfile.module.css'
import { useDispatch, useSelector } from "react-redux";
import { editUser} from '../../../../../store/actions/actions-user';


//me traigo los users logueados para poder la imagen??


// const validatePhonenumber = (input) =>{
//     console.log("input", input)
//     const errors = {};
//     if (!input.phoneNumber.match(/^(()?\d{3}())?(-|\s)?\d{3}(-|\s)\d{4}$/)){
        // /^\d{7,14}$/.test(input.phoneNumber)
        // /^\(?(\d{3})\)?[-]?(\d{3})[-]?(\d{4})$/.test(input.phoneNumber)
//         errors.phoneNumber = "El teléfono debe ser válido";
//      }
//       return errors;

// }


export default function EditProfile() {

    const actual = useSelector((state)=> state.users.user)
    // const {uid} = useSelector((state)=> state.login.user )
    
    const dispatch = useDispatch();
    // const [errors, setErrors] = useState({})

    //     const [input, setInput] = useState({
    //     phoneNumber:""
    // })
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
        // setErrors(validatePhonenumber(user));
        // if (Object.keys(errors).length === 0) {
        //     dispatch(editUser(actual.id, input)) 
        // };
        document.getElementById("editProfileDialog").close()
    }


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
            <form className={s.CreateReaviewForm} onSubmit={handleSubmit} >
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
                        // Error={errors.phoneNumber} 
                    />
                </div>
                <div>
                <button 
                        className={s.createReviewBoton} 
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
