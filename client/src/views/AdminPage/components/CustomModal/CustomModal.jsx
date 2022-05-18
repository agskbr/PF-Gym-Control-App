import React, { useEffect, useState } from "react";
import { validateForm } from "../../../../utils/validateForm";
import style from "./CustomModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createActivity,
  createDayAndHour,
  createTrainer,
} from "../../../../store/actions/index";
import CustomSelectTag from "../CustomSelectTag/CustomSelectTag.jsx";
import CustomInput from "../CustomInput/CustomInput.jsx";
import { addDescuento } from "../../../../store/actions/actions-descuentos";
import { FaPercent } from "react-icons/fa";
export default function CustomModal({ type }) {
  const dispatch = useDispatch();
  const { descuentos } = useSelector((state) => state.descuentos);
  const { trainers, activities, daysAndHours, users } = useSelector(
    (state) => state.pgym
  );
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
      if (type === "Dias y horas") {
        setDisplayInputs([...daysAndHours]);
        setKeys(Object.keys(daysAndHours[0]));
      }
      if (type === "Descuentos") {
        setDisplayInputs([...descuentos]);
        setKeys(Object.keys(descuentos[0]));
      }
    }
  }, [activities, trainers, daysAndHours, descuentos, type]);

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
          input !== "trainers" &&
          input !== "activity" &&
          input !== "activityId" &&
          input !== "diaHoras" &&
          input !== "users" &&
          input !== "updatedAt" &&
          input !== "createdAt" &&
          input !== "createdInDb" ? (
            input === "day" ? (
              <select
                key={input}
                onChange={(e) => {
                  setErrors(
                    validateForm({ ...inputs, [input]: e.target.value })
                  );
                  setInputs({ ...inputs, [input]: e.target.value });
                }}
                className={style.customSelectTag}
                name={input}
              >
                <option hidden>Selecciona un día</option>
                <option value="Lunes">Lunes</option>
                <option value="Martes">Martes</option>
                <option value="Miercoles">Miercoles</option>
                <option value="Jueves">Jueves</option>
                <option value="Sabado">Sabado</option>
                <option value="Domingo">Domingo</option>
              </select>
            ) : (
              <CustomInput
                key={input}
                name={input}
                type={
                  input === "capacity" || input === "descuento"
                    ? "number"
                    : "text"
                }
                min={0}
                onChange={handlerChange}
                placeholder={input}
                suffixIcon={
                  input === "hour" ? (
                    <span
                      style={{
                        color: "#fe4f22",
                        fontFamily: "sans-serif",
                        fontWeight: "600",
                      }}
                    >
                      Hs
                    </span>
                  ) : input === "descuento" ? (
                    <FaPercent size={16} color="#fe4f22" />
                  ) : null
                }
                value={inputs[input] || ""}
                labelError={errors[input]}
              />
            )
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
            selectTag !== "users" &&
            Array.isArray(displayInputs[0][selectTag]) ? (
              <CustomSelectTag
                key={selectTag}
                inputs={inputs}
                firstOpt={`Selecciona al menos 1 ${selectTag}`}
                name={selectTag}
                options={
                  selectTag === "trainers"
                    ? trainersOpt
                    : selectTag === "diaHoras"
                    ? [...daysAndHours]
                    : selectTag === "activities"
                    ? [...activities]
                    : selectTag === "users"
                    ? [...users]
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
          disabled={Object.values(errors).length !== 0}
          onClick={() => {
            setErrors(validateForm(inputs, type));
            if (Object.values(errors).length === 0) {
              if (type === "Clases") {
                const daysHoursIds = inputs.diaHoras.map(
                  (e) => e.match(/\(([^)]+)\)/)[1]
                );
                dispatch(
                  createActivity({
                    ...inputs,
                    price: parseInt(inputs.price),
                    diaHoraId: daysHoursIds,
                  })
                );
              }
              if (type === "Instructores") {
                dispatch(
                  createTrainer({ ...inputs, activity: [...inputs.activities] })
                );
              }
              if (type === "Dias y horas") {
                dispatch(
                  createDayAndHour({
                    ...inputs,
                  })
                );
              }

              if (type === "Descuentos") {
                dispatch(
                  addDescuento({
                    ...inputs,
                    codigo: inputs.codigo.toUpperCase(),
                  })
                );
              }
              document.getElementById("createDialog").close();
            }
          }}
          className={
            Object.values(errors).length === 0
              ? style.createBtn
              : style.createDisabledBtn
          }
        >
          Crear
        </button>
      </div>
    </dialog>
  );
}
