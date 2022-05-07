import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "./AdminCardView.module.css";
import { Link } from "react-router-dom";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";

export default function AdminCardView({ type }) {
  // const [isAscendentOrder, setIsAscendentOrder] = useState({
  //   name: false,
  //   price: false,
  // });
  const { activities, trainers, users } = useSelector((state) => state.pgym);
  const [keys, setKeys] = useState([]);
  const [displayArray, setDisplayArray] = useState([]);
  useEffect(() => {
    if (users.length && trainers.length && activities.length) {
      if (type === "Usuarios") {
        setDisplayArray([...users]);
        setKeys(Object.keys(users[0]));
      }
      if (type === "Instructores") {
        setDisplayArray([...trainers]);
        setKeys(Object.keys(trainers[0]));
      }
      if (type === "Clases") {
        setDisplayArray([...activities]);
        setKeys(Object.keys(activities[0]));
      }
    }
  }, [activities, trainers, users, type]);

  return (
    <div className={style.principalContainer}>
      <div className={style.titleAndAddBtn}>
        <h4>{type}</h4>
        <button
          onClick={() => document.getElementById("createDialog").showModal()}
          className={style.addBtn}
        >
          Agregar
        </button>
      </div>
      <div className={style.cardLayout}>
        <table className={style.tableAdminView}>
          <thead>
            <tr>
              {keys.map((head) =>
                head !== "createdAt" &&
                head !== "updatedAt" &&
                head !== "createdInDb" ? (
                  <th key={head}>{head}</th>
                ) : null
              )}
            </tr>
          </thead>
          <tbody>
            {displayArray.map((el) => (
              <tr key={el.id}>
                {keys.map((key, i) => {
                  if (
                    key !== "createdAt" &&
                    key !== "updatedAt" &&
                    key !== "createdInDb"
                  ) {
                    if (Array.isArray(el[key])) {
                      return (
                        <td className={style.tdArray} key={i}>
                          {el[key].map((item, i) => (
                            <ul key={i}>
                              <li>{item.name ?? item}</li>
                            </ul>
                          ))}
                        </td>
                      );
                    }
                    if (typeof el[key] === "boolean") {
                      return <td key={i}>{el[key].toString()}</td>;
                    }
                    return (
                      <td
                        className={
                          key === "description"
                            ? style.tdDescription
                            : key === "video" || key === "image"
                            ? style.tdImageAndVideo
                            : style.tdStandard
                        }
                        key={i}
                      >
                        {el[key]}
                      </td>
                    );
                  }
                  return null;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
