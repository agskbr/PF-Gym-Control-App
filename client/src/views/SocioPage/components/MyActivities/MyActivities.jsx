import React from 'react'
import  s from './MyActivities.module.css'

export default function MyActivities() {
  return (
    <div className={s.myActivitiesContainer}>
      <h1>Mis Actividades</h1>
      <div className={s.myActivitiesDetail}>
        <p>aca irian los detalles de las clases que el usuario compre </p>
      </div>
      <button>Dejanos tu opinion</button>
    </div>
    
  )
}
