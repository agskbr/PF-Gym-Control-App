import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { editActivity } from "../../../../store/actions/index.js";
import { validateForm } from "../../../../utils/validateForm.js";
import CustomInput from "../CustomInput/CustomInput.jsx";
import CustomSelectTag from "../CustomSelectTag/CustomSelectTag.jsx";
import style from "./EditPage.module.css";
import swal from "sweetalert";

export default function EditPage() {
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

  const { state } = useLocation();
  const dispatch = useDispatch();

  const { id, item } = useParams();
  const type = item.replace(item[0], item[0].toUpperCase());

  const [errors, setErrors] = useState({});
  const [displayInputs, setDisplayInputs] = useState([]);
  const [inputs, setInputs] = useState({});
  const [keys, setKeys] = useState([]);

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

  useEffect(() => {
    if (Object.values(state).length) {
      setDisplayInputs([...state.displayArray]);
      setKeys(Object.keys(state.displayArray[0]));
    }
  }, [state, id]);

  useEffect(() => {
    if (keys.length) {
      keys.forEach((key) => {
        setInputs((sta) => {
          if (Array.isArray(state.itemSelect[key])) {
            const convertToArrayOfString = state.itemSelect[key][0]?.name
              ? state.itemSelect[key].map((item) => item.name)
              : state.itemSelect[key];
            console.log(convertToArrayOfString);
            return { ...sta, [key]: [...convertToArrayOfString] };
          } else if (typeof displayInputs[0][key] === "number") {
            return { ...sta, [key]: state.itemSelect[key] };
          } else {
            return { ...sta, [key]: state.itemSelect[key] };
          }
        });
        setErrors((state) => ({ ...state, [key]: "" }));
      });
    }
  }, [keys, displayInputs, state]);

  return (
    <div className={style.principalContainer}>
      <h3>Editar {item}</h3>
      <div className={style.inputsContainer}>
        <div className={style.imageContainer}>
          <img src={state.itemSelect.image ?? ""} alt={item} />
        </div>
        {keys.map((input) =>
          input !== "id" &&
          input !== "uid" &&
          input !== "description" &&
          input !== "experience" &&
          input !== "activities" &&
          input !== "status" &&
          input !== "day" &&
          input !== "trainers" &&
          input !== "updatedAt" &&
          input !== "createdAt" &&
          input !== "createdInDb" &&
          input !== "hour" ? (
            <CustomInput
              disabled={disabledUserInputs(type, input)}
              key={input}
              labelError={errors[input]}
              name={input}
              onChange={handlerChange}
              value={inputs[input] ?? ""}
              placeholder={input}
              titleInput={input}
              type="text"
            />
          ) : input === "experience" || input === "description" ? (
            <div key={input} className={style.textAreaContainer}>
              <span>
                {inputs.description
                  ? "description"
                  : inputs.experience
                  ? "experience"
                  : null}
              </span>
              <textarea
                value={inputs[input] ?? ""}
                onChange={handlerChange}
                className={style.customTextArea}
                name="description"
                placeholder="Descripcion"
              ></textarea>
              <label htmlFor="description">{errors.description}</label>
            </div>
          ) : null
        )}

        <div className={style.selectTagsContainer}>
          {keys.map((selectTag) =>
            Array.isArray(state.itemSelect[selectTag]) ? (
              <CustomSelectTag
                key={selectTag}
                name={selectTag}
                inputs={inputs}
                firstOpt="Elegí una o mas opciones"
                setInputs={setInputs}
                setErrors={setErrors}
                errorLabel={errors[selectTag]}
                type={type}
                handlerChangeSelectTag={handlerChangeSelectTag}
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
                visualizeItems={inputs[selectTag] ?? []}
              />
            ) : null
          )}
        </div>
        <div className={style.buttonsContainer}>
          <button
            disabled={Object.values(errors).length}
            onClick={() => {
              if (Object.values(errors).length === 0) {
                if (type === "Clases") {
                  dispatch(
                    editActivity(
                      {
                        ...inputs,
                        price: parseInt(inputs.price),
                        capacity: parseInt(inputs.capacity),
                      },
                      id
                    )
                  );
                }
                if (type === "Instructores") {
                  // dispatch();
                }
                if (type === "Instructores") {
                  // dispatch();
                }
                swal({
                  closeOnEsc: false,
                  closeOnClickOutside: false,
                  buttons: "Aceptar",
                  icon: "success",
                  title: "Actividad editada correctamente",
                });
              }
            }}
            className={
              Object.values(errors).length
                ? style.disabledEditBtn
                : style.editBtn
            }
          >
            Editar {item}
          </button>
          <Link className={style.link} to={"/admindashboard"}>
            Terminar edición
          </Link>
        </div>
      </div>
    </div>
  );
}

export const disabledUserInputs = (type, input) => {
  if (type !== "Usuarios") return false;
  if (
    input === "name" ||
    input === "lastName" ||
    input === "email" ||
    input === "phoneNumber"
  ) {
    return true;
  }
};
