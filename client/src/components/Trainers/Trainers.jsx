import React from 'react';
import s from './Trainers.module.css'

export default function Trainers({name, image, specialty, experience }) {
  return (
    <article className={s.expert}>
        <div className={s.flexi}>
            <img src={image} alt={name} className={s.expertImg} />
            <div className={s.expertText}>
                <div className={s.expertBio}>
                    <span className={s.expertName}>{name}</span>
                    <span className={s.expertSub}>{specialty}</span>
                    {/* <span className={s.expertSub}>{experience} años</span> */}
                </div>
                <div className={s.expertDetail}>
                    {experience}
                </div>
            </div>
        </div>
    </article>
  )
}
