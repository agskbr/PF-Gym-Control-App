import style from "./SocioPage.module.css";
import MyActivities from "./components/MyActivities/MyActivities";
import SideBar from "./components/Sidebar/SideBar";
import CenterDynamicView from "./components/CenterDynamicView/CenterDynamicView";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateUserIsLogged , userSignOut} from "../../store/actions/actions-login";


export default function SocioPage() {

  const [itemSelected, setItemSelected] = useState("Mi Perfil");
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
     {/*  <SideBar itemSelected={itemSelected} setItemSelected={setItemSelected} /> */}
      <div className={style.centerViewContainer}>
        <button
          className={style.signOutBtn}
          onClick={() => dispatch(userSignOut())}
        >
          SignOut
        </button>
        <br />
        {/* <CenterDynamicView
          itemSelected={itemSelected}
          contentOfCard={<div>Hola</div>}
        /> */}
      </div>

      {/*  <div>
        <MyActivities />
      </div>
      <CreateReaview/> */}
    </div>
  );
}
