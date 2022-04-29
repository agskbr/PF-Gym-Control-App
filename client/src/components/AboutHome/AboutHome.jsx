import React, { useEffect } from 'react'; 
import {useDispatch, useSelector} from 'react-redux';
import { getAllTrainers } from '../../store/actions';
import s from './AboutHome.module.css';
//import video from '../../assets/180419_Boxing_A1_04.mp4';
import Trainers from '../Trainers/Trainers';



export default function AboutHome() {
  const dispatch = useDispatch();
  const entrenadores = useSelector((state)=> state.trainers)
  console.log(entrenadores)

  useEffect(()=>{
      dispatch(getAllTrainers())
  },[dispatch])

  return (
    <main>
        <div className={s.aboutPage}>
            <video autoPlay playsInline muted loop className={s.aboutPageHero}>
                {/* <source src={video} type="video/mp4"/> */}
            </video>
            <div className={s.aboutContent}>
                <section className={s.aboutSection}>
                    <h1 className={s.aboutHeading}>Nosotros</h1>
                    <p className={s.aboutParagraph}>
                        En GYM CONTROL podés encontrar múltiples entrenamientos y programaciones pensadas para que logres tus objetivos sin dejar de entrenar en grupo.
                    </p>
                    <p className={s.aboutParagraph}>
                        Contamos con un grupo de profesionales expertos, con gran experiencia y conocimientos que te ayudarán a estar en forma y a optimizar el proceso de transición.
                    </p>
                    <p className={s.aboutParagraph}>
                        Ademas te ayudamos a optimizar tu ingesta nutricional ofreciendote una a
                    </p>
                </section>
                <section className={s.aboutSection}>
                    <h1 className={s.aboutHeading}>Nuestro Staff</h1>
                    <p className={s.aboutParagraph}>
                        Contamos con los mejores entrenadores que te ayudaran a alcanzar tu maximo potencial!!!
                    </p>
                    <div className={s.flexy}>
                        {entrenadores.map(e =>
                        <Trainers key={e.id}
                            name={e.name}
                            image={e.image}
                            specialty={e.specialty}
                            experience={e.experience}
                        />)}
                    </div>
                </section>
            </div>
        </div>
    </main>
  )
}

