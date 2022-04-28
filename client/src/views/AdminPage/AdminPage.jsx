import React from "react";
import style from "./AdminPage.module.css";
import AdminCardView from "./components/AdminCardView/AdminCardView";
import CustomModal from "./components/CustomModal/CustomModal";
import SideBar from "./components/SideBar/SideBar.jsx";
import TopBar from "./components/TopBar/TopBar";

export default function AdminPage() {
  return (
    <div className={style.principalContainer}>
      <SideBar />
      <div className={style.columnContainer}>
        <TopBar />
        <AdminCardView />
      </div>
      <CustomModal />
    </div>
  );
}
