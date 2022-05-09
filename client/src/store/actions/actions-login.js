import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import {
  googleAuthProvider,
  auth,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "../../firebase/index";
import {
  LOGIN_WITH_GOOGLE,
  USER_SIGN_OUT,
  VALIDATE_USER_IS_LOGGED,
  REGISTER_USER_WITH_EMAIL_AND_PASS,
  SIGN_IN_USER,
  RECEIVED_POST,
  USER_IS_ADMIN,
} from "../actions-type";

const base_url = "https://pfgymapp-2.herokuapp.com";
const local_host = "http://localhost:3001";

const registerUserWithEmailAndPass = (
  email,
  password,
  name,
  lastName,
  phoneNumber
) => {
  return async (dispatch) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userToDB = {
        uid: userCredential.user.uid,
        email: email,
        name,
        lastName,
        phoneNumber,
        image: "",
      };
      await axios.post(`${local_host}/user`, userToDB);

      dispatch({
        type: REGISTER_USER_WITH_EMAIL_AND_PASS,
        payload: userCredential,
      });
      dispatch({ type: RECEIVED_POST });
      swal({
        buttons: "Aceptar",
        icon: "success",
        title: "Usuario creado correctamente",
      });
    } catch (error) {
      console.log(error);
      swal({
        buttons: "Aceptar",
        icon: "error",
        title: "Algo salió mal",
      });
    }
  };
};

const signInWithEmailAndPass = (email, password) => {
  return async (dispatch) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch({ type: SIGN_IN_USER, payload: userCredential });
      dispatch({ type: RECEIVED_POST });
    } catch (error) {
      console.log(error);
      swal({
        buttons: "Aceptar",
        title: "Algo salió mal, compruebe sus credenciales",
        icon: "error",
      });
    }
  };
};

const resetPassword = (email) => {
  return async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      swal({
        title: "Le enviamos un link para recuperar su cuenta",
        buttons: "Aceptar",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };
};
const loginWithGoogle = () => {
  return async (dispatch) => {
    try {
      const userData = await signInWithPopup(auth, googleAuthProvider);
      const firstName = userData.user.displayName.split(" ")[0];
      const lastName = userData.user.displayName.split(" ")[1];

      const authWithGoogleData = {
        uid: userData.user.uid,
        email: userData.user.email,
        name: firstName,
        lastName,
        phoneNumber: userData.user.phoneNumber,
        image: userData.user.photoURL,
      };

      const { status } = await axios.post(
        `${local_host}/user`,
        authWithGoogleData
      );
      if (status === 200) {
        dispatch({ type: LOGIN_WITH_GOOGLE, payload: authWithGoogleData });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const validateUserIsLogged = () => {
  return (dispatch) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const { data } = await axios.post(
            `${local_host}/user/isAdmin`,
            {
              id: user.uid,
            }
          );
          dispatch({ type: USER_IS_ADMIN, payload: data });
          dispatch({
            type: VALIDATE_USER_IS_LOGGED,
            payload: user,
          });
          dispatch({ type: RECEIVED_POST });
        } catch (error) {
          swal({
            title: "Algo salió mal, intenta nuevamente más tarde" + error,
            buttons: "Aceptar",
          });
        }
      } else {
        dispatch({ type: VALIDATE_USER_IS_LOGGED, payload: null });
        dispatch({ type: RECEIVED_POST });
      }
    });
  };
};

const userSignOut = () => {
  return async (dispatch) => {
    try {
      await signOut(auth);
      dispatch({ type: USER_SIGN_OUT });
    } catch (error) {
      console.log(error);
    }
  };
};

export {
  loginWithGoogle,
  validateUserIsLogged,
  userSignOut,
  registerUserWithEmailAndPass,
  signInWithEmailAndPass,
  resetPassword,
};
