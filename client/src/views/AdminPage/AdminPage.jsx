import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivity, getAllTrainers, requestPost } from "../../store/actions";
import style from "./AdminPage.module.css";
import AdminCardView from "./components/AdminCardView/AdminCardView";
import CustomModal from "./components/CustomModal/CustomModal";
import SideBar from "./components/SideBar/SideBar.jsx";
import TopBar from "./components/TopBar/TopBar";

export default function AdminPage() {
  const { isLoading } = useSelector((state) => state.pgym);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestPost());
    dispatch(getAllTrainers());
    dispatch(getActivity());
  }, [dispatch]);
  return (
    <div className={style.principalContainer}>
      <SideBar />
      <div className={style.columnContainer}>
        <TopBar />
        {isLoading ? (
          <div className={style.loaderContainer}>
            <span className={style.loader}></span>
          </div>
        ) : (
          <AdminCardView />
        )}
      </div>
      <CustomModal />
    </div>
  );
}
