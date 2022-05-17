import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./AdminCardView.module.css";
import { Link } from "react-router-dom";
import { FaBan, FaEdit } from "react-icons/fa";
import {
  getActivity,
  getAllTrainers,
  getAllUsers,
  requestPost,
  getAllDaysAndHours,
} from "../../../../store/actions/index";
import { getAllDescuentos } from "../../../../store/actions/actions-descuentos";
import { getAllOrders } from "../../../../store/actions/actions-orders";
import { MdRefresh } from "react-icons/md";
import ExpansibleMenu from "../ExpansibleMenu/ExpansibleMenu";
import { cancelOrder } from "../../../../store/actions/actions-orders";

export default function AdminCardView({ type }) {
  const dispatch = useDispatch();
  const { descuentos } = useSelector((state) => state.descuentos);
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
      if (type === "Descuentos") {
        setDisplayArray([...descuentos]);
        setKeys(Object.keys(descuentos[0]));
      }
    }
  }, [activities, trainers, users, orders, descuentos, daysAndHours, type]);

  return (
    <div className={style.principalContainer}>
      <div className={style.titleAndAddBtn}>
        <h4>{type}</h4>
        <div className={style.refreshBtn}>
          <MdRefresh
            color="white"
            size={35}
            onClick={() => {
              dispatch(requestPost());
              dispatch(getAllUsers());
              dispatch(getAllDaysAndHours());
              dispatch(getAllTrainers());
              dispatch(getActivity());
              dispatch(getAllOrders());
              dispatch(getAllDescuentos());
            }}
          />
        </div>
        <button
          disabled={type === "Ordenes" || type === "Usuarios"}
          onClick={() => document.getElementById("createDialog").showModal()}
          className={
            type === "Ordenes" || type === "Usuarios"
              ? style.addDisabledBtn
              : style.addBtn
          }
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
                head !== "userId" &&
                head !== "users" &&
                head !== "activityId" &&
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
                    key !== "users" &&
                    key !== "activityId" &&
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

                    if (
                      key === "activity" &&
                      Object.values(el[key] ?? {}).length
                    ) {
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
                  {type === "Ordenes" && el.state !== "Canceled" ? (
                    <FaBan
                      className={style.cancelOrderBtn}
                      onClick={() => {
                        dispatch(cancelOrder(el.id));
                      }}
                      color="#fe4f22"
                      size={20}
                    />
                  ) : type === "Ordenes" ? null : (
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
