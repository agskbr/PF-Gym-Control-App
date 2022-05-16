import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { editUser } from "../../../../store/actions/actions-user.js";
import { editActivity } from "../../../../store/actions/index.js";
import { validateForm } from "../../../../utils/validateForm.js";
import CustomInput from "../CustomInput/CustomInput.jsx";
import CustomSelectTag from "../CustomSelectTag/CustomSelectTag.jsx";
import style from "./EditPage.module.css";
import { useNavigate } from "react-router-dom";
import { modDescuento } from "../../../../store/actions/actions-descuentos.js";

export default function EditPage() {
  const { trainers, activities, daysAndHours, users } = useSelector(
    (state) => state.pgym
  );

  const navigate = useNavigate();

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
          {state.itemSelect.image ? (
            <img src={state.itemSelect.image} alt={item} />
          ) : null}
        </div>
        {keys.map((input) =>
          input !== "id" &&
          input !== "uid" &&
          input !== "description" &&
          input !== "experience" &&
          input !== "activities" &&
          input !== "diaHoras" &&
          input !== "status" &&
          input !== "day" &&
          input !== "trainers" &&
          input !== "notifications" &&
          input !== "updatedAt" &&
          input !== "createdAt" &&
          input !== "createdInDb" &&
          input !== "hour" ? (
            input === "isAdmin" ? (
              <div key={input} className={style.adminQuestion}>
                <span>¿Este usuario es admin?</span>
                <input
                  name={input}
                  disabled={inputs.name === "Admin"}
                  type="checkbox"
                  checked={inputs.isAdmin}
                  value={inputs.isAdmin}
                  onChange={(e) =>
                    setInputs((state) => ({
                      ...state,
                      [e.target.name]: !state[input],
                    }))
                  }
                />
              </div>
            ) : (
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
            )
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
            selectTag !== "users" &&
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
                visualizeItems={inputs[selectTag] ?? []}
              />
            ) : null
          )}
        </div>
        <div className={style.buttonsContainer}>
          <button
            disabled={Object.values(errors).length !== 0}
            onClick={() => {
              setErrors(validateForm(inputs, type));
              if (Object.values(errors).length === 0) {
                if (type === "Clases") {
                  const daysHoursIds = inputs.diaHoras.map((e) => {
                    if (typeof e === "string" && e.includes("(")) {
                      return e.match(/\(([^)]+)\)/)[1];
                    } else {
                      return null;
                    }
                  });
                  const trainersIds = inputs.trainers.map((e) => {
                    if (e.includes("(")) {
                      return e.match(/\(([^)]+)\)/)[1];
                    } else {
                      return null;
                    }
                  });
                  dispatch(
                    editActivity(
                      {
                        ...inputs,
                        price: parseInt(inputs.price),
                      },
                      id,
                      daysHoursIds,
                      trainersIds
                    )
                  );
                }
                if (type === "Usuarios") {
                  dispatch(
                    editUser(id, {
                      isAdmin: inputs.isAdmin,
                      image: inputs.image,
                      activities: inputs.activities,
                    })
                  );
                }
                if (type === "Instructores") {
                  // dispatch();
                }
                if (type === "Descuentos") {
                  dispatch(modDescuento({ ...inputs }, id));
                }
                navigate("/admindashboard", { replace: true });
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
            Volver atrás
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
