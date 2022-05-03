import React, { useEffect, useState } from 'react';
import s from './Review.module.css';
import ReviewCard from '../ReviewCard/ReviewCard';
import {AiOutlineRight} from 'react-icons/ai';
import {AiOutlineLeft} from 'react-icons/ai'
import r1 from '../../assets/trainer1.jpg'

export default function Review() {

    const data = [
        {
            id: 1,
            review: "MUY LINDO GIMNASIO. SUPER EQUIPADO Y CON LOS MEJORES PROFEOSER",
            name: 'Bianca Ceballos',
            rating: 5,
            image: r1
        },
        {
            id: 2,
            review: "LAS MEJORES CLASES DE YOGA. EUGE ES EXCELENTE PROFESIONAL",
            name: 'Julian Aguiar',
            rating: 3.5,
            image: r1 
        },
        {
            id: 3,
            review: "LAS CLASES DE BODYCOMBAT CON JUANI SON LO MEJOR. EL GYM LIMPIO Y BIEN EQUIPADO",
            name: 'Samuel Rios',
            rating: 2,
            image: r1
        },
        {
            id: 4,
            review: "EXCELENTE AMBIENTE Y MUY BIEN ATENDIDO. SUPER RECOMENDABLE",
            name: 'Malena Goñi',
            rating: 4.5,
            image: r1 
        }
    ]
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedReview, setSelectedReview]= useState(data[0]);
    const currentReview = selectedReview;

    const previous = ()=> {
        const condition = selectedIndex > 0;
        const nextIndex = condition ? selectedIndex - 1 : data.length -1;
        setSelectedReview(data[nextIndex]);
        setSelectedIndex(nextIndex);
    };

    const next = ()=> {
        const condition = selectedIndex < data.length -1;
        const nextIndex = condition ? selectedIndex + 1 : 0;
        setSelectedReview(data[nextIndex]);
        setSelectedIndex(nextIndex);
    }
    useEffect(()=>{

    })

  return (
    <main className={s.reviewContainer}>
        <section className={s.reviewList}>
            <h1># que dicen nuestros clientes</h1>
            <div className={s.contenedorSlider}>
                <div className={s.revierCarrousel}>
                    {
                        Object.keys(currentReview).length > 0 ? (
                            <ReviewCard
                                key={currentReview.id}
                                name={currentReview.name}
                                review={currentReview.review}
                                rating={currentReview.rating}
                                image={currentReview.image}
                            />
                        ): <p>error</p>
                    }
                </div>
            </div>
            <div>
                <button onClick={previous}> <AiOutlineLeft/> </button>
                <button onClick={next}> <AiOutlineRight/> </button>
            </div>
        </section>
    </main>
  )
}
