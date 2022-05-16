import React, { useEffect, useState } from "react";
import style from "./CustomSelectTag.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { validateForm } from "../../../../utils/validateForm";
import { useDispatch } from "react-redux";
import { deleteDayHourFromActivity } from "../../../../store/actions";

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
  const dispatch = useDispatch();
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
        {options.map((opt) =>
          !opt.activityId ? (
            <option
              key={opt.id}
              value={
                !opt.day
                  ? `${opt.name} (${opt.id})`
                  : `${opt.day}-${opt.hour} (${opt.id})`
              }
            >
              {!opt.day ? `${opt.name} (${opt.id})` : `${opt.day}-${opt.hour}`}
            </option>
          ) : null
        )}
      </select>
      <div className={style.selectedItemsContainer}>
        <ul>
          {displayItems.map((item, i) => {
            return (
              <div key={i} className={style.itemContainer}>
                <li key={item.id}>
                  {item.day ? `${item.day}-${item.hour}` : item}
                </li>
                <AiFillCloseCircle
                  key={Math.random()}
                  onClick={() => {
                    setDisplayItems((state) =>
                      state.filter((e) => {
                        if (e.id) {
                          dispatch(
                            deleteDayHourFromActivity(item.activityId, item.id)
                          );
                          return e.id !== item.id;
                        } else {
                          return e !== item;
                        }
                      })
                    );
                    setInputs((state) => ({
                      ...state,
                      [name]: visualizeItems.filter((e) => {
                        if (e.id) {
                          return e.id !== item.id;
                        } else {
                          return e !== item;
                        }
                      }),
                    }));
                    setErrors(
                      validateForm(
                        {
                          ...inputs,
                          [name]: visualizeItems.filter((e) => {
                            if (e.id) {
                              return e.id !== item.id;
                            } else {
                              return e !== item;
                            }
                          }),
                        },
                        type
                      )
                    );
                  }}
                  color="red"
                  className={style.deleteItemIcon}
                />
              </div>
            );
          })}
        </ul>
      </div>
      <label htmlFor={name}>{errorLabel}</label>
    </div>
  );
}
