import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { postReview } from '../../../../store/actions/actions-review';
import s from './CreateReview.module.css';
import Swal from "sweetalert";
import logo from '../../../../assets/logo.png'
import {getActivity} from '../../../../store/actions/index'
import {FaStar} from 'react-icons/fa'


const colors = {
    orange: "#eb4e27",
    grey: "#a9a9a9",
    
}


export default function CreateReaview() {

    const [errors, setErrors]= useState({});
    const dispatch = useDispatch();
    const allActivities = useSelector((state)=>state.pgym.allActivities);
    console.log("activ", allActivities)
    //const user = useSelector((state)=>state.login.user.uid);
    
    const stars= Array(5).fill(0);
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue]= useState(undefined);
    const [ input, setInput]= useState({
        rating: "",
        description:"",
        activityId: "",  
        userId: 1, //le seteo por defecto un id q este en base de datos para q funcione x ahora!!
    })

    function validaciones(input){
        let errors = {}

        if(!input.rating){
            errors.rating= "debes seleccionar un valor";
        };
        if(!input.description){
            errors.description="por favor ingresa una reseña"
        };
        if(!input.activityId){
            errors.activityId= "debes seleccionar una actividad"
        };
        return errors
    }

    

    const handleClick = value => { //rating
        setCurrentValue(value)
        setInput({
            ...input,
            rating:value
        })
        setErrors(validaciones({
            ...input,
            rating:value,
        }))
    };

    const handleMouseOver = value => {
        setHoverValue(value)
    };
    const handleMouseLeave = ()=>{
        setHoverValue(undefined)
    };

    const handleChange = (e)=>{ //textarea>> description
        setInput({
            ...input,
            description: e.target.value
        })
        setErrors(validaciones({
            ...input,
            description:e.target.value
        }))
    }
    const handleSelect = (e)=>{//actividad
        setInput({
            ...input,
            activityId: e.target.value,
            
        });
        setErrors(validaciones({
            ...input,
            activityId:e.target.value
        }))
    }

   const handleSubmit = (e) => { //button
        e.preventDefault()
        
        if(Object.values(errors).length !== 0){
            Swal({
                title:"Debes completar todos los campos, para poder realizar la reseña.",
                icon: "warning",
                position:"center",
                timer:2000,
                showConfirmButton:false,
                timerProgressBar:true,
            });
        }else{
            dispatch(postReview(input))
            setInput({
                rating: " ",
                description:" ",
                activityId: " ",  
                userId: " "
            })
            Swal({
                title:"Reseña enviada correctamente",
                buttons:"aceptar",
                icon:"success",
                position: "center",
                timer: 2000,
                showConfirmButton: false,
                timerProgressBar: true,
            })
            document.getElementById("reviewDialog").close();
        }
        
    }

    useEffect(()=>{
        dispatch(getActivity())
    },[dispatch])

    return allActivities ? (

        <dialog id="reviewDialog" style={{ border: "none", height: "80vh"}}>
            <div className={s.createReviewContainer}>
                <div className={s.createReviewHeader}>
                    <div style={{ justifyContent: "flex-end", display: "flex" }}>
                        <button
                        onClick={() => document.getElementById("reviewDialog").close()}
                        className={s.createReviewBoton}
                        >
                        x
                        </button>
                    </div>
                    <img 
                        src={logo} 
                        style={{ width: 100, objectFit: "cover", justifyContent: "center"}}
                        alt="logo"
                    />
                    <h3 className={s.createReviewTitle}>Power Gym</h3>
                    <h4>¿Estas conforme son nuestro servicio? Dejanos tu opinion</h4>
                </div>
                <div>
                    <h6> ¿Que servicio vas a calificar? </h6>
                    <select 
                        name="activityId" 
                        id="activityId"
                        key="activityId"
                        onClick={handleSelect}
                        className={s.CreateReaviewSelect}
                        >
                            <option value="">Actividad</option>
                    {
                        allActivities? allActivities.map((activity, index) => (
                            <option 
                                key={activity.id} 
                                name={activity.name}
                                value={activity.id}
                                
                            >
                                {activity.name}
                            </option>
                        )): <p></p>
                    }
                    </select>
                    {errors.activityId && (<span className={s.error}>{errors.activityId}</span>)}
                </div>
                <h6>Dejanos tu opinion...</h6>
                <form className={s.CreateReaviewForm} onSubmit>
                    <div style={styles.stars}>
                        {
                            stars.map((_, index)=> {
                                return (
                                    <FaStar
                                        key={index}
                                        size={24}
                                        style={{
                                            marginRight:10,
                                            cursor: "pointer"
                                        }}
                                        color={( hoverValue || currentValue) > index ? colors.orange : colors.grey}
                                        onClick={()=> handleClick(index + 1)}
                                        onMouseOver={()=> handleMouseOver(index + 1)}
                                        onMouseLeave= {handleMouseLeave}
                                    />
                                )
                            })
                        }
                    </div>
                    <div>
                        <textarea
                                placeholder='Dejanos tu comentario'
                                style={styles.textarea}
                                onChange={handleChange}
                                cols={40}
                        />
                         {errors.description && (<span className={s.error}>{errors.description}</span>)}
                    </div>
                    <div>
                        <button 
                            style={styles.button}
                            onClick={(e)=> handleSubmit(e)}
                            className={s.createReviewBoton} 
                        >
                            Enviar
                        </button>
                    </div>   
                </form>
            </div>
        </dialog>
    ): <></>
}

const styles = {
    container: {
        display:"flex",
        flexDirection: "column",
        alignItems:"center"
    },
    textarea: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        with:300,
        margin: "20px 0",
        minHeight: 100,
        padding:10
    },
    button:{
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        with:300,
        padding:10
    }
}
