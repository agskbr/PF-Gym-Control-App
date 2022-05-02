import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  editActivity,
  getActivityById,
  getAllTrainers,
} from "../../../../store/actions/index.js";
import { validateForm } from "../../../../utils/validateForm.js";
import CustomInput from "../CustomInput/CustomInput.jsx";
import CustomSelectTag from "../CustomSelectTag/CustomSelectTag.jsx";
import style from "./EditActivity.module.css";
import swal from "sweetalert";

export default function EditActivity() {
  const { trainers, detail } = useSelector((state) => state);
  const { id } = useParams();
  const [activityToEdit, setActivityToEdit] = useState({});
  const dispatch = useDispatch();
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
    dispatch(getAllTrainers());
  }, [dispatch, id]);
  useEffect(() => {
    if (Object.values(detail).length) {
      setActivityToEdit(detail);
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
        price: activityToEdit.price,
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
          disabled={Object.values(errors).length}
          onClick={() => {
            setErrors(validateForm(activity));
            if (Object.values(errors).length === 0) {
              dispatch(editActivity(activity, id));
              swal({
                closeOnEsc: false,
                closeOnClickOutside: false,
                buttons: "Aceptar",
                icon: "success",
                title: "Actividad editada correctamente",
              });
              setErrors({
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
            }
          }}
          className={
            Object.values(errors).length ? style.disabledEditBtn : style.editBtn
          }
        >
          Editar actividad
        </button>
      </div>
    </div>
  );
}
