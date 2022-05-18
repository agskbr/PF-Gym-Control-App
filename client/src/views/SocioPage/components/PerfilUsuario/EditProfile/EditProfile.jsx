import React, { useEffect, useState } from 'react'
import s from './EditProfile.module.css'
import { useDispatch, useSelector } from "react-redux";
import { editUser} from '../../../../../store/actions/actions-user';
import logo from '../../../../../assets/logo.png'


//me traigo los users logueados para poder la imagen??


const validatePhonenumber = (input) =>{
    console.log("input", input)
    const errors = {};
    /* if (!input.phoneNumber) {
        errors.phoneNumber = "Debe ingresar un numero de teléfono";
    }else */ if (input.phoneNumber.length < 9 || input.phoneNumber.length > 12) {
        errors.phoneNumber = "El telefono debe ser válido";
    }/* else if (input.phoneNumber[0] === "1" && input.phoneNumber[1] === "5") {
        errors.phoneNumber = "Debes ingresar tu numero sin el 15";
    } *//* else if (!/^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/g.test(input.phoneNumber))
    {
        errors.phoneNumber = "Tu número debe tener el siguiente formato: 3813540145";
    } */
    /* if (!/^\(?(\d{3})\)?[-]?(\d{3})[-]?(\d{4})$/g.test(input.phoneNumber)){
    // /^\d{7,14}$/.test(input.phoneNumber)
    ///^\(?(\d{3})\)?[-]?(\d{3})[-]?(\d{4})$/.test(input.phoneNumber)
    errors.phoneNumber = "El teléfono debe ser válido";
    } */
    
    return errors;
}


export default function EditProfile() {

    const actual = useSelector((state)=> state.users.user)
    // const {uid} = useSelector((state)=> state.login.user )
    
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        phoneNumber:""
    })
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
        setErrors(validatePhonenumber(input));
        setInput({
            //...user,
            //...input,
            [e.target.name]: e.target.value,
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validatePhonenumber(input));
        if (Object.values(errors).length === 0) {
            dispatch(editUser(actual.id, input)) 
        };
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
                        value={input.phoneNumber??""}
                        // Error={errors.phoneNumber}
                      />
                      <br/>
                      <label style={
                          {
                              color:"red",
                              fontSize: "1ex"
                          }
                      }>{errors.phoneNumber}</label>
                </div>
                <div>
                <button 
                        className={s.editPerfilAddBtn} 
                          type="submit"
                          disabled={Object.values(errors).length > 0}
                    >
                        Actualizar
                    </button>
                </div>
            </form>
        </div>
    </dialog>
    
  )
}
