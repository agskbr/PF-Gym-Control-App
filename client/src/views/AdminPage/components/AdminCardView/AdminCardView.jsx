import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "./AdminCardView.module.css";
import { Link } from "react-router-dom";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";

export default function AdminCardView({ type }) {
  const [isAscendentOrder, setIsAscendentOrder] = useState({
    name: false,
    price: false,
  });
  const { activities, trainers, users } = useSelector((state) => state.pgym);
  const [keys, setKeys] = useState([]);
  const [displayArray, setDisplayArray] = useState([]);
  useEffect(() => {
    if (users.length && trainers.length && activities.length) {
      if (type === "Usuarios") {
        setDisplayArray([...users]);
        setKeys([...Object.keys(users[0])]);
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
              {keys.map((head) => (
                <td key={head}>{head}</td>
              ))}
              {/* <th>ID</th>
              <th>
                <div className={style.headWithFilterBtn}>
                  <span>Name</span>
                  {isAscendentOrder.name ? (
                    <FaArrowCircleDown
                      className={style.iconBtn}
                      onClick={() =>
                        setIsAscendentOrder({
                          ...isAscendentOrder,
                          name: !isAscendentOrder.name,
                        })
                      }
                    />
                  ) : (
                    <FaArrowCircleUp
                      className={style.iconBtn}
                      onClick={() =>
                        setIsAscendentOrder({
                          ...isAscendentOrder,
                          name: !isAscendentOrder.name,
                        })
                      }
                    />
                  )}
                </div>
              </th>
              <th className={style.thDescription}>Description</th>
              <th>
                <div className={style.headWithFilterBtn}>
                  <span>Price</span>
                  {isAscendentOrder.price ? (
                    <FaArrowCircleDown
                      className={style.iconBtn}
                      onClick={() => {
                        setIsAscendentOrder({
                          ...isAscendentOrder,
                          price: !isAscendentOrder.price,
                        });
                        setDisplayActivities((state) =>
                          state.sort((a, b) => a.price - b.price)
                        );
                      }}
                    />
                  ) : (
                    <FaArrowCircleUp
                      className={style.iconBtn}
                      onClick={() => {
                        setIsAscendentOrder({
                          ...isAscendentOrder,
                          price: !isAscendentOrder.price,
                        });
                        setDisplayActivities((state) =>
                          state.sort((a, b) => b.price - a.price)
                        );
                      }}
                    />
                  )}
                </div>
              </th>
              <th>Video</th>
              <th>Image</th>
              <th>Days</th>
              <th>Hours</th>
              <th>Capacity</th>
              <th>Trainers</th> */}
            </tr>
          </thead>
          <tbody>
            {displayArray.map((el) => (
              <tr key={el.id}>
                <td>{el.id}</td>
                <td>{el.name}</td>
              </tr>
            ))}
            {/* {displayArray.map((activity) => (
              <tr key={activity.id}>
                <td key={Math.random()}>{activity.id}</td>
                <td key={Math.random()}>{activity.name}</td>
                <td key={Math.random()} className={style.tdDescription}>
                  {activity.description}
                </td>
                <td key={Math.random()}>{activity.price}</td>
                <td key={Math.random()} className={style.tdImageAndVideo}>
                  {activity.image}
                </td>
                <td key={Math.random()} className={style.tdImageAndVideo}>
                  {activity.video}
                </td>
                <td key={Math.random()}>
                  <ul key={activity.id}>
                    {activity.day.map((d) => (
                      <li key={Math.random()}>{d}</li>
                    ))}
                  </ul>
                </td>
                <td key={Math.random()}>
                  <ul key={Math.random()}>
                    {activity.hour.map((h) => (
                      <li key={Math.random()}>{h}</li>
                    ))}
                  </ul>
                </td>
                <td key={Math.random()}>{activity.capacity}</td>
                <td key={Math.random()}>
                  <ul key={activity.id}>
                    {activity.trainers.map((t) => (
                      <li key={Math.random()}>{t.name}</li>
                    ))}
                  </ul>
                </td>
                <td key={Math.random()}>
                  <Link
                    className={style.linkStyle}
                    key={Math.random()}
                    to={`/admindashboard/activity/edit/${activity.id}`}
                  >
                    <button key={Math.random()} className={style.editBtn}>
                      Editar
                    </button>
                  </Link>
                </td>
                <td key={Math.random()}>
                  <button
                    onClick={() => {}}
                    key={Math.random()}
                    className={style.deleteBtn}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
