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
  max,
  titleInput,
  suffixIcon,
}) {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  return (
    <div className={style.inputContainer}>
      <span className={style.titleInput}>{titleInput}</span>
      {name === "phoneNumber" ? (
        <div className={style.phoneInput}>
          <span>+54</span>
          <input
            className={style.phoneNumberInput}
            value={value}
            disabled={disabled}
            name={name}
            onChange={onChange}
            placeholder={name}
            type="tel"
          />
        </div>
      ) : (
        <input
          max={max}
          disabled={disabled}
          onChange={onChange}
          className={style.customInput}
          value={value}
          style={name === "codigo" ? { textTransform: "uppercase" } : null}
          name={name}
          type={
            name === "password"
              ? isVisiblePassword
                ? "text"
                : "password"
              : type
          }
          placeholder={placeholder}
          min={min}
        />
      )}
      <div className={style.suffixIcon}>{suffixIcon}</div>
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
      <label className={style.errorLabel} htmlFor={name}>
        {labelError}
      </label>
    </div>
  );
}
