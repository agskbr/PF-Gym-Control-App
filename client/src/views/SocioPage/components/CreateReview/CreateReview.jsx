import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import { postReview } from '../../../../store/actions/actions-review';
import s from './CreateReview.module.css';
import Swal from "sweetalert";
import logo from '../../../../assets/logo.png'



export default function CreateReaview() {

    const dispatch = useDispatch();
    //verificar si esta logueado para hacer la review
    const [input, setInput] = useState({
        description:"",
        rating: 0
    })
    
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e){
        e.preventDefault()
        if(input.rating < 1){
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

    <dialog id="reviewDialog" style={{ border: "none", height: "30vh" }}>
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
            <h4>Dejanos lo que pensas sobre nuestro servicio</h4>
            <img 
                src={logo} 
                style={{ width: 100, objectFit: "cover" }}
                alt="logo"
            />
            <div className={s.createReviewtitle}>
                <h3>Power Gym</h3>
            </div>
            <textarea
                name="review"
                style={{ resize: "none" }}
                placeholder="Agrega tu review aquí"
            ></textarea>
            <div>
                <select name="rating" className={s.createReviewSelect}>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                    <option value="">4</option>
                    <option value="">5</option>
                </select>
            </div>
        </div>
      </dialog>


    
   /*  <div className={s.CreateReviewContainer}>
        <div className={s.createRevLogo}>
            <img 
                src={logo} 
                style={{ width: 100, objectFit: "cover" }}
                alt="logo"
            />
            <div className={s.createReviewtitle}>
              <h3>Power Gym</h3>
            </div>
        </div>

        <div>
            <textarea
                value={input.description}
                onChange={handleChange}
                placeholder="Dejanos tu opinion"
                name="description"
                className={s.createReviewTextarea}
            />
            <div>
                <select name="rating" className={s.createReviewSelect}>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                    <option value="">4</option>
                    <option value="">5</option>
                </select>
            </div>
            <button onClick={handleSubmit}>Enviar</button>
            </div>
            
    </div> */
  )
}
