import style from "./SocioPage.module.css";
import SideBar from "./components/Sidebar/SideBar";
import CenterDynamicView from "./components/CenterDynamicView/CenterDynamicView"
import { useState, useEffect  } from 'react';
import { useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import {userSignOut, validateUserIsLogged} from '../../store/actions/actions-login';


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
      <SideBar itemSelected={itemSelected} setItemSelected={setItemSelected} />
      <div className={style.centerViewContainer}>
        {/* <button
        className={style.signOutBtn}
        onClick={()=> dispatch(userSignOut())}
        >
            signOut
        </button> */}
        <CenterDynamicView
          itemSelected={itemSelected}
          contentOfCard={<div>Hola</div>}
        />
      </div>
    </div>
  );
}
