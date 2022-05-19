import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { postReview, getReviewsByUser } from '../../../../store/actions/actions-review';
import s from './CreateReview.module.css';
import Swal from "sweetalert";
import logo from '../../../../assets/logo.png'
import {getActivity} from '../../../../store/actions/index'
import {FaStar} from 'react-icons/fa'


const colors = {
    orange: "#eb4e27",
    grey: "#a9a9a9",
    
}


export default function CreateReaview({name, id}) { //id activ review

    const dispatch = useDispatch();
    
    const allActivities = useSelector((state)=>state.pgym.allActivities);
    const allReviewUser = useSelector((state)=>state.review.reviews);
  console.log("allreview", allReviewUser)
    const filtradas = allReviewUser.filter((r)=> r.activityId === id)

    const user = useSelector((state)=>state.users.user.id);
    const stars= Array(5).fill(0);
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue]= useState(undefined);
    const [ input, setInput]= useState({
        rating: "",
        description:"",
        activityId: id, 
        userId: user, 
    })

    const handleClick = value => { //rating
        setCurrentValue(value)
        setInput({
            ...input,
            rating:value
        })
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
    }


    const handleSubmit = (e) => { //button
        if(!input.description || !input.rating ){
            e.preventDefault()
            Swal({
                title:"Complete todos los campos.",
                icon: "warning",
                position:"bottom",
                timer: 2000,
                
            });
        }else if (allReviewUser.find((r)=>r.activityId === id)) {
                e.preventDefault()
                alert("ya realizaste una review de esta clase")
                document.getElementById("reviewDialog").close();
        }else{
            e.preventDefault()
            dispatch(postReview(input))
            console.log("input", input)
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
                /* position: "center", */
                timer: 2000,
                toast: true,
                position:"top-end",
            })
            document.getElementById("reviewDialog").close();
        }
        
    }

    useEffect(()=>{
        dispatch(getActivity())
        dispatch(getReviewsByUser(user))
    },[dispatch, user])

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
