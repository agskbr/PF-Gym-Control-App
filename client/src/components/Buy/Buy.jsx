import style from "./buy.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivityById } from "../../store/actions";
import { useParams } from "react-router-dom";
import Nav from "../Nav/nav";
import { Link } from "react-router-dom";
import { getAllTrainers } from "../../store/actions";
import Cart from "../Cart/Cart";
import { addToCart, addOrderLine } from "../../store/actions/actionsCart";

export default function Buy() {
  const [time, setTime] = useState("");

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  let { id } = useParams();
  useEffect(() => {
    dispatch(getActivityById(id));
  }, [dispatch]);

  const entrenadores = useSelector((state) => state.pgym.trainers);

  useEffect(() => {
    dispatch(getAllTrainers());
  }, [dispatch]);

  const {
    id: activityId,
    name,
    description,
    image,
    price,
    day,
    hour,
    capacity,
    trainers,
    diaHoras,
  } = useSelector((state) => state.pgym.detail);

  const activity = useSelector((state) => state.pgym.detail);

  function getOptionSelected() {
    let selectInput = document.getElementById("select");
    setTime(selectInput.value);
    console.log("hola");
  }

  /* let coach = entrenadores?.filter(e => e.name === trainers[0]?.name);
    let coach2 = entrenadores?.filter(e => e.name === trainers[1]?.name); */

  function getTimeByActivityDay() {
    setTimeout(() => {
      timeByDay();
    }, 2000);
  }

  function timeByDay() {
    setTimeout(() => {
      let time = state.pgym.detail.diaHoras[0].hour;
      console.log(state.pgym.detail.diaHoras[0].hour);
      return time;
    }, 2000);
  }

  return (
    <div className={style.background}>
      <Nav />
      {/* <div className={style.coachsTitle}>Coachs</div>
               <div className={style.coachs}>
                     <div className={style.coach1}>
                            <img src={coach[0]?.image} alt="coach" className={style.coachImage} />
                    </div>
                    <div className={style.coach2}>
                            <img src={coach2[0]?.image} alt="coach" className={style.coachImage} />
                    </div>
               </div> */}

      <div className={style.container}>
        <div className={style.name}>{name}</div>

        <div className={style.flipContainer}>
          <div className={style.card}>
            <img src={image} alt="img" className={style.front}></img>
            <div className={style.back}>{description}</div>
          </div>
        </div>

        <select
          className={style.horarios}
          id="select"
          onClick={() => getOptionSelected()}
        >
          {diaHoras?.map((day) => (
            <option
              className={style.day}
              key={day.day}
            >{` ${day.day} ${day.hour}`}</option>
          ))}
        </select>

        {/* <div className={style.hour}>Horarios:
                        
                            <span className={style.hour}>click here</span>
                        
                    </div> */}

        <div className={style.price}>Precio:{` $${price} `}</div>
        <div className={style.capacity}>
          Capacidad:{` ${capacity} lugares disponibles `}
        </div>

        <div className={style.botonera}>
          <Link to="/#clases">
            <button className={style.elbo}>Buy plan</button>
          </Link>

          <button
            className={style.elbo}
            onClick={() =>
              dispatch(
                addToCart(state.pgym.detail.id),
                addOrderLine(state.cart.orderLine[0])
              )
            }
          >
            Add to cart
          </button>
        </div>
      </div>
      {/* <Cart data={activity}/> */}
    </div>
  );
}
