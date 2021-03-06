import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { requestPost } from "../../store/actions/index";
import {
  loginWithGithub,
  loginWithGoogle,
  resetPassword,
  signInWithEmailAndPass,
} from "../../store/actions/actions-login";
import googleLogo from "../../assets/google-logo.png";
import githubLogo from "../../assets/github-logo.png";
import style from "./LoginPage.module.css";
import CustomInput from "../AdminPage/components/CustomInput/CustomInput";
import Loader from "../../components/Loader/Loader";

export default function LoginPage() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.pgym);
  const [input, setInput] = useState({ email: "", password: "" });
  const [recAccount, setRecAccount] = useState({ recEmail: "" });

  const handlerChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };
  return isLoading ? (
    <Loader />
  ) : (
    <div className={style.formContainer}>
      <h3>Inicia sesión</h3>
      <dialog className={style.forgotDialog} id="forgotPassDialog">
        <div className={style.dialogContainer}>
          <div className={style.headerOfDialog}>
            <h4>Se te enviará un correo para recuperar tu cuenta</h4>
            <button
              className={style.closeBtnModal}
              onClick={() =>
                document.getElementById("forgotPassDialog").close()
              }
            >
              x
            </button>
          </div>
          <CustomInput
            name={"recEmail"}
            value={recAccount.recEmail}
            onChange={(e) => {
              setRecAccount({ ...recAccount, [e.target.name]: e.target.value });
            }}
            placeholder="Dirección de correo"
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

        <input className={style.loginBtn} type="submit" value="Ingresar" />
      </form>
      <div className={style.forgotPassContainer}>
        ¿Olvidaste tu contraseña?
        <button
          className={style.forgotPassBtn}
          onClick={() => {
            document.getElementById("forgotPassDialog").showModal();
          }}
        >
          recupera tu cuenta
        </button>
      </div>
      <div className={style.createAccount}>
        ¿No tenes una cuenta?{" "}
        <Link className={style.link} to="/register">
          creá una
        </Link>
      </div>
      <span className={style.optionsToLogin}>O ingresá con</span>
      <div className={style.loginOptions}>
        <button
          className={style.socialBtn}
          onClick={() => {
            dispatch(requestPost());
            dispatch(loginWithGoogle());
          }}
        >
          <img src={googleLogo} alt="googleLogo" />
        </button>
        <button
          className={style.socialBtn}
          onClick={() => {
            dispatch(requestPost());
            dispatch(loginWithGithub());
          }}
        >
          <img src={githubLogo} alt="githubLogo" />
        </button>
      </div>
    </div>
  );
}
