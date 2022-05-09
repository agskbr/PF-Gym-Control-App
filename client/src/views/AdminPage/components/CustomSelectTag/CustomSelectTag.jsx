import React, { useEffect, useState } from "react";
import style from "./CustomSelectTag.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { validateForm } from "../../../../utils/validateForm";

export default function CustomSelectTag({
  handlerChangeSelectTag,
  name,
  options,
  firstOpt,
  visualizeItems,
  errorLabel,
  setInputs,
  setErrors,
  inputs,
  type,
}) {
  const [displayItems, setDisplayItems] = useState([]);
  useEffect(() => {
    setDisplayItems([...visualizeItems]);
  }, [visualizeItems]);
  return (
    <div className={style.selectTagsContainer}>
      <select
        onChange={handlerChangeSelectTag}
        className={style.customSelectTag}
        name={name}
      >
        <option hidden>{firstOpt}</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.name}>
            {opt.name}
          </option>
        ))}
      </select>
      <div className={style.selectedItemsContainer}>
        <ul>
          {displayItems.map((item, i) => (
            <div key={i} className={style.itemContainer}>
              <li key={item}>{item}</li>
              <AiFillCloseCircle
                key={Math.random()}
                onClick={() => {
                  setDisplayItems((state) => state.filter((e) => e !== item));
                  setInputs((state) => ({
                    ...state,
                    [name]: visualizeItems.filter((e) => e !== item),
                  }));
                  setErrors(
                    validateForm(
                      {
                        ...inputs,
                        [name]: visualizeItems.filter((e) => e !== item),
                      },
                      type
                    )
                  );
                }}
                color="red"
                className={style.deleteItemIcon}
              />
            </div>
          ))}
        </ul>
      </div>
      <label htmlFor={name}>{errorLabel}</label>
    </div>
  );
}
