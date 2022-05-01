import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getActivityById } from "../../../../store/actions/index.js";
import { validateForm } from "../../../../utils/validateForm.js";
import CustomInput from "../CustomInput/CustomInput.jsx";
import CustomSelectTag from "../CustomSelectTag/CustomSelectTag.jsx";
import style from "./EditActivity.module.css";

export default function EditActivity() {
  const { trainers, detail } = useSelector((state) => state);
  const { id } = useParams();
  const [activityToEdit, setActivityToEdit] = useState({});
  const dispatch = useDispatch();
  const daysOpt = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const hoursOpt = ["8-10", "10-12", "12-14", "14-16", "16-18", "18-20"];
  const trainersOpt = trainers.map((trainer) => trainer.name);
  const [errors, setErrors] = useState({
    image: "",
    video: "",
    name: "",
    description: "",
    price: "",
    capacity: "",
    day: "",
    hour: "",
    trainers: "",
  });
  const [activity, setActivity] = useState({
    image: "",
    video: "",
    name: "",
    description: "",
    price: "",
    capacity: "",
    day: [],
    hour: [],
    trainers: [],
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

  useEffect(() => {
    dispatch(getActivityById(id));
  }, [dispatch, id]);
  useEffect(() => {
    if (Object.values(detail).length) {
      setActivityToEdit(detail[0]);
    }
  }, [detail]);

  useEffect(() => {
    if (Object.values(activityToEdit).length) {
      setActivity({
        trainers: activityToEdit.trainers.map((trainer) => trainer.name),
        day: activityToEdit.day,
        hour: activityToEdit.hour,
        image: activityToEdit.image,
        capacity: activityToEdit.capacity,
        name: activityToEdit.name,
        video: activityToEdit.video,
        description: activityToEdit.description,
        price: activityToEdit.description,
      });
    }
  }, [activityToEdit]);

  return (
    <div className={style.principalContainer}>
      <h3>Editar una actividad</h3>
      <div className={style.inputsContainer}>
        <CustomInput
          onChange={handlerChange}
          name="image"
          placeholder="Image"
          type="text"
          value={activity.image}
          labelError={errors.image}
          titleInput="Imagen"
        />
        <CustomInput
          onChange={handlerChange}
          value={activity.video}
          name="video"
          type="text"
          placeholder="Video"
          labelError={errors.video}
          titleInput="Video"
        />
        <CustomInput
          onChange={handlerChange}
          value={activity.name}
          name="name"
          type="text"
          placeholder="Nombre"
          labelError={errors.name}
          titleInput="Nombre"
        />
        <div className={style.textAreaContainer}>
          <span>Descripcion</span>
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
          type="text"
          placeholder="Price"
          labelError={errors.price}
          titleInput="Precio"
        />
        <CustomInput
          name="capacity"
          onChange={handlerChange}
          value={activity.capacity}
          type="number"
          placeholder="Capacidad"
          min="0"
          labelError={errors.capacity}
          titleInput="Capacidad"
        />
        <div className={style.selectTagsContainer}>
          <CustomSelectTag
            errorLabel={errors.day}
            options={daysOpt}
            firstOpt="Elegí un día"
            name="day"
            handlerChangeSelectTag={handlerChangeSelectTag}
            visualizeItems={activity.day}
            activity={activity}
            setActivity={setActivity}
            setErrors={setErrors}
          />
          <CustomSelectTag
            errorLabel={errors.hour}
            options={hoursOpt}
            firstOpt="Elegí un horario"
            name="hour"
            handlerChangeSelectTag={handlerChangeSelectTag}
            visualizeItems={activity.hour}
            activity={activity}
            setActivity={setActivity}
            setErrors={setErrors}
          />

          <CustomSelectTag
            errorLabel={errors.trainers}
            options={trainersOpt}
            firstOpt="Elegí un instructor"
            name="trainers"
            handlerChangeSelectTag={handlerChangeSelectTag}
            visualizeItems={activity.trainers}
            activity={activity}
            setActivity={setActivity}
            setErrors={setErrors}
          />
        </div>
        <button
          onClick={() => {
            setErrors(validateForm(activity));
          }}
          className={style.editBtn}
        >
          Editar actividad
        </button>
      </div>
    </div>
  );
}