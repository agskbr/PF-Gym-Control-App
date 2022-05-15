import axios from "axios";
import swal from "sweetalert";
import { BASE_URL } from "../constantes";
import {
  googleAuthProvider,
  auth,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification,
  githubAuthProvider,
} from "../../firebase/index";
import {
  LOGIN_WITH_GOOGLE,
  USER_SIGN_OUT,
  VALIDATE_USER_IS_LOGGED,
  REGISTER_USER_WITH_EMAIL_AND_PASS,
  SIGN_IN_USER,
  USER_IS_ADMIN,
  LOGIN_WITH_GITHUB,
  REQUEST_USER_LOGIN,
  RECEIVED_USER_LOGIN,
} from "../actions-type";

const requestUserLogin = () => {
  return {
    type: REQUEST_USER_LOGIN,
  };
};

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
      await axios.post(`${BASE_URL}/user`, userToDB);
      await updateProfile(auth.currentUser, {
        displayName: `${name} ${lastName}`,
      });
      dispatch({
        type: REGISTER_USER_WITH_EMAIL_AND_PASS,
        payload: userCredential,
      });
      dispatch({ type: RECEIVED_USER_LOGIN });
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
      dispatch({ type: RECEIVED_USER_LOGIN });
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
      swal({ buttons: "Aceptar", title: "Email no válido", icon: "error" });
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
      await axios.post(`${BASE_URL}/user`, authWithGoogleData);

      dispatch({ type: LOGIN_WITH_GOOGLE, payload: userData });
      dispatch({ type: RECEIVED_USER_LOGIN });
    } catch (error) {
      console.log(error);
    }
  };
};
const loginWithGithub = () => {
  return async (dispatch) => {
    try {
      const userData = await signInWithPopup(auth, githubAuthProvider);
      const firstName = userData.user.displayName.split(" ")[0];
      const lastName = userData.user.displayName.split(" ")[1];

      const authWithGithubData = {
        uid: userData.user.uid,
        email: userData.user.email,
        name: firstName,
        lastName,
        phoneNumber: userData.user.phoneNumber,
        image: userData.user.photoURL,
      };

      await axios.post(`${BASE_URL}/user`, authWithGithubData);

      dispatch({ type: LOGIN_WITH_GITHUB, payload: userData });
      dispatch({ type: RECEIVED_USER_LOGIN });
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
          const { data } = await axios.post(`${BASE_URL}/user/isAdmin`, {
            id: user.uid,
          });
          const userFind = await axios.get(`${BASE_URL}/user/${user.uid}`);
          if (!userFind.data.uid) {
            const authUserValidated = {
              uid: user.uid,
              email: user.email,
              name: user.displayName?.split(" ")[0],
              lastName: user.displayName?.split(" ")[1],
              phoneNumber: user.phoneNumber,
              image: user.photoURL,
            };
            await axios.post(`${BASE_URL}/user`, authUserValidated);
          }
          dispatch({ type: USER_IS_ADMIN, payload: data });
          dispatch({
            type: VALIDATE_USER_IS_LOGGED,
            payload: user,
          });
          dispatch({ type: RECEIVED_USER_LOGIN });
        } catch (error) {
          swal({
            title: "Algo salió mal, intenta nuevamente más tarde" + error,
            buttons: "Aceptar",
          });
        }
      } else {
        dispatch({ type: VALIDATE_USER_IS_LOGGED, payload: null });
        dispatch({ type: RECEIVED_USER_LOGIN });
      }
    });
  };
};

const userSignOut = () => {
  return async (dispatch) => {
    try {
      await signOut(auth);
      dispatch({ type: USER_SIGN_OUT });
      dispatch({ type: RECEIVED_USER_LOGIN });
    } catch (error) {
      console.log(error);
    }
  };
};

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: "http://localhost:3000/sociodashboard",
  // This must be true.
  // dynamicLinkDomain: 'http://localhost:3000/login'
};

export function verifyAccount() {
  return async function () {
    try {
      await sendEmailVerification(auth.currentUser, actionCodeSettings);
      swal({
        title: "se te envio un mail",
        buttons: "aceptar",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      swal({
        title: "no se pudo enviar el mail",
        buttons: "aceptar",
        icon: "error",
      });
    }
  };
}

export {
  loginWithGoogle,
  loginWithGithub,
  validateUserIsLogged,
  userSignOut,
  registerUserWithEmailAndPass,
  signInWithEmailAndPass,
  resetPassword,
  requestUserLogin,
};
