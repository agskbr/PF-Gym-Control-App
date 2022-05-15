import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import style from "./ExpansibleMenu.module.css";

export default function ExpansibleMenu({
  setExpanseItemDay,
  item,
  expanseItemDay,
}) {
  return (
    <div>
      <button
        onClick={() =>
          setExpanseItemDay((state) => ({
            ...state,
            [item.id]: !state[item.id],
          }))
        }
        type="button"
        className={style.collapsible}
      >
        {item.day} {expanseItemDay[item.id] ? <FaMinus /> : <FaPlus />}
      </button>
      <div className={expanseItemDay[item.id] ? style.active : style.content}>
        <ul className={style.hourItems}>
          <li>{item.hour}</li>
        </ul>
      </div>
    </div>
  );
}
