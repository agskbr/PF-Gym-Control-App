import React from "react";
import notFoundImage from "../../assets/not-found-page.svg";
import style from "./NotFoundPage.module.css";
export default function NotFoundPage() {
  return (
    <div className={style.principalContainer}>
      <span>404</span>
      <span>Not found Page</span>
      <div className={style.imageContainer}>
        <img src={notFoundImage} alt="404" />
      </div>
    </div>
  );
}
