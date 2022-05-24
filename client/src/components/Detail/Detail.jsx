import style from "./detail.module.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivityById } from "../../store/actions";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  addToCart,
  addToCart2,
  setterCountClick,
} from "../../store/actions/actionsCart";
import swal from "sweetalert";

export default function Detail() {
  const capa = useSelector((state) => state.pgym.capacity);
  const state = useSelector((state) => state);
  const countClick = useSelector((state) => state.pgym.countClick);
  const disable = useSelector((state) => state.pgym.disable);
  const dispatch = useDispatch();
  const detail = useSelector((state) =>
    state.pgym.detail ? state.pgym.detail : null
  );
  const [time, setTime] = useState("");
  const [idToCart, setIdToCart] = useState([]);
  const [cursor, setCursor] = useState("pointer");
  const [background, setBackground] = useState("rgb(255, 75, 43)");
  const [color, setColor] = useState("rgb(255, 255, 255)");
  //const [capacity, setCap] = useState("");

  const text = detail?.description?.substring(0, 700);

  /* function filterDiaHora(horarios) {
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
  } */

  /* function getOptionSelected(horarios) {
    let selectInput = document.getElementById("select");
    setTime(selectInput.value);
    console.log(time);
    filterDiaHora(horarios);
  }
 */
  function handleFilter(e) {
    e.preventDefault();
    setIdToCart(e.target.value);
    /* detail.diaHoras.forEach((el) => {
      if (el.id === idToCart) {
        setCap(el.capacity)
      } 
    }); */
    //console.log(capacity);
    /* setIdToCart(horariosFiltered ? horariosFiltered[0].id : 0);*/
    //console.log()
    /*  console.log(detail) */
  }

  // function handleAddToCart(e) {
  //   e.preventDefault();
  //   if (capacidad === 0) {
  //     swal("No hay cupos disponibles", "", "error");
  //   } else {
  //     dispatch(addToCart2(idToCart));
  //     swal("Agregado al carrito", "", "success");
  //   }
  // }
  function handleClick(e) {
    e.preventDefault();
    console.log(`Entre al handler y el count actual es: ${countClick}`);
    dispatch(setterCountClick(countClick + 1));
    dispatch(addToCart(idToCart));
    swal("Agregado al carrito", "", "success");
    if (countClick >= 9) {
      setDisable(true);
      console.log("entre al if de not-allowed");
      setCursor("not-allowed");
      setBackground("rgba(255, 38, 0, 0.567)");
      // setColor("")
    }
  }

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
              //dispatch(addToCart2(idToCart))
              //   getOptionSelected(horarios);
            }}
          >
            <option>Elegir dia hora</option>
            {detail.diaHoras?.map((day) => (
              <option
                value={day.id}
                className={style.day}
                key={day.id}
                id={day.id}
              >{` ${day.day} ${day.hour} capacidad:${day.capacity}`}</option>
            ))}
          </select>
        </div>
        <button
          disabled={disable}
          id={detail.id}
          className={style.elbo}
          onClick={(e) => handleClick(e)}
          style={{
            cursor: `${cursor}`,
            backgroundColor: `${background}`,
            color: `${color}`,
          }}
        >
          Agregar
        </button>
      </div>
    </div>
  );
}
