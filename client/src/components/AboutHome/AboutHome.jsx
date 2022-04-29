import React from 'react'; 
import s from './AboutHome.module.css';
//import video from '../../assets/180419_Boxing_A1_04.mp4';
import t1 from '../../assets/trainer1.jpg';
import t2 from '../../assets/trainer2.jpg';
import t3 from '../../assets/trainer3.jpg';
import t4 from '../../assets/trainer4.jpg';
import Trainers from '../Trainers/Trainers';



export default function AboutHome() {
    const entrenadores = [
        {
            id: 1,
            nombre: "Carolina Fernandez",
            img: t1,
            especialidad: "Yoga",
            experiencia: 6
        },
        {
            id:2,
            nombre: "Valeria Odon",
            img: t2,
            especialidad: "Personal Trainer",
            experiencia: 4
        },
        {
            id:3,
            nombre: "Carlos Alarcon",
            img: t3,
            especialidad: "Personal Trainer",
            experiencia: 8
        },
        {
            id:4,
            nombre: "Gaston Garcia",
            img: t4,
            especialidad: "Box",
            experiencia: 5
        }
    ]
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
                            nombre={e.nombre}
                            img={e.img}
                            especialidad={e.especialidad}
                            experiencia={e.experiencia}
                        />)}
                    </div>
                </section>
            </div>
        </div>
    </main>
  )
}

