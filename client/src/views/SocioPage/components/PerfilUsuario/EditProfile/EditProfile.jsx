import React from 'react'
import s from './EditProfile.module.css'

export default function EditProfile() {
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
        <form className={s.CreateReaviewForm}>
            <h2>COMPLETAAAAAAAAAAAAAAAAAAAA TU PERFIL</h2>
            <div>
                <label htmlFor="">Nombre y Apellido: </label>
                <input type="text" />
            </div>
            <div>
                <label htmlFor="">Email: </label>
                <input type="email" />
            </div>  
            <div>
                <label htmlFor="">Teléfono: </label>
                <input type="number" />
            </div>

                <button 
                   /*  style={s.button} */
                   /*  onClick={} */
                    className={s.createReviewBoton} 
                >
                    Actualizar
                </button>
              
        </form>
    </div>
</dialog>
    
  )
}
