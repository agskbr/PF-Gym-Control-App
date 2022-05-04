import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginWithGoogle,
  validateUserIsLogged,
} from "../../store/actions/actions-login";
import googleLogo from "../../assets/google-logo.png";
import style from "./LoginPage.module.css";
import CustomInput from "../AdminPage/components/CustomInput/CustomInput";

export default function LoginPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(validateUserIsLogged());
  }, [dispatch]);
  useEffect(() => {
    if (Object.values(user).length) {
      navigate("/sociodashboard");
    }
  }, [user, navigate]);
  return (
    <div className={style.formContainer}>
      <h4>Inicia sesión</h4>
      <form>
        <CustomInput type="email" placeholder="Email" />
        <br />
        <CustomInput type="password" placeholder="Password" />
        <br />
        <input className={style.loginBtn} type="submit" value="Ingresar" />
      </form>
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
