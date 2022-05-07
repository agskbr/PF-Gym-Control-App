import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { postReview } from '../../../../store/actions/actions-review';
import s from './CreateReview.module.css';
import Swal from "sweetalert";
import logo from '../../../../assets/logo.png'



export default function CreateReaview(props) {

    const dispatch = useDispatch();
    const activities = useSelector((state)=>state.pgym.allActivities)

    const [errors, setErrors] = useState({})

    /***validaciones */
    function validate (input){
        let errors = {};

        if(!input.description){
            errors.description = "debes completar tu reseña"
        }
        if(!input.rating){
            errors.rating = "debes seleccionar una opcion"
        }
        return errors;
    }

    const [input, setInput] = useState({
        description:"",
        rating: 0
    })
    
    function handleChange(e){
        setInput({
            ...input,
            description: e.target.value
        });
        setErrors(validate({
            ...input,
            description: e.target.value
        }));
    }

    function handleSelect(e){
        setInput({
            ...input,
            rating: e.target.value
        });
        setErrors(validate({
            ...input,
            rating: e.target.value
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        if(!input.rating ){
            Swal.fire({
                title: "Debes ingresar un valor",
                icon:"warning",
                position:"center",
                timer:2000,
                showConfirmButton:false,
                timeProgressBar:true,
            });
            return;
        }else{
            dispatch(postReview(input)) //deberia pasar el iduser??
            setInput({
                description:"",
                rating: 0
            })
            Swal.fire({
                title: "Gracias por dejarnos tu ",
                icon: "success",
                position: "center",
                timer: 2000,
                showConfirmButton: false,
                timerProgressBar: true,
            })
        }
    }

  return (

    <dialog id="reviewDialog" style={{ border: "none", height: "60vh" }}>
        <div
            style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
            <div style={{ justifyContent: "flex-end", display: "flex" }}>
                <button
                onClick={() => document.getElementById("reviewDialog").close()}
                >
                x
                </button>
            </div>
            
            <img 
                src={logo} 
                style={{ width: 100, objectFit: "cover", justifyContent: "center"}}
                alt="logo"
            />
            <div className={s.createReviewtitle}>
                <h3>Power Gym</h3>
                <h4>Dejanos lo que pensas sobre nuestro servicio</h4>
            </div>
            
            <textarea
                name="description"
                style={{ resize: "none" }}
                placeholder="Agrega tu review aquí"
                onChange={handleChange}
            ></textarea>
            {errors.description && (<span className={s.reviewErrors}>{errors.description}</span>)}
            <div>
                <select name="rating" className={s.createReviewSelect} onChange={handleSelect}>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                    <option value="">4</option>
                    <option value="">5</option>
                </select>
            </div>
            {errors.rating && (<span className={s.reviewErrors}>{errors.rating}</span>)}
            <button onClick={handleSubmit}>Enviar</button>
        </div>
      </dialog>
  )
}
