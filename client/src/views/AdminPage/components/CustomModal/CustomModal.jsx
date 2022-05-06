import React, { useEffect, useState } from "react";
import { validateForm } from "../../../../utils/validateForm";
import style from "./CustomModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createActivity } from "../../../../store/actions/index";
import CustomSelectTag from "../CustomSelectTag/CustomSelectTag.jsx";
import CustomInput from "../CustomInput/CustomInput.jsx";
import Swal from "sweetalert";
export default function CustomModal({ type }) {
  const dispatch = useDispatch();
  const { trainers, activities, users } = useSelector((state) => state.pgym);
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

  const [activity, setActivity] = useState({});
  const [errors, setErrors] = useState({});

  const [displayInputs, setDisplayInputs] = useState([]);
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    if (users.length && trainers.length && activities.length) {
      if (type === "Usuarios") {
        setDisplayInputs([...users]);
        setKeys(Object.keys(users[0]));
      }
      if (type === "Instructores") {
        setDisplayInputs([...trainers]);
        setKeys(Object.keys(trainers[0]));
      }
      if (type === "Clases") {
        setDisplayInputs([...activities]);
        setKeys(Object.keys(activities[0]));
      }
    }
  }, [activities, trainers, users, type]);

  useEffect(() => {
    if (keys.length) {
      keys.forEach((key) => {
        setActivity((state) => {
          if (Array.isArray(displayInputs[0][key])) {
            return { ...state, [key]: [] };
          } else if (typeof displayInputs[0][key] === "number") {
            return { ...state, [key]: 0 };
          } else {
            return { ...state, [key]: "" };
          }
        });
        setErrors((state) => ({ ...state, [key]: "" }));
      });
    }
  }, [keys, displayInputs]);

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
            setActivity({});
            setErrors({});
          }}
          className={style.closeBtn}
        >
          x
        </button>
      </div>
      <h4>{`Crear ${type}`}</h4>
      <div className={style.contentDialog}>
        {keys.map((input) =>
          input !== "id" &&
          input !== "description" &&
          input !== "day" &&
          input !== "trainers" &&
          input !== "updatedAt" &&
          input !== "createdAt" &&
          input !== "createdInDb" &&
          input !== "hour" ? (
            <CustomInput
              key={input}
              name={input}
              type={
                typeof displayInputs[0][input] === "number" ? "number" : "text"
              }
              min={0}
              onChange={handlerChange}
              placeholder={input}
              value={activity[input]}
              labelError={errors[input]}
            />
          ) : null
        )}
        {keys.map((input) =>
          input === "description" ? (
            <div key={input} className={style.textAreaContainer}>
              <textarea
                value={activity.description}
                onChange={handlerChange}
                className={style.customTextArea}
                name="description"
                placeholder="Descripcion"
              ></textarea>
              <label htmlFor="description">{errors.description}</label>
            </div>
          ) : null
        )}

        {/* <CustomInput
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
        /> */}

        {/* <CustomInput
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
        /> */}
        <div className={style.selectTagsContainer}>
          {/* {keys.map((selectTag) =>
            Array.isArray(displayInputs[0][selectTag]) ? (
              <CustomSelectTag
                activity={activity}
                firstOpt={`Selecciona al menos 1 ${selectTag}`}
                name={selectTag}
                options={
                  selectTag === "trainers"
                    ? trainersOpt
                    : selectTag === "day"
                    ? daysOpt
                    : selectTag === "hour"
                    ? hoursOpt
                    : null
                }
                setActivity={setActivity}
                visualizeItems={}
                handlerChangeSelectTag={handlerChangeSelectTag}
              />
            ) : null
          )} */}
          {/* <CustomSelectTag
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
          /> */}
        </div>
      </div>
      <div className={style.createBtnContainer}>
        <button
          disabled
          onClick={() => {
            setErrors(validateForm(activity, type));
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
              setActivity({});
            }
          }}
          className={style.createDisabledBtn}
        >
          Crear actividad
        </button>
      </div>
    </dialog>
  );
}
