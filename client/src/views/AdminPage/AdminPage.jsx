import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getActivity,
  getAllTrainers,
  getAllUsers,
  requestPost,
} from "../../store/actions";
import { validateUserIsLogged } from "../../store/actions/actions-login";
import style from "./AdminPage.module.css";
import AdminCardView from "./components/AdminCardView/AdminCardView";
import CustomModal from "./components/CustomModal/CustomModal";
import SideBar from "./components/SideBar/SideBar.jsx";
import TopBar from "./components/TopBar/TopBar";

export default function AdminPage() {
  const { isLoading } = useSelector((state) => state.pgym);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.login);
  const [typeOfCardView, setTypeOfCardView] = useState("Usuarios");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestPost());
    dispatch(getAllUsers());
    dispatch(getAllTrainers());
    dispatch(validateUserIsLogged());
    dispatch(getActivity());
  }, [dispatch]);
  useEffect(() => {
    if(!user) {
      navigate("/login")
    }
  }, [user, navigate]);
  return (
    <div className={style.principalContainer}>
      <SideBar setTypeOfCardView={setTypeOfCardView} type={typeOfCardView} />
      <div className={style.columnContainer}>
        <TopBar />
        {isLoading ? (
          <div className={style.loaderContainer}>
            <span className={style.loader}></span>
          </div>
        ) : (
          <AdminCardView type={typeOfCardView} />
        )}
      </div>
      <CustomModal type={typeOfCardView} />
    </div>
  );
}
