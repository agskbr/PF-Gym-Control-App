import React, { useEffect } from "react";
import s from "./Review.module.css";
import ReviewCard from "../ReviewCard/ReviewCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviews } from "../../store/actions/actions-review";
import { Carousel } from "react-responsive-carousel";
import { getAllUsers } from "../../store/actions/index";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Review() {
  const dispatch = useDispatch();

  const allReviews = useSelector((state) => state.review.reviews);
  //console.log("aca", allReviews)

  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const reviews = allReviews.filter(review => review.description!==null)

  return reviews ? (
    <main className={s.reviewContainer}>
      <section className={s.reviewList}>
        {/* <h1># que dicen nuestros clientes</h1> */}
        <div className={s.contenedorSlider}>
          <div className={s.revierCarrousel}>
            <Carousel
              
              useKeyboardArrows
              infiniteLoop
              autoPlay
              interval={5000}
              showThumbs={false}
            >
              {reviews?.map((r) =>
              (
                <ReviewCard
                  key={r.id}
                  description={r.description}
                  rating={r.rating}
                  id={r.userId}
                  name={r.activityId}
                />
              )
            )}
            </Carousel>
          </div>
        </div>
      </section>
    </main>
  ):(
    <></>
  );
}
