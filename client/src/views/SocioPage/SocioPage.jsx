import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  userSignOut,
  validateUserIsLogged,
} from "../../store/actions/actions-login";
import style from "./SocioPage.module.css";
import MyActivities from "./components/MyActivities/MyActivities";
// import CreateReaview from "./components/CreateReview/CreateReview";

export default function SocioPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(validateUserIsLogged());
  }, [dispatch]);

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className={style.principalContainer}>
      <h2>SocioPage</h2>
      <button
        className={style.signOutBtn}
        onClick={() => dispatch(userSignOut())}
      >
        SignOut
      </button>
      <div>
        <MyActivities />
      </div>
      {/* <CreateReaview/> */}

      <dialog id="reviewDialog" style={{ border: "none", height: "30vh" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ justifyContent: "flex-end", display: "flex" }}>
            <button
              onClick={() => document.getElementById("reviewDialog").close()}
            >
              x
            </button>
          </div>
          <h4>Dejanos lo que pensas sobre nuestro servicio</h4>
          <textarea
            name="review"
            style={{ resize: "none" }}
            placeholder="Agrega tu review aquí"
          ></textarea>
        </div>
      </dialog>
    </div>
  );
}
