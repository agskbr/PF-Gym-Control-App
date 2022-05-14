import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "./AdminCardView.module.css";
import { Link } from "react-router-dom";
import { FaEdit, FaPrint } from "react-icons/fa";
import ExpansibleMenu from "../ExpansibleMenu/ExpansibleMenu";

export default function AdminCardView({ type }) {
  const { activities, trainers, users, orders, daysAndHours } = useSelector(
    (state) => state.pgym
  );
  const [expanseItemDay, setExpanseItemDay] = useState({});
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
      if (type === "Ordenes") {
        setDisplayArray([...orders]);
        setKeys(Object.keys(orders[0]));
      }
      if (type === "Dias y horas") {
        setDisplayArray([...daysAndHours]);
        setKeys(Object.keys(daysAndHours[0]));
      }
    }
  }, [activities, trainers, users, orders, daysAndHours, type]);

  return (
    <div className={style.principalContainer}>
      <div className={style.titleAndAddBtn}>
        <h4>{type}</h4>
        {type !== "Ordenes" && type !== "Usuarios" ? (
          <button
            onClick={() => document.getElementById("createDialog").showModal()}
            className={style.addBtn}
          >
            Agregar
          </button>
        ) : null}
      </div>
      <div className={style.cardLayout}>
        <table className={style.tableAdminView}>
          <thead>
            <tr>
              {keys.map((head) =>
                head !== "createdAt" &&
                head !== "updatedAt" &&
                head !== "userId" &&
                head !== "users" &&
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
                    key !== "userId" &&
                    key !== "users"&& 
                    key !== "createdInDb"
                  ) {
                    if (Array.isArray(el[key])) {
                      return (
                        <td className={style.tdArray} key={i}>
                          {el[key].map((item, i) => (
                            <ul key={i}>
                              {item.day ? (
                                <li className={style.daysItems}>
                                  <ExpansibleMenu
                                    expanseItemDay={expanseItemDay}
                                    item={item}
                                    setExpanseItemDay={setExpanseItemDay}
                                  />
                                </li>
                              ) : (
                                <li>{item.name ?? item}</li>
                              )}
                            </ul>
                          ))}
                        </td>
                      );
                    }

                    if (key === "activity" && Object.values(el[key]).length) {
                      return <td key={i}>{el[key].name}</td>;
                    }

                    if (key === "user") {
                      return (
                        <td key={i}>
                          <div className={style.userDataContainer}>
                            <ul>
                              <li>
                                <span>NOMBRE:</span> {el[key].name}
                              </li>
                              <li>
                                <span>APELLIDO:</span> {el[key].lastName}
                              </li>
                              <li>
                                <span>EMAIL:</span> {el[key].email}
                              </li>
                              <li>
                                <span>TELEFONO:</span> {el[key].phoneNumber}
                              </li>
                            </ul>
                          </div>
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
                <td>
                  {type === "Ordenes" ? (
                    <FaPrint color="#fe4f22" size={20} />
                  ) : (
                    <Link
                      to={`/admindashboard/${type.toLowerCase()}/edit/${el.id}`}
                      state={{ displayArray, itemSelect: el }}
                    >
                      <FaEdit size={20} color={"#fe4f22"} />
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
