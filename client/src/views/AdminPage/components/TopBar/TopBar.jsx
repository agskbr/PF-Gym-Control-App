import React from "react";
import style from "./TopBar.module.css";
import notification from "../../../../assets/notification.png";
import logoUser from "../../../../assets/logo.png"

export default function TopBar() {
  return (
    <div className={style.topBarContainer}>
      <div className={style.titleTopBar}>
        <span>Admin dashboard</span>
      </div>
      <div className={style.userAndNotification}>
        <div className={style.notificationIcon}>
          <img src={notification} alt="notificationIcon" />
          <div className={style.counterNotification}>5</div>
        </div>
        <div className={style.logoUser}><img src={logoUser} alt="User" /></div>
      </div>
    </div>
  );
}
