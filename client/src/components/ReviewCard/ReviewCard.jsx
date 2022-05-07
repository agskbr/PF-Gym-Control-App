import React, { useEffect } from 'react';
import s from './ReviewCard.module.css';
import ReactStars from 'react-rating-stars-component';
import {getAllUsers} from '../../store/actions/index'
import {useDispatch, useSelector} from 'react-redux';


export default function ReviewCard ({rating, description, id}) {
  

  console.log("id", id)
  const dispatch = useDispatch();
  const allUsers = useSelector((state)=> state.pgym.users)
  console.log("usuarios", allUsers)
  
  const user = allUsers.find((u)=>u.id === id)
  console.log("soy yo", user)
  
  useEffect(()=>{
    dispatch(getAllUsers())
  },[dispatch])

  return (
    <article className={s.reviewCardContainer}>
        <img src={user.image} alt={user.name} className={s.reviewCardImg} />
        <div className={s.reviewCardText}>
            <h2 className={s.reviewCardName}>{user.name}</h2>
            <div className={s.reviewCardDesc}>
                <span className={s.reviewCardRating} title={`${rating} out of 5`}>
                  <ReactStars
                    name="rating"
                    editing={false}
                    value={rating}
                    onStarClick={()=> null}
                  />
                </span>
            </div>
            <p className={s.reviewCardContent}>
                {description}
            </p>
        </div>
    </article>
  )
}
