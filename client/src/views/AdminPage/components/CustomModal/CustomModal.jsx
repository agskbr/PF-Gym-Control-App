import React, { useEffect, useState } from "react";
import { validateForm } from "../../../../utils/validateForm";
import style from "./CustomModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createActivity, createTrainer } from "../../../../store/actions/index";
import CustomSelectTag from "../CustomSelectTag/CustomSelectTag.jsx";
import CustomInput from "../CustomInput/CustomInput.jsx";
export default function CustomModal({ type }) {
  const dispatch = useDispatch();
  const { trainers, activities } = useSelector((state) => state.pgym);
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

  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});

  const [displayInputs, setDisplayInputs] = useState([]);
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    if (trainers.length && activities.length) {
      if (type === "Instructores") {
        setDisplayInputs([...trainers]);
        setKeys(Object.keys(trainers[0]));
      }
      if (type === "Clases") {
        setDisplayInputs([...activities]);
        setKeys(Object.keys(activities[0]));
      }
    }
  }, [activities, trainers, type]);

  useEffect(() => {
    if (keys.length) {
      keys.forEach((key) => {
        setInputs((state) => {
          if (Array.isArray(displayInputs[0][key])) {
            return { ...state, [key]: [] };
          }
          if (typeof displayInputs[0][key] === "number") {
            return { ...state, [key]: 0 };
          }
          if (typeof displayInputs[0][key] === "string") {
            return { ...state, [key]: "" };
          }
          if (typeof displayInputs[0][key] === "boolean") {
            return { ...state, [key]: false };
          }
        });
        setErrors((state) => ({ ...state, [key]: "" }));
      });
    }
  }, [keys, displayInputs]);

  const handlerChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setErrors(validateForm({ ...inputs, [name]: value }, type));
    setInputs((state) => ({ ...state, [name]: value }));
  };
  const handlerChangeSelectTag = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setErrors(validateForm({ ...inputs, [name]: value }, type));
    if (inputs[name].includes(value)) return;
    setInputs({
      ...inputs,
      [name]: [...inputs[name], value],
    });
  };

  return (
    <dialog className={style.dialogContainer} id="createDialog">
      <div className={style.headerDialog}>
        <button
          onClick={() => {
            document.getElementById("createDialog").close();
            // setActivity({});
            // setErrors({});
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
          input !== "activities" &&
          input !== "status" &&
          input !== "day" &&
          input !== "trainers" &&
          input !== "updatedAt" &&
          input !== "createdAt" &&
          input !== "createdInDb" &&
          input !== "hour" ? (
            <CustomInput
              key={input}
              name={input}
              type="text"
              min={0}
              onChange={handlerChange}
              placeholder={input}
              value={inputs[input] || ""}
              labelError={errors[input]}
            />
          ) : input === "description" ? (
            <div key={input} className={style.textAreaContainer}>
              <textarea
                value={inputs[input]}
                onChange={handlerChange}
                className={style.customTextArea}
                name={input}
                placeholder="Descripcion"
              ></textarea>
              <label htmlFor="description">{errors.description}</label>
            </div>
          ) : null
        )}
        <div className={style.selectTagsContainer}>
          {keys.map((selectTag) =>
            Array.isArray(displayInputs[0][selectTag]) ? (
              <CustomSelectTag
                key={selectTag}
                inputs={inputs}
                firstOpt={`Selecciona al menos 1 ${selectTag}`}
                name={selectTag}
                options={
                  selectTag === "day"
                    ? daysOpt
                    : selectTag === "hour"
                    ? hoursOpt
                    : selectTag === "trainers"
                    ? trainersOpt
                    : selectTag === "activities"
                    ? [...activities]
                    : []
                }
                setInputs={setInputs}
                type={type}
                setErrors={setErrors}
                visualizeItems={[...(inputs[selectTag] ?? [])]}
                errorLabel={errors[selectTag]}
                handlerChangeSelectTag={handlerChangeSelectTag}
              />
            ) : null
          )}
        </div>
      </div>
      <div className={style.createBtnContainer}>
        <button
          onClick={() => {
            setErrors(validateForm(inputs, type));
            if (Object.values(errors).length === 0) {
              if (type === "Clases") {
                dispatch(
                  createActivity({
                    ...inputs,
                    price: parseInt(inputs.price),
                    capacity: parseInt(inputs.capacity),
                  })
                );
              }
              if (type === "Instructores") {
                dispatch(createTrainer(inputs));
              }
              document.getElementById("createDialog").close();
            }
          }}
          className={style.createBtn}
        >
          Crear
        </button>
      </div>
    </dialog>
  );
}
