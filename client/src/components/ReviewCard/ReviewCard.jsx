import React from 'react';
import s from './ReviewCard.module.css';


export default function ReviewCard({name, image, rating, review}) {
  return (
    <article className={s.reviewCardContainer}>
        <img src={image} alt={name} className={s.reviewCardImg} />
        <div className={s.reviewCardText}>
            <h2 className={s.reviewCardName}>{name}</h2>
            <div className={s.reviewCardDesc}>
                <span className={s.reviewCardRating} title={`${rating} out of 5`}>

                </span>
            </div>
            <p className={s.reviewCardContent}>
                {review}
            </p>
        </div>
    </article>
  )
}
