import React, { useEffect, useState } from "react";
import style from "./RegisterPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUserWithEmailAndPass,
  validateUserIsLogged,
} from "../../store/actions/actions-login";
import CustomInput from "../AdminPage/components/CustomInput/CustomInput";

export default function RegisterPage() {
  const { user } = useSelector((state) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(validateUserIsLogged());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
    }
  }, [user, navigate]);

  const [input, setInput] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const handlerChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setErrors(validateSubmit({ ...input, [name]: value }));
    setInput((state) => ({ ...state, [name]: value }));
  };

  const validateSubmit = (input) => {
    const err = {};
    if (!input.name) {
      err.name = "El nombre es requerido";
    }
    if (!input.lastName) {
      err.lastName = "El apellido es requerido";
    }
    if (!input.email) {
      err.email = "El email es obligatorio";
    } else if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/g.test(input.email)) {
      err.email = "El email debe ser válido";
    }
    if (!input.password) {
      err.password = "La contraseña es obligatoria";
    } else if (input.password.length < 6) {
      err.password = "La contraseña no puede ser tan corta";
    }
    if (!input.phoneNumber) {
      err.phoneNumber = "Debe ingresar un numero de teléfono";
    }
    return err;
  };

  return (
    <div className={style.principalContainer}>
      <h3>Regístrate</h3>

      <form>
        <CustomInput
          name="name"
          onChange={handlerChange}
          value={input.name}
          placeholder="Nombre"
          labelError={errors.name}
        />
        <CustomInput
          name={"lastName"}
          value={input.lastName}
          onChange={handlerChange}
          placeholder="Apellido"
          labelError={errors.lastName}
        />
        <CustomInput
          name={"email"}
          value={input.email}
          onChange={handlerChange}
          placeholder="Email"
          labelError={errors.email}
        />
        <CustomInput
          name="phoneNumber"
          value={input.phoneNumber}
          onChange={handlerChange}
          placeholder="Teléfono"
          labelError={errors.phoneNumber}
        />
        <CustomInput
          value={input.password}
          name="password"
          onChange={handlerChange}
          placeholder="Contraseña"
          labelError={errors.password}
        />
        <input
          type="submit"
          className={style.registerBtn}
          value="Registrarme"
          onClick={(e) => {
            e.preventDefault();
            setErrors(validateSubmit(input));
            if (Object.values(errors).length === 0) {
              dispatch(
                registerUserWithEmailAndPass(
                  input.email,
                  input.password,
                  input.name,
                  input.lastName,
                  input.phoneNumber
                )
              );
            }
          }}
        />
        <div className={style.haveAccount}>
          ¿Ya tenés una cuenta?{" "}
          <Link className={style.link} to="/login">
            ingresá
          </Link>
        </div>
      </form>
    </div>
  );
}
