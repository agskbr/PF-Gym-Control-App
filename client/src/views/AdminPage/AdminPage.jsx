import React from "react";
import style from "./AdminPage.module.css";
import SideBar from "./components/SideBar/SideBar.jsx";
import TopBar from "./components/TopBar/TopBar";

export default function AdminPage() {
  return (
    <div className={style.principalContainer}>
      <SideBar />
      <TopBar />
    </div>
  );
}
