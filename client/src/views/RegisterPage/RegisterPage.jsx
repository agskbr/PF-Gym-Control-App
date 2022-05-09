import React, { useState } from "react";
import style from "./RegisterPage.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUserWithEmailAndPass } from "../../store/actions/actions-login";
import CustomInput from "../AdminPage/components/CustomInput/CustomInput";
import Loader from "../../components/Loader/Loader";

export default function RegisterPage() {
  const { isLoading } = useSelector((state) => state.pgym);

  const dispatch = useDispatch();

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
    password2: "",
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
    } else if (
      !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/g.test(
        input.password
      )
    ) {
      err.password = "Leer las condiciones de la contraseña *";
    }
    if (!input.phoneNumber) {
      err.phoneNumber = "Debe ingresar un numero de teléfono";
    } else if (
      /^\(?(\d{3})\)?[-]?(\d{3})[-]?(\d{4})$/g.test(input.phoneNumber)
    ) {
      err.phoneNumber = "El telefono debe ser válido";
    }
    return err;
  };

  return isLoading ? (
    <Loader />
  ) : (
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
          type="text"
          name="password"
          onChange={handlerChange}
          placeholder="Contraseña"
          labelError={errors.password}
        />
        <input
          type="submit"
          disabled={Object.values(errors).length > 0}
          className={
            Object.values(errors).length > 0
              ? style.disabledBtn
              : style.registerBtn
          }
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
      <p className={style.password}>
        * La contraseña debe tener al menos 6 caracteres, letras, números y, al
        menos, un caracter especial *
      </p>
    </div>
  );
}
