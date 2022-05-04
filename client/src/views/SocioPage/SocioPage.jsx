import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userSignOut } from "../../store/actions/actions-login";
import style from "./SocioPage.module.css";

export default function SocioPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state);
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <div className={style.principalContainer}>
      <h2>SocioPage</h2>
      <button className={style.signOutBtn} onClick={() => dispatch(userSignOut())}>SignOut</button>
    </div>
  );
}
