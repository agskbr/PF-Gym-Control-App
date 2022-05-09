import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import {
  getActivity,
  getAllTrainers,
  getAllUsers,
  requestPost,
} from "../../store/actions";
import style from "./AdminPage.module.css";
import AdminCardView from "./components/AdminCardView/AdminCardView";
import CustomModal from "./components/CustomModal/CustomModal";
import SideBar from "./components/SideBar/SideBar.jsx";
import TopBar from "./components/TopBar/TopBar";

export default function AdminPage() {
  const { isLoading } = useSelector((state) => state.pgym);
  const [typeOfCardView, setTypeOfCardView] = useState("Usuarios");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestPost());
    dispatch(getAllUsers());
    dispatch(getAllTrainers());
    dispatch(getActivity());
  }, [dispatch]);

  return (
    <div className={style.principalContainer}>
      <SideBar setTypeOfCardView={setTypeOfCardView} type={typeOfCardView} />
      <div className={style.columnContainer}>
        <TopBar />
        {isLoading ? <Loader /> : <AdminCardView type={typeOfCardView} />}
      </div>
      <CustomModal type={typeOfCardView} />
    </div>
  );
}
