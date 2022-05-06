import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginWithGoogle,
  resetPassword,
  signInWithEmailAndPass,
  validateUserIsLogged,
} from "../../store/actions/actions-login";
import googleLogo from "../../assets/google-logo.png";
import style from "./LoginPage.module.css";
import CustomInput from "../AdminPage/components/CustomInput/CustomInput";

export default function LoginPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.login);
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });
  const [recAccount, setRecAccount] = useState({ recEmail: "", error: "" });
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(validateUserIsLogged());
  }, [dispatch]);
  useEffect(() => {
    if (user?.uid) {
      navigate("/sociodashboard");
    }
  }, [user, navigate]);

  const handlerChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };
  return (
    <div className={style.formContainer}>
      <h3>Inicia sesión</h3>
      <dialog className={style.forgotDialog} id="forgotPassDialog">
        <div className={style.dialogContainer}>
          <h4>Se te enviará un correo para recuperar tu cuenta</h4>
          <CustomInput
            name={"recEmail"}
            value={recAccount.recEmail}
            onChange={(e) => {
              setRecAccount({ ...recAccount, [e.target.name]: e.target.value });
            }}
            placeholder="Dirección de correo"
            labelError={recAccount.error}
          />
          <button
            onClick={() => {
              dispatch(resetPassword(recAccount.recEmail));
              document.getElementById("forgotPassDialog").close();
            }}
            className={style.sendBtn}
          >
            Enviar
          </button>
        </div>
      </dialog>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(signInWithEmailAndPass(input.email, input.password));
        }}
      >
        <CustomInput
          value={input.email}
          name="email"
          type="email"
          onChange={handlerChange}
          placeholder="Email"
        />

        <CustomInput
          value={input.password}
          name="password"
          type="password"
          onChange={handlerChange}
          placeholder="Password"
        />
        <div className={style.forgotPassContainer}>
          ¿Olvidaste tu contraseña?
          <button
            className={style.forgotPassBtn}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("forgotPassDialog").showModal();
            }}
          >
            recupera tu cuenta
          </button>
        </div>
        <input className={style.loginBtn} type="submit" value="Ingresar" />
      </form>
      <div className={style.createAccount}>
        ¿No tenes una cuenta?{" "}
        <Link className={style.link} to="/register">
          creá una
        </Link>
      </div>
      <span className={style.optionsToLogin}>O ingresá con</span>
      <button
        className={style.googleBtn}
        onClick={() => {
          dispatch(loginWithGoogle());
        }}
      >
        <img src={googleLogo} alt="google" />
      </button>
    </div>
  );
}
