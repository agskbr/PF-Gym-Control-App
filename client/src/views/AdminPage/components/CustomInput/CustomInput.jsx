import React from "react";
import style from "./CustomInput.module.css";
export default function CustomInput({
  name,
  value,
  onChange,
  placeholder,
  type,
  labelError,
  min,
  titleInput,
}) {
  return (
    <div className={style.inputContainer}>
      <span>{titleInput}</span>
      <input
        onChange={onChange}
        className={style.customInput}
        value={value}
        name={name}
        type={type}
        placeholder={placeholder}
        min={min}
      />
      <label htmlFor={name}>{labelError}</label>
    </div>
  );
}
