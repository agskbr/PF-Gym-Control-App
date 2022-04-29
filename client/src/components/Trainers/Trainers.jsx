import React from 'react';
import s from './Trainers.module.css'

export default function Trainers({nombre, img, especialidad, experiencia}) {
  return (
    <article className={s.expert}>
        <div className={s.flexi}>
            <img src={img} alt={nombre} className={s.expertImg} />
            <div className={s.expertText}>
                <div className={s.expertBio}>
                    <span className={s.expertName}>{nombre}</span>
                    <span className={s.expertSub}>{especialidad}</span>
                    <span className={s.expertSub}>Experiencia: {experiencia} años</span>
                </div>
                <div className={s.expertDetail}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, amet.
                </div>
            </div>
        </div>
    </article>
  )
}
