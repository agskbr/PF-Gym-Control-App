import React, { useState } from "react";
import { validateForm } from "../../../../utils/validateForm";
import style from "./CustomModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createActivity } from "../../../../store/actions/index";
import CustomSelectTag from "../CustomSelectTag/CustomSelectTag.jsx";
import CustomInput from "../CustomInput/CustomInput.jsx";
import Swal from "sweetalert";
export default function CustomModal() {
  const dispatch = useDispatch();
  const { trainers } = useSelector((state) => state.pgym);

  const daysOpt = [
    { id: 1, name: "Lunes" },
    { id: 2, name: "Martes" },
    { id: 3, name: "Miércoles" },
    { id: 4, name: "Jueves" },
    { id: 5, name: "Viernes" },
    { id: 6, name: "Sábado" },
  ];
  const hoursOpt = [
    { id: 1, name: "8-10" },
    { id: 2, name: "10-12" },
    { id: 3, name: "12-14" },
    { id: 4, name: "14-16" },
    { id: 5, name: "16-18" },
    { id: 6, name: "18-20" },
  ];
  const trainersOpt = trainers;

  const [activity, setActivity] = useState({
    image: "",
    video: "",
    name: "",
    description: "",
    price: "",
    trainers: [],
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
    trainers: "",
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
    <dialog className={style.dialogContainer} id="createDialog">
      <div className={style.headerDialog}>
        <button
          onClick={() => {
            document.getElementById("createDialog").close();
            setActivity({
              image: "",
              video: "",
              name: "",
              description: "",
              price: "",
              day: [],
              hour: [],
              trainers: [],
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
          <CustomSelectTag
            errorLabel={errors.day}
            firstOpt="Seleccioná un dia"
            handlerChangeSelectTag={handlerChangeSelectTag}
            name="day"
            options={daysOpt}
            visualizeItems={activity.day}
            setActivity={setActivity}
            setErrors={setErrors}
            activity={activity}
          />
          <CustomSelectTag
            errorLabel={errors.hour}
            firstOpt="Seleccioná un horario"
            handlerChangeSelectTag={handlerChangeSelectTag}
            name="hour"
            options={hoursOpt}
            visualizeItems={activity.hour}
            setActivity={setActivity}
            setErrors={setErrors}
            activity={activity}
          />
          <CustomSelectTag
            errorLabel={errors.trainers}
            firstOpt="Seleccioná un instructor"
            handlerChangeSelectTag={handlerChangeSelectTag}
            name="trainers"
            options={trainersOpt}
            visualizeItems={activity.trainers}
            setActivity={setActivity}
            setErrors={setErrors}
            activity={activity}
          />
        </div>
      </div>
      <div className={style.createBtnContainer}>
        <button
          onClick={() => {
            setErrors(validateForm(activity));
            if (Object.values(errors).length < 1) {
              dispatch(
                createActivity({
                  ...activity,
                  price: parseInt(activity.price),
                  capacity: parseInt(activity.capacity),
                })
              );
              Swal({
                title: "Actividad creada correctamente",
                buttons: "Aceptar",
                icon: "success",
              });
              document.getElementById("createDialog").close();
              setActivity({
                image: "",
                video: "",
                name: "",
                description: "",
                price: "",
                day: [],
                hour: [],
                trainers: [],
                capacity: "",
              });
            }
          }}
          className={style.createBtn}
        >
          Crear actividad
        </button>
      </div>
    </dialog>
  );
}
