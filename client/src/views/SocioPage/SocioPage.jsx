import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  userSignOut,
  validateUserIsLogged,
} from "../../store/actions/actions-login";
import style from "./SocioPage.module.css";
//import MyActivities from "./components/MyActivities/MyActivities";
//import CreateReaview from "./components/CreateReview/CreateReview";
import SideBar from "./components/Sidebar/SideBar";


export default function SocioPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.login);
  

  useEffect(() => {
    dispatch(validateUserIsLogged());
  }, [dispatch]);

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user, navigate]);

  

  return (
    <div className={style.principalContainer}>
      <SideBar/>
      <div>
        <button
          className={style.signOutBtn}
          onClick={() => dispatch(userSignOut())}
        >
          SignOut
        </button>
      </div>

      
      
     {/*  <div>
        <MyActivities />
      </div>
      <CreateReaview/> */}
      
      
    </div>
  );
}
