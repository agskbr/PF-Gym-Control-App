import style from "./detail.module.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivityById } from "../../store/actions";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { addToCart } from "../../store/actions/actionsCart";

export default function Detail() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const detail = useSelector((state) =>
    state.pgym.detail ? state.pgym.detail : null
  );
  const [time, setTime] = useState("");
  const [idToCart, setIdToCart] = useState([]);

  const text = detail?.description?.substring(0, 700);

  function filterDiaHora(horarios) {
    const timeFiltered = time.split(" "); //--> [lunes, 20hs]
    // console.log(timeFiltered);
    // console.log(horarios);
    const timeFilter1 = timeFiltered[0];
    const timeFilter2 = timeFiltered[1];
    const horariosFiltered = horarios.filter(
      (el) => el.day === timeFilter1 && el.hour === timeFilter2
    );
    // console.log(horariosFiltered);
    // setIdToCart(horariosFiltered ? horariosFiltered[0].id : 0);
  }

  function getOptionSelected(horarios) {
    let selectInput = document.getElementById("select");
    setTime(selectInput.value);
    console.log(time);
    filterDiaHora(horarios);
  }

  function handleFilter(e) {
    e.preventDefault();
    setIdToCart(e.target.value);
  }

  const horarios = detail.diaHoras;

  return (
    <div className={style.containerOpen}>
      <div className={style.infoTitle}>{detail?.name}</div>
      <div className={style.container}>
        <div className={style.imageContainer}>
          <img src={detail?.image} alt="activity" className={style.image} />
        </div>
        <div className={style.info}>
          <div className={style.infoDescription}>{text}...</div>
          <div className={style.infoPrice}>Precio ${detail?.price}.00</div>
          {/* <label>
            {detail.diaHoras?.map((day) => {
              return (
                <>
                  <span>{`${day.day} ${day.hour}`}</span>
                  <input
                    type="checkbox"
                    value={`${day.day} ${day.hour}`}
                    id={day.id}
                    name={day.day}
                    onChange={(p) => {
                      handleFilter(p);
                    }}
                  />
                </>
              );
            })}
          </label> */}
          <select
            className={style.horarios}
            id="select"
            onChange={(e) => {
              handleFilter(e);
              //   getOptionSelected(horarios);
            }}
          >
              <option >Elegir dia hora</option>
            {detail.diaHoras?.map((day) => (
              <option
                value={day.id}
                className={style.day}
                key={day.id}
                id={day.id}
              >{` ${day.day} ${day.hour}`}</option>
            ))}
          </select>
        </div>
        <button
          className={style.elbo}
          onClick={() => dispatch(addToCart(idToCart))}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
