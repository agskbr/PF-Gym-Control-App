import React, { useState } from "react";
import style from "./CustomInput.module.css";
import { FaEyeSlash, FaEye } from "react-icons/fa";
export default function CustomInput({
  disabled = false,
  name,
  value,
  onChange,
  placeholder,
  type,
  labelError,
  min,
  titleInput,
}) {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  return (
    <div className={style.inputContainer}>
      <span>{titleInput}</span>
      {name === "phoneNumber" ? (
        <div className={style.phoneInput}>
          <span>+54</span>
          <input type={type} />
        </div>
      ) : (
        <input
          disabled={disabled}
          onChange={onChange}
          className={style.customInput}
          value={value}
          name={name}
          type={
            name === "password"
              ? isVisiblePassword
                ? "text"
                : "password"
              : "text"
          }
          placeholder={placeholder}
          min={min}
          prefix={"Hola"}
        />
      )}
      {name === "password" ? (
        <div className={style.passwordToggle}>
          {isVisiblePassword ? (
            <FaEyeSlash
              size={18}
              onClick={() => setIsVisiblePassword(!isVisiblePassword)}
            />
          ) : (
            <FaEye
              size={18}
              onClick={() => setIsVisiblePassword(!isVisiblePassword)}
            />
          )}
        </div>
      ) : null}
      <label htmlFor={name}>{labelError}</label>
    </div>
  );
}
