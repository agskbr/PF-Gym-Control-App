import React, { useEffect, useState } from 'react';
import s from './Review.module.css';
import ReviewCard from '../ReviewCard/ReviewCard';
//import {AiOutlineRight} from 'react-icons/ai';
//import {AiOutlineLeft} from 'react-icons/ai';
import {useDispatch, useSelector} from 'react-redux';
import {getAllReviews} from '../../store/actions/actions-review';

export default function Review() {
    const dispatch = useDispatch();
    /* const data = [
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
    ] */
    const allReviews = useSelector((state)=>state.review.reviews)
   // console.log("aca", allReviews)

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedReview, setSelectedReview]= useState(allReviews[0]);
    const currentReview = selectedReview;
    console.log("uno", currentReview)

    const previous = ()=> {
        const condition = selectedIndex > 0;
        const nextIndex = condition ? selectedIndex - 1 : allReviews.length -1;
        setSelectedReview(allReviews[nextIndex]);
        setSelectedIndex(nextIndex);
    };

    const next = ()=> {
        const condition = selectedIndex < allReviews.length -1;
        const nextIndex = condition ? selectedIndex + 1 : 0;
        setSelectedReview(allReviews[nextIndex]);
        setSelectedIndex(nextIndex);
    } 
    useEffect(()=>{
      dispatch(getAllReviews())
    }, [dispatch]) 

  return (
    <main className={s.reviewContainer}>
        <section className={s.reviewList}>
            {/* <h1># que dicen nuestros clientes</h1> */}
            <div className={s.contenedorSlider}>
                <div className={s.revierCarrousel}>
                   {
                       allReviews ? allReviews.map(r => 
                        <ReviewCard
                            key={r.id}
                            description={r.description}
                            rating={r.rating}
                            id= {r.userId}
                            />
                    ): <p>error</p>
                   }
                </div>
            </div>
          {/*   <div className={s.reviewContainerButton}>
                <div >
                <p className={s.reviewButton} onClick={previous}> <AiOutlineLeft/> </p>
                </div>
                <div >
                <p className={s.reviewButton}  onClick={next}> <AiOutlineRight/> </p>
                </div>
            </div>     */}
            
        </section>
    </main>
  )
}
