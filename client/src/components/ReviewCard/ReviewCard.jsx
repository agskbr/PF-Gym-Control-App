import React from "react";
import s from "./ReviewCard.module.css";
import ReactStars from "react-rating-stars-component";
// import {getAllUsers} from '../../store/actions/index'
import {  useSelector } from "react-redux";

export default function ReviewCard({ rating, description, id, name,}) {
  //const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.pgym.users);
  const allActivities = useSelector((state) => state.pgym.allActivities);

  const user = allUsers.find((u) => u.id === id);
  const activities = allActivities.find((a) => a.id === name);
  // console.log("soy yo", activities)

  return user ? (
    <article className={s.reviewCardContainer}>
      <img src={user.image} alt={user.name} className={s.reviewCardImg} />
      <div className={s.reviewCardText}>
        <h2 className={s.reviewCardName}>{user.name} {user.lastName}</h2>
        <h4 className={s.reviewCardActivity}>{activities.name}</h4>
        <div className={s.reviewCardDesc}>
          <span className={s.reviewCardRating} title={`${rating} out of 5`}>
            <ReactStars
              name="rating"
              edit={false}
              value={rating}
              onStarClick={() => null}
            />
          </span>
        </div>
        <p className={s.reviewCardContent}>{description}</p>
      </div>
    </article>
  ) : (
    <></>
  );
}
