import React, { useState } from "react";
import CustomInput from "../CustomInput/CustomInput.jsx";
import { validateForm } from "../../../../utils/validateForm";
import style from "./CustomModal.module.css";
// import { useDispatch } from "react-redux";
// import { createActivity } from "../../../../store/actions/index";

export default function CustomModal() {
  // const dispatch = useDispatch();
  const [activity, setActivity] = useState({
    image: "",
    video: "",
    name: "",
    description: "",
    price: "",
    day: [],
    hour: [],
    capacity: "",
  });
  const [errors, setErrors] = useState({
    image: "",
    video: "",
    name: "",
    description: "",
    price: "",
    day: "",
    hour: "",
    capacity: "",
  });
  const handlerChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setErrors(validateForm({ ...activity, [name]: value }));
    setActivity((state) => ({ ...state, [name]: value }));
  };
  const handlerChangeSelectTag = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setErrors(validateForm({ ...activity, [name]: value }));
    if (activity[name].includes(value)) return;
    setActivity({
      ...activity,
      [name]: [...activity[name], value],
    });
  };
  return (
    <dialog className={style.dialogContainer} id="dialogId">
      <div className={style.headerDialog}>
        <button
          onClick={() => {
            document.getElementById("dialogId").close();
            setActivity({
              image: "",
              video: "",
              name: "",
              description: "",
              price: "",
              day: [],
              hour: [],
              capacity: "",
            });
            setErrors({
              image: "",
              video: "",
              name: "",
              description: "",
              price: "",
              day: "",
              hour: "",
              capacity: "",
            });
          }}
          className={style.closeBtn}
        >
          x
        </button>
      </div>
      <h4>Crear una nueva actividad</h4>
      <div className={style.contentDialog}>
        <CustomInput
          onChange={handlerChange}
          name="image"
          placeholder="Image"
          type="text"
          value={activity.image}
          labelError={errors.image}
        />
        <CustomInput
          onChange={handlerChange}
          value={activity.video}
          name="video"
          type="text"
          placeholder="Video"
          labelError={errors.video}
        />
        <CustomInput
          onChange={handlerChange}
          value={activity.name}
          name="name"
          className={style.customInput}
          type="text"
          placeholder="Nombre"
          labelError={errors.name}
        />
        <div className={style.textAreaContainer}>
          <textarea
            value={activity.description}
            onChange={handlerChange}
            className={style.customTextArea}
            name="description"
            placeholder="Descripcion"
          ></textarea>
          <label htmlFor="description">{errors.description}</label>
        </div>
        <CustomInput
          name="price"
          value={activity.price}
          onChange={handlerChange}
          className={style.customInput}
          type="text"
          placeholder="Price"
          labelError={errors.price}
        />
        <CustomInput
          name="capacity"
          onChange={handlerChange}
          value={activity.capacity}
          className={style.customInput}
          type="number"
          placeholder="Capacidad"
          min="0"
          labelError={errors.capacity}
        />
        <div className={style.selectTagsContainer}>
          <select
            onChange={handlerChangeSelectTag}
            className={style.customSelectTag}
            name="day"
          >
            <option hidden>Selecciona el día</option>
            <option value="Lunes">Lunes</option>
            <option value="Martes">Martes</option>
            <option value="Miercoles">Miercoles</option>
            <option value="Jueves">Jueves</option>
            <option value="Viernes">Viernes</option>
            <option value="Sábado">Sábado</option>
          </select>
          <div className={style.selectedItemsContainer}>
            <ul>
              {activity.day.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <label htmlFor="day">{errors.day}</label>
          <select
            onChange={handlerChangeSelectTag}
            className={style.customSelectTag}
            name="hour"
          >
            <option hidden>Selecciona horario</option>
            <option value="8-10">08 a 10 AM</option>
            <option value="10-12">10 a 12 AM</option>
            <option value="12-14">12 a 14 PM</option>
            <option value="14-16">14 a 16 PM</option>
            <option value="16-18">16 a 18 PM</option>
            <option value="18-20">18 a 20 PM</option>
          </select>
          <div className={style.selectedItemsContainer}>
            <ul>
              {activity.hour.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <label htmlFor="hour">{errors.hour}</label>
        </div>
      </div>
      <button
        onClick={() => {
          setErrors(validateForm(activity));
          if (Object.values(errors).length < 1) {
            // dispatch(createActivity(activity));
            document.getElementById("dialogId").close();
            console.log(activity);
            setActivity({
              image: "",
              video: "",
              name: "",
              description: "",
              price: "",
              day: [],
              hour: [],
              capacity: "",
            });
          }
        }}
        className={style.createBtn}
      >
        Crear
      </button>
    </dialog>
  );
}
